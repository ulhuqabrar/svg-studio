export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: string;
  name: "free" | "pro";
  price_monthly: number;
  generation_limit: number;
  features: string[];
  created_at: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: "active" | "canceled" | "past_due";
  stripe_subscription_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SvgStyle {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  preview_url: string | null;
  style_config: StyleConfig;
  is_curated: boolean;
  plan_required: string;
  sort_order: number;
  created_at: string;
}

export interface StyleConfig {
  stroke?: boolean;
  strokeWidth?: number;
  cornerRadius?: number;
  fill?: boolean;
  fillOpacity?: number;
  colorPalette?: string[];
  lineCap?: "round" | "butt" | "square";
  lineJoin?: "round" | "miter" | "bevel";
}

export interface SvgTemplate {
  id: string;
  style_id: string;
  name: string;
  slug: string;
  description: string;
  preview_url: string | null;
  plan_required: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Generation {
  id: string;
  user_id: string;
  style_id: string | null;
  template_id: string | null;
  prompt: string;
  status: "pending" | "processing" | "completed" | "failed";
  svg_content: string | null;
  svg_url: string | null;
  metadata: Record<string, unknown>;
  error_message: string | null;
  created_at: string;
}

export interface SavedSvg {
  id: string;
  user_id: string;
  generation_id: string | null;
  name: string;
  svg_content: string;
  svg_url: string | null;
  is_favorite: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface UploadedReference {
  id: string;
  user_id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  svg_content: string;
  status: "pending" | "analyzed" | "failed";
  created_at: string;
}

export interface StyleProfile {
  id: string;
  user_id: string;
  reference_id: string;
  name: string;
  style_config: StyleConfig;
  status: "pending" | "ready" | "failed";
  created_at: string;
  updated_at: string;
}

export interface UsageRecord {
  id: string;
  user_id: string;
  action: "generate" | "upload" | "analyze";
  metadata: Record<string, unknown>;
  created_at: string;
}
