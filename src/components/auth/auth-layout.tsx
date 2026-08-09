"use client";

import AuthBrandPanel from "./auth-brand-panel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left: Brand panel */}
      <AuthBrandPanel />

      {/* Right: Auth form */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4">
          <a href="/" className="inline-flex items-center gap-2">
            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 text-primary" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.1" />
              <path d="M8 12L16 8L24 12V20L16 24L8 20V12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="16" cy="16" r="3" fill="currentColor" />
            </svg>
            <span className="text-[15px] font-semibold text-foreground tracking-tight">
              SVG Studio
            </span>
          </a>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-5 py-10 lg:py-0">
          <div className="w-full max-w-[380px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
