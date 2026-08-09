"use client";

import { SVGStudioLogo } from "@/components/svg-illustrations";
import {
  MinimalSearch,
  MinimalCalendar,
  MinimalFolder,
  RoundedDashboard,
  RoundedUser,
  BoldGlobe,
} from "@/components/svg-illustrations";

export default function AuthBrandPanel() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between w-[45%] min-h-screen p-10 overflow-hidden">
      {/* Atmospheric gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-secondary/[0.04] blur-[100px]" />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full bg-primary/[0.03] blur-[80px]" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 600 900" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="auth-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="600" height="900" fill="url(#auth-grid)" />
          {/* Vector construction lines */}
          <line x1="100" y1="200" x2="300" y2="400" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 4" />
          <line x1="300" y1="400" x2="500" y2="300" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 4" />
          <circle cx="300" cy="400" r="3" fill="currentColor" fillOpacity="0.2" />
          <circle cx="100" cy="200" r="2" fill="currentColor" fillOpacity="0.15" />
          <circle cx="500" cy="300" r="2" fill="currentColor" fillOpacity="0.15" />
        </svg>
      </div>

      <div className="relative z-10">
        <a href="/" className="inline-flex items-center gap-2">
          <SVGStudioLogo className="w-8 h-8 text-primary" />
          <span className="text-[16px] font-semibold text-foreground tracking-tight">
            SVG Studio
          </span>
        </a>
      </div>

      <div className="relative z-10">
        <h1 className="text-[36px] leading-[44px] md:text-[42px] md:leading-[50px] font-bold text-foreground tracking-tight mb-4">
          Create SVGs that
          <br />
          match your{" "}
          <span className="text-primary">style.</span>
        </h1>
        <p className="text-[15px] text-muted-foreground leading-relaxed max-w-[380px]">
          Generate custom SVGs or teach Studio your own visual language.
        </p>
      </div>

      <div className="relative z-10">
        {/* Style specimens */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[MinimalSearch, MinimalCalendar, MinimalFolder].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-xl bg-card border-2 border-background shadow-sm flex items-center justify-center"
              >
                <Icon className="w-5 h-5 text-foreground" />
              </div>
            ))}
          </div>
          <div className="flex -space-x-2">
            {[RoundedDashboard, RoundedUser, BoldGlobe].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-xl bg-card border-2 border-background shadow-sm flex items-center justify-center"
              >
                <Icon className="w-5 h-5 text-foreground" />
              </div>
            ))}
          </div>
          <span className="text-[12px] text-muted-foreground ml-1">
            13+ styles
          </span>
        </div>
      </div>
    </div>
  );
}
