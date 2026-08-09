"use client";

import { useState } from "react";
import { SVGStudioLogo, MenuIcon, CloseIcon } from "@/components/svg-illustrations";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Styles", href: "#styles" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#faq" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-5 pt-4">
      <nav className="flex items-center justify-between w-full max-w-[1160px] bg-white/80 backdrop-blur-xl border border-border shadow-sm rounded-2xl px-5 h-[60px]">
        <a href="/" className="flex items-center gap-2">
          <SVGStudioLogo className="w-7 h-7 text-primary" />
          <span className="text-[15px] font-semibold text-foreground tracking-tight">
            SVG Studio
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 px-3 py-2"
          >
            Log in
          </a>
          <a href="/signup">
            <Button size="sm" className="text-[13px] font-medium h-9 px-4">
              Start Creating
            </Button>
          </a>
        </div>

        <button
          className="md:hidden p-2 text-foreground -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <CloseIcon className="w-5 h-5" />
          ) : (
            <MenuIcon className="w-5 h-5" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden absolute top-[72px] left-5 right-5 bg-white border border-border shadow-lg rounded-2xl p-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-medium text-foreground py-2.5 px-3 rounded-xl hover:bg-muted transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-border mt-2 pt-3 flex flex-col gap-2">
            <a
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-medium text-muted-foreground py-2.5 px-3"
            >
              Log in
            </a>
            <a href="/signup" onClick={() => setMobileOpen(false)}>
              <Button className="w-full h-10 text-[14px]">
                Start Creating
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
