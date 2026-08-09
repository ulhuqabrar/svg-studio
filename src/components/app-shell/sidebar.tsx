"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  SVGStudioLogo,
  ChevronDown,
  ArrowRight,
} from "@/components/svg-illustrations";
import { createClient } from "@/lib/supabase/client";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface User {
  email?: string;
  display_name?: string;
  avatar_url?: string;
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
      <path d="M3 7.5L10 2.5L17 7.5V16C17 16.55 16.55 17 16 17H4C3.45 17 3 16.55 3 16V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7.5 17V10H12.5V17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function GenerateIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
      <path d="M10 3L12.5 8.5L18 9.5L14 13.5L15 19L10 16.5L5 19L6 13.5L2 9.5L7.5 8.5L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function SvgIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
      <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 13L10 7L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StylesIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
      <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function MyStylesIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 2.5V5M10 15V17.5M2.5 10H5M15 10H17.5M4.5 4.5L6.3 6.3M13.7 13.7L15.5 15.5M15.5 4.5L13.7 6.3M6.3 13.7L4.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const navItems: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: <HomeIcon /> },
  { label: "Generate", href: "/generate", icon: <GenerateIcon /> },
  { label: "My SVGs", href: "/svgs", icon: <SvgIcon /> },
  { label: "Styles", href: "/styles", icon: <StylesIcon /> },
  { label: "My Styles", href: "/my-styles", icon: <MyStylesIcon /> },
];

const bottomItems: NavItem[] = [
  { label: "Settings", href: "/settings", icon: <SettingsIcon /> },
];

export default function Sidebar({
  collapsed,
  onToggle,
  user,
}: {
  collapsed: boolean;
  onToggle: () => void;
  user?: User | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [usage, setUsage] = useState({ used: 0, limit: 20 });

  useEffect(() => {
    fetch("/api/usage")
      .then((res) => res.json())
      .then((data) => {
        if (data.usage?.generations) {
          setUsage(data.usage.generations);
        }
      })
      .catch(() => {});
  }, []);

  const displayName = user?.display_name || user?.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen border-r border-border bg-background transition-all duration-200",
        collapsed ? "w-[68px]" : "w-[250px]"
      )}
    >
      {/* Top: Logo + Create */}
      <div className="flex items-center justify-between px-4 h-[56px] border-b border-border flex-shrink-0">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <SVGStudioLogo className="w-6 h-6 text-primary" />
            <span className="text-[14px] font-semibold text-foreground tracking-tight">
              SVG Studio
            </span>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="mx-auto">
            <SVGStudioLogo className="w-6 h-6 text-primary" />
          </Link>
        )}
      </div>

      {/* Create button */}
      <div className="px-3 pt-3 flex-shrink-0">
        <Link
          href="/generate"
          className={cn(
            "inline-flex items-center justify-center gap-2 w-full rounded-4xl bg-primary text-primary-foreground text-[13px] font-medium transition-colors hover:bg-primary/80",
            collapsed ? "h-9 px-0" : "h-9 px-3"
          )}
        >
          {collapsed ? (
            <span className="text-lg">+</span>
          ) : (
            <>
              <span className="text-lg leading-none">+</span>
              Create SVG
            </>
          )}
        </Link>
      </div>

      {/* Primary nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              title={collapsed ? item.label : undefined}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-3 space-y-0.5 flex-shrink-0">
        {/* Upgrade */}
        {!collapsed && (
          <div className="px-3 py-2.5 mb-1 bg-primary/[0.04] border border-primary/10 rounded-lg">
            <p className="text-[11px] font-semibold text-primary mb-0.5">
              Free Plan
            </p>
            <p className="text-[11px] text-muted-foreground mb-2">
              {usage.used} / {usage.limit} generations used
            </p>
            <div className="h-1 bg-muted rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${Math.min(100, (usage.used / usage.limit) * 100)}%` }}
              />
            </div>
            <Link href="/billing" className="inline-flex items-center justify-center gap-1 w-full h-7 px-3 rounded-4xl border border-border bg-transparent text-[11px] font-medium text-foreground hover:bg-muted transition-colors">
              Upgrade to Pro
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}

        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              title={collapsed ? item.label : undefined}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* User + Logout */}
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer text-left",
            collapsed && "justify-center px-0"
          )}
          title={collapsed ? "Log out" : undefined}
        >
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt=""
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <span className="text-[11px] font-semibold text-primary">
                {initials}
              </span>
            )}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-foreground truncate">
                {displayName}
              </p>
              <p className="text-[10px] text-muted-foreground">Log out</p>
            </div>
          )}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-[68px] w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronDown
          className={cn(
            "w-3 h-3 rotate-90 transition-transform",
            collapsed && "-rotate-90"
          )}
        />
      </button>
    </aside>
  );
}
