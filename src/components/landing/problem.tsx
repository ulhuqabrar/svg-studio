"use client";

import { motion } from "framer-motion";
import {
  MinimalSearch,
  MinimalCalendar,
  RoundedDashboard,
  RoundedUser,
  BoldHome,
  BoldGlobe,
  BoldArrow,
  BoldMessage,
  BoldDocument,
  MinimalSettings,
  RoundedNotification,
  RoundedAnalytics,
} from "@/components/svg-illustrations";

function InconsistentGrid() {
  const icons = [
    { Icon: MinimalSearch, className: "w-8 h-8 text-foreground" },
    { Icon: RoundedDashboard, className: "w-7 h-7 text-foreground" },
    { Icon: BoldHome, className: "w-9 h-9 text-foreground" },
    { Icon: MinimalCalendar, className: "w-6 h-6 text-foreground" },
    { Icon: RoundedUser, className: "w-8 h-8 text-foreground" },
    { Icon: BoldArrow, className: "w-7 h-7 text-foreground" },
    { Icon: MinimalSettings, className: "w-9 h-9 text-foreground" },
    { Icon: RoundedNotification, className: "w-6 h-6 text-foreground" },
    { Icon: BoldGlobe, className: "w-8 h-8 text-foreground" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 p-5">
      {icons.map(({ Icon, className }, i) => (
        <div key={i} className="aspect-square bg-muted/30 rounded-xl flex items-center justify-center">
          <Icon className={className} />
        </div>
      ))}
    </div>
  );
}

function ConsistentGrid() {
  const icons = [MinimalSearch, MinimalCalendar, MinimalSettings, RoundedDashboard, RoundedUser, RoundedNotification, RoundedAnalytics, BoldHome, BoldGlobe];

  return (
    <div className="grid grid-cols-3 gap-3 p-5">
      {icons.map((Icon, i) => (
        <div key={i} className="aspect-square bg-primary/[0.04] rounded-xl flex items-center justify-center border border-primary/10">
          <Icon className="w-7 h-7 text-primary" />
        </div>
      ))}
    </div>
  );
}

export default function Problem() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1160px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-foreground tracking-tight mb-4">
            Your SVGs should look like
            <br className="hidden sm:block" />
            they belong together.
          </h2>
          <p className="text-[15px] md:text-[16px] text-muted-foreground max-w-[520px] mx-auto leading-relaxed">
            Designers often have a visual language already. But finding or creating
            another icon that matches it takes unnecessary time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-6 md:gap-0 items-start"
        >
          {/* Inconsistent */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                <p className="text-[13px] font-semibold text-muted-foreground">
                  Random SVGs
                </p>
              </div>
            </div>
            <InconsistentGrid />
            <div className="px-5 pb-4">
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                Different stroke widths, inconsistent corners, varied proportions,
                no shared visual language.
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center h-full pt-24">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-8 bg-border" />
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="w-px h-8 bg-border" />
            </div>
          </div>

          {/* Consistent */}
          <div className="bg-card border border-primary/20 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-primary/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <p className="text-[13px] font-semibold text-primary">
                  With SVG Studio
                </p>
              </div>
            </div>
            <ConsistentGrid />
            <div className="px-5 pb-4">
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                Consistent geometry, stroke, proportions, and visual language —
                every icon belongs to the same system.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
