"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SVGStudioLogo, MenuIcon } from "@/components/svg-illustrations";
import CommandSearch from "./command-search";

function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
      <path d="M10 2.5C7.24 2.5 5 4.74 5 7.5V11.5L3.5 14H16.5L15 11.5V7.5C15 4.74 12.76 2.5 10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 14C8 15.1 8.9 16 10 16C11.1 16 12 15.1 12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px]" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 7.5C7.5 6.12 8.62 5 10 5C11.38 5 12.5 6.12 12.5 7.5C12.5 8.88 11.38 10 10 10V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

const breadcrumbMap: Record<string, string> = {
  dashboard: "Home",
  generate: "Generate",
  svgs: "My SVGs",
  styles: "Styles",
  "my-styles": "My Styles",
  "train-style": "Train Style",
  settings: "Settings",
  billing: "Billing",
};

interface TopbarUser {
  email?: string;
  display_name?: string;
  avatar_url?: string;
}

export default function Topbar({
  onMenuClick,
  user,
}: {
  onMenuClick?: () => void;
  user?: TopbarUser | null;
}) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumb = segments
    .map((s) => breadcrumbMap[s] || s)
    .join(" / ");

  return (
    <>
      <header className="h-[56px] border-b border-border bg-background flex items-center justify-between px-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <button
            className="md:hidden p-1.5 -ml-1.5 text-muted-foreground hover:text-foreground"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <MenuIcon className="w-5 h-5" />
          </button>

          {/* Mobile logo */}
          <Link href="/dashboard" className="md:hidden flex items-center gap-2">
            <SVGStudioLogo className="w-6 h-6 text-primary" />
            <span className="text-[14px] font-semibold text-foreground">
              SVG Studio
            </span>
          </Link>

          {/* Breadcrumb */}
          <span className="hidden md:block text-[13px] text-muted-foreground">
            {breadcrumb || "Home"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Search trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-2 h-8 px-3 text-[12px] text-muted-foreground bg-muted/50 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Search...
            <kbd className="ml-4 text-[10px] text-muted-foreground/60 bg-background border border-border rounded px-1 py-0.5">
              ⌘K
            </kbd>
          </button>

          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors" aria-label="Notifications">
            <BellIcon />
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors" aria-label="Help">
            <HelpIcon />
          </button>
        </div>
      </header>

      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
