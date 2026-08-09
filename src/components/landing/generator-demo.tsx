"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  MinimalSearch,
  MinimalCalendar,
  MinimalFolder,
  MinimalLocation,
  MinimalSettings,
  Copy,
  Download,
  RefreshCw,
} from "@/components/svg-illustrations";

export default function GeneratorDemo() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-[1160px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-foreground tracking-tight mb-4">
              Describe it.
              <br />
              We&apos;ll keep the style.
            </h2>
            <p className="text-[15px] md:text-[16px] text-muted-foreground leading-relaxed mb-8 max-w-[440px]">
              Turn natural language descriptions into production-ready SVG
              graphics — all generated in your chosen visual style.
            </p>
            <Button size="lg" className="text-[14px] font-medium h-11 px-6">
              Try the Generator
            </Button>
          </motion.div>

          {/* Right: Generator UI */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
                <span className="w-2.5 h-2.5 rounded-full bg-muted" />
                <span className="w-2.5 h-2.5 rounded-full bg-muted" />
                <span className="w-2.5 h-2.5 rounded-full bg-muted" />
              </div>

              <div className="p-5">
                {/* Prompt */}
                <div className="mb-4">
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                    Describe your SVG
                  </label>
                  <div className="flex items-center gap-2.5 bg-background border border-border rounded-xl px-4 py-3">
                    <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-[13px] text-foreground">
                      Create a shopping cart icon
                    </span>
                  </div>
                </div>

                {/* Style + Format */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-muted-foreground">Style:</span>
                    <span className="text-[11px] font-medium text-primary bg-primary/[0.06] px-2 py-0.5 rounded-full">
                      Minimal Outline
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-muted-foreground">Format:</span>
                    <span className="text-[11px] font-medium text-foreground bg-muted px-2 py-0.5 rounded-full">
                      SVG
                    </span>
                  </div>
                </div>

                {/* Results */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Generated
                  </span>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Copy">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Download">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Regenerate">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {[MinimalSearch, MinimalCalendar, MinimalFolder, MinimalLocation, MinimalSettings].map((Icon, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-primary/[0.04] rounded-xl flex items-center justify-center border border-primary/10 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group"
                    >
                      <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
