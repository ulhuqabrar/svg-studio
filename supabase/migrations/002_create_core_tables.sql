-- SVG Studio Database Migration 002: Core Tables
-- Run this in Supabase SQL Editor after 001_create_profiles.sql

-- ============================================================
-- PLANS
-- ============================================================
create table plans (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  price_monthly numeric not null default 0,
  generation_limit int not null default 20,
  features jsonb not null default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table plans enable row level security;

create policy "Anyone can view plans" on plans
  for select using (true);

insert into plans (name, price_monthly, generation_limit, features) values
  ('free', 0, 20, '["20 generations/month", "5 styles", "SVG export", "Basic prompts"]'::jsonb),
  ('pro', 2, 500, '["500 generations/month", "All 40+ styles", "Custom style training", "SVG upload & analyze", "Priority generation", "Commercial license"]'::jsonb);

-- ============================================================
-- USER SUBSCRIPTIONS
-- ============================================================
create table user_subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null unique,
  plan_id uuid references plans(id) not null,
  status text not null default 'active' check (status in ('active', 'canceled', 'past_due')),
  stripe_subscription_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table user_subscriptions enable row level security;

create policy "Users can view their own subscription" on user_subscriptions
  for select using (auth.uid() = user_id);

create policy "Users can insert their own subscription" on user_subscriptions
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own subscription" on user_subscriptions
  for update using (auth.uid() = user_id);

-- Auto-create free subscription on signup
create or replace function public.handle_new_user_subscription()
returns trigger as $$
declare
  free_plan_id uuid;
begin
  select id into free_plan_id from plans where name = 'free' limit 1;
  insert into public.user_subscriptions (user_id, plan_id, status)
  values (
    new.user_id,
    free_plan_id,
    'active'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_profile_created
  after insert on profiles
  for each row execute function public.handle_new_user_subscription();

create or replace trigger handle_user_subscriptions_updated_at
  before update on user_subscriptions
  for each row execute function public.handle_updated_at();

-- ============================================================
-- SVG STYLES (curated library)
-- ============================================================
create table svg_styles (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text,
  category text not null default 'general',
  preview_url text,
  style_config jsonb not null default '{}'::jsonb,
  is_curated boolean not null default true,
  plan_required text not null default 'free',
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table svg_styles enable row level security;

create policy "Anyone can view curated styles" on svg_styles
  for select using (is_curated = true);

-- Seed curated styles
insert into svg_styles (name, slug, description, category, style_config, sort_order) values
  ('Minimal Outline', 'minimal-outline', 'Clean lines with minimal detail', 'outline', '{"stroke": true, "strokeWidth": 1.5, "fill": false, "cornerRadius": 0, "lineCap": "round", "lineJoin": "round"}'::jsonb, 1),
  ('Rounded Soft', 'rounded-soft', 'Friendly rounded shapes', 'filled', '{"stroke": false, "fill": true, "fillOpacity": 1, "cornerRadius": 8, "lineCap": "round", "lineJoin": "round"}'::jsonb, 2),
  ('Bold Filled', 'bold-filled', 'Strong filled shapes with weight', 'filled', '{"stroke": false, "fill": true, "fillOpacity": 1, "cornerRadius": 4, "lineCap": "round", "lineJoin": "round"}'::jsonb, 3),
  ('Technical', 'technical', 'Precise technical illustration style', 'outline', '{"stroke": true, "strokeWidth": 1, "fill": false, "cornerRadius": 0, "lineCap": "butt", "lineJoin": "miter"}'::jsonb, 4),
  ('Editorial', 'editorial', 'Magazine-quality illustration', 'filled', '{"stroke": true, "strokeWidth": 2, "fill": true, "fillOpacity": 0.1, "cornerRadius": 2, "lineCap": "round", "lineJoin": "round"}'::jsonb, 5),
  ('Geometric', 'geometric', 'Sharp geometric shapes', 'outline', '{"stroke": true, "strokeWidth": 1.5, "fill": false, "cornerRadius": 0, "lineCap": "square", "lineJoin": "miter"}'::jsonb, 6),
  ('Monoline', 'monoline', 'Single-weight line illustration', 'outline', '{"stroke": true, "strokeWidth": 2, "fill": false, "cornerRadius": 4, "lineCap": "round", "lineJoin": "round"}'::jsonb, 7),
  ('Duotone', 'duotone', 'Two-tone color illustration', 'filled', '{"stroke": false, "fill": true, "fillOpacity": 0.8, "cornerRadius": 6, "colorPalette": ["#3b82f6", "#1e40af"]}'::jsonb, 8);

-- ============================================================
-- SVG TEMPLATES
-- ============================================================
create table svg_templates (
  id uuid default gen_random_uuid() primary key,
  style_id uuid references svg_styles(id) on delete cascade not null,
  name text not null,
  slug text not null,
  description text,
  preview_url text,
  plan_required text not null default 'free',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(style_id, slug)
);

alter table svg_templates enable row level security;

create policy "Anyone can view templates" on svg_templates
  for select using (true);

create or replace trigger handle_svg_templates_updated_at
  before update on svg_templates
  for each row execute function public.handle_updated_at();

-- ============================================================
-- GENERATIONS
-- ============================================================
create table generations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  style_id uuid references svg_styles(id) on delete set null,
  template_id uuid references svg_templates(id) on delete set null,
  prompt text not null,
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  svg_content text,
  svg_url text,
  metadata jsonb not null default '{}'::jsonb,
  error_message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table generations enable row level security;

create policy "Users can view their own generations" on generations
  for select using (auth.uid() = user_id);

create policy "Users can insert their own generations" on generations
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own generations" on generations
  for update using (auth.uid() = user_id);

create policy "Users can delete their own generations" on generations
  for delete using (auth.uid() = user_id);

-- ============================================================
-- SAVED SVGs
-- ============================================================
create table saved_svgs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  generation_id uuid references generations(id) on delete set null,
  name text not null,
  svg_content text not null,
  svg_url text,
  is_favorite boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table saved_svgs enable row level security;

create policy "Users can view their own saved SVGs" on saved_svgs
  for select using (auth.uid() = user_id);

create policy "Users can insert their own saved SVGs" on saved_svgs
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own saved SVGs" on saved_svgs
  for update using (auth.uid() = user_id);

create policy "Users can delete their own saved SVGs" on saved_svgs
  for delete using (auth.uid() = user_id);

create or replace trigger handle_saved_svgs_updated_at
  before update on saved_svgs
  for each row execute function public.handle_updated_at();

-- ============================================================
-- UPLOADED REFERENCES (paid feature)
-- ============================================================
create table uploaded_references (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  file_name text not null,
  file_url text not null,
  file_size int not null,
  svg_content text not null,
  status text not null default 'pending' check (status in ('pending', 'analyzed', 'failed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table uploaded_references enable row level security;

create policy "Users can view their own uploads" on uploaded_references
  for select using (auth.uid() = user_id);

create policy "Users can insert their own uploads" on uploaded_references
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their own uploads" on uploaded_references
  for delete using (auth.uid() = user_id);

-- ============================================================
-- STYLE PROFILES (trained from uploads)
-- ============================================================
create table style_profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  reference_id uuid references uploaded_references(id) on delete cascade not null,
  name text not null,
  style_config jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending', 'ready', 'failed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table style_profiles enable row level security;

create policy "Users can view their own style profiles" on style_profiles
  for select using (auth.uid() = user_id);

create policy "Users can insert their own style profiles" on style_profiles
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own style profiles" on style_profiles
  for update using (auth.uid() = user_id);

create policy "Users can delete their own style profiles" on style_profiles
  for delete using (auth.uid() = user_id);

create or replace trigger handle_style_profiles_updated_at
  before update on style_profiles
  for each row execute function public.handle_updated_at();

-- ============================================================
-- USAGE RECORDS
-- ============================================================
create table usage_records (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  action text not null check (action in ('generate', 'upload', 'analyze')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table usage_records enable row level security;

create policy "Users can view their own usage" on usage_records
  for select using (auth.uid() = user_id);

create policy "Users can insert their own usage" on usage_records
  for insert with check (auth.uid() = user_id);

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
insert into storage.buckets (id, name, public) values
  ('svgs', 'svgs', false),
  ('references', 'references', false),
  ('previews', 'previews', true);

-- Storage RLS policies
create policy "Users can upload to their own folder"
  on storage.objects for insert
  with check (
    bucket_id in ('svgs', 'references')
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can view their own files"
  on storage.objects for select
  using (
    bucket_id in ('svgs', 'references')
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can delete their own files"
  on storage.objects for delete
  using (
    bucket_id in ('svgs', 'references')
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Anyone can view previews"
  on storage.objects for select
  using (bucket_id = 'previews');
