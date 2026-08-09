"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import {
  MinimalSearch,
  MinimalCalendar,
  MinimalFolder,
  MinimalLocation,
  MinimalSettings,
  RoundedDashboard,
  RoundedUser,
  RoundedNotification,
  RoundedAnalytics,
  BoldGlobe,
  BoldDocument,
  SoftHeart,
} from "@/components/svg-illustrations";

function CreateIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function StyleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <path d="M12 16V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 8L12 4L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 14V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const recentSvgs = [
  { name: "Analytics Dashboard", style: "Minimal Outline", icon: RoundedAnalytics, date: "2 hours ago" },
  { name: "User Profile", style: "Rounded", icon: RoundedUser, date: "5 hours ago" },
  { name: "Notification Bell", style: "Rounded", icon: RoundedNotification, date: "Yesterday" },
  { name: "Globe Icon", style: "Bold", icon: BoldGlobe, date: "Yesterday" },
  { name: "Document", style: "Bold", icon: BoldDocument, date: "2 days ago" },
  { name: "Heart", style: "Soft Filled", icon: SoftHeart, date: "2 days ago" },
  { name: "Search", style: "Minimal Outline", icon: MinimalSearch, date: "3 days ago" },
  { name: "Calendar", style: "Minimal Outline", icon: MinimalCalendar, date: "3 days ago" },
];

const recentStyles = [
  { name: "Acme Design System", count: 18, updated: "2 days ago" },
  { name: "Product Icons", count: 24, updated: "5 days ago" },
];

export default function DashboardPage() {
  const [displayName, setDisplayName] = useState("there");
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("user_id", user.id)
          .single();
        if (profile?.display_name) {
          setDisplayName(profile.display_name.split(" ")[0]);
        } else if (user.email) {
          setDisplayName(user.email.split("@")[0]);
        }
      }
    }
    getUser();
  }, [supabase]);

  return (
    <div className="p-6 md:p-8 max-w-[1200px]">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-[24px] md:text-[28px] font-bold text-foreground tracking-tight mb-1">
          Welcome back, {displayName}.
        </h1>
        <p className="text-[14px] text-muted-foreground">
          Create something new or continue where you left off.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
        <Link
          href="/generate"
          className="group flex items-start gap-3 p-4 bg-card border border-border rounded-2xl hover:border-primary/20 hover:shadow-sm transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
            <CreateIcon />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-foreground mb-0.5">
              Create SVG
            </p>
            <p className="text-[12px] text-muted-foreground">
              Describe what you need.
            </p>
          </div>
        </Link>

        <Link
          href="/styles"
          className="group flex items-start gap-3 p-4 bg-card border border-border rounded-2xl hover:border-primary/20 hover:shadow-sm transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
            <StyleIcon />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-foreground mb-0.5">
              Choose a Style
            </p>
            <p className="text-[12px] text-muted-foreground">
              Start from a curated visual language.
            </p>
          </div>
        </Link>

        <Link
          href="/train-style"
          className="group flex items-start gap-3 p-4 bg-card border border-border rounded-2xl hover:border-primary/20 hover:shadow-sm transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
            <UploadIcon />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-foreground mb-0.5">
              Train Your Style
            </p>
            <p className="text-[12px] text-muted-foreground">
              Upload SVGs and teach Studio your style.
            </p>
          </div>
        </Link>
      </div>

      {/* Recent SVGs */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold text-foreground">
            Recent SVGs
          </h2>
          <Link
            href="/svgs"
            className="text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {recentSvgs.map((svg) => (
            <div
              key={svg.name}
              className="group bg-card border border-border rounded-2xl p-4 hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="aspect-square bg-muted/30 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/[0.04] transition-colors">
                <svg.icon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-[13px] font-medium text-foreground truncate mb-0.5">
                {svg.name}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">
                  {svg.style}
                </span>
                <span className="text-[10px] text-muted-foreground/60">
                  {svg.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Styles + Usage */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6">
        {/* Recent Styles */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold text-foreground">
              Your Styles
            </h2>
            <Link
              href="/my-styles"
              className="text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="space-y-2">
            {recentStyles.map((style) => (
              <div
                key={style.name}
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/20 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-muted/40 flex items-center justify-center flex-shrink-0">
                  <StyleIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-foreground truncate">
                    {style.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {style.count} SVGs · Updated {style.updated}
                  </p>
                </div>
                <Link href="/my-styles" className="inline-flex items-center h-7 px-3 rounded-4xl border border-border bg-transparent text-[11px] font-medium text-foreground hover:bg-muted transition-colors flex-shrink-0">
                  Generate
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Usage */}
        <div className="bg-card border border-border rounded-2xl p-5 h-fit">
          <h3 className="text-[13px] font-semibold text-foreground mb-3">
            Usage
          </h3>
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] text-muted-foreground">Generations</span>
              <span className="text-[12px] font-medium text-foreground">8 / 20</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "40%" }} />
            </div>
          </div>
          <div className="pt-3 border-t border-border">
            <Link href="/billing" className="inline-flex items-center justify-center gap-1.5 w-full h-8 px-3 rounded-4xl border border-border bg-transparent text-[12px] font-medium text-foreground hover:bg-muted transition-colors">
              Upgrade to Pro
              <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
                <path d="M4 8H12M12 8L8 4M12 8L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
