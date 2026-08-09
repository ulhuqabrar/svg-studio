"use client";

import { motion } from "framer-motion";
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
  RoundedUpload,
  CheckIcon,
} from "@/components/svg-illustrations";

const analysisMetrics = [
  { label: "Stroke weight", value: "2px", confidence: 95 },
  { label: "Corner radius", value: "Rounded", confidence: 88 },
  { label: "Fill behavior", value: "Outline only", confidence: 92 },
  { label: "Geometry", value: "Soft, organic", confidence: 85 },
  { label: "Visual density", value: "Minimal", confidence: 90 },
];

export default function StyleAnalysis() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-[1160px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-foreground tracking-tight mb-4">
            AI style analysis.
          </h2>
          <p className="text-[15px] md:text-[16px] text-muted-foreground max-w-[520px] mx-auto leading-relaxed">
            Studio examines your uploaded SVGs and extracts the visual DNA —
            stroke, geometry, proportions, and composition.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_48px_1fr_48px_1fr] gap-6 lg:gap-0 items-start"
        >
          {/* Source SVGs */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Source SVGs
              </p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-2">
                {[MinimalSearch, MinimalCalendar, MinimalFolder, MinimalLocation, MinimalSettings, RoundedDashboard].map((Icon, i) => (
                  <div key={i} className="aspect-square bg-muted/40 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground mt-3 text-center">
                6 SVGs uploaded
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center h-full pt-24">
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

          {/* Style Profile */}
          <div className="bg-card border border-primary/20 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-primary/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <p className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                  Style Profile
                </p>
              </div>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                {analysisMetrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[12px] text-foreground font-medium">
                        {metric.label}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {metric.value}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${metric.confidence}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center h-full pt-24">
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

          {/* New SVGs */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Generated in your style
              </p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-2">
                {[RoundedUser, RoundedNotification, RoundedAnalytics, RoundedUpload, MinimalSearch, MinimalCalendar].map((Icon, i) => (
                  <div key={i} className="aspect-square bg-primary/[0.04] rounded-xl flex items-center justify-center border border-primary/10 hover:border-primary/30 transition-colors cursor-pointer">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-3">
                <CheckIcon className="w-3.5 h-3.5 text-primary" />
                <span className="text-[11px] font-medium text-primary">
                  Style matched
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
