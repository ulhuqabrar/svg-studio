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
  BoldArrow,
  BoldHome,
  BoldGlobe,
  BoldMessage,
  BoldDocument,
  Sparkles,
  Download,
  Copy,
  RefreshCw,
} from "@/components/svg-illustrations";

const styles = [
  { name: "Minimal Outline", active: true },
  { name: "Rounded" },
  { name: "Bold" },
  { name: "Soft Filled" },
  { name: "Editorial" },
];

const generatedIcons = [
  { name: "Search", Icon: MinimalSearch },
  { name: "Calendar", Icon: MinimalCalendar },
  { name: "Folder", Icon: MinimalFolder },
  { name: "Location", Icon: MinimalLocation },
  { name: "Settings", Icon: MinimalSettings },
];

export default function HeroProduct() {
  return (
    <section className="relative pb-20 md:pb-32">
      <div className="max-w-[1160px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative"
        >
          {/* Product UI */}
          <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] min-h-[420px]">
              {/* Left: Style Selector */}
              <div className="border-r border-border p-5 hidden lg:block">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Styles
                </p>
                <div className="space-y-1">
                  {styles.map((style) => (
                    <button
                      key={style.name}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors text-[13px] font-medium ${
                        style.active
                          ? "bg-primary/[0.08] text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {style.active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      )}
                      <span className={style.active ? "" : "ml-[16px]"}>
                        {style.name}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-border">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Your Styles
                  </p>
                  <div className="px-3 py-2 rounded-lg border border-dashed border-border text-[12px] text-muted-foreground cursor-pointer hover:border-primary/30 hover:text-primary transition-colors">
                    + Upload SVGs
                  </div>
                </div>
              </div>

              {/* Center: Prompt Workspace */}
              <div className="p-5 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-muted" />
                    <span className="w-3 h-3 rounded-full bg-muted" />
                    <span className="w-3 h-3 rounded-full bg-muted" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center">
                  {/* Prompt input */}
                  <div className="w-full max-w-[480px] mb-6">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                      Describe your SVG
                    </label>
                    <div className="relative">
                      <div className="flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3">
                        <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-[14px] text-foreground">
                          Create a location pin for a travel app
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[11px] text-muted-foreground">Style:</span>
                      <span className="text-[11px] font-medium text-primary bg-primary/[0.06] px-2 py-0.5 rounded-full">
                        Minimal Outline
                      </span>
                      <span className="text-[11px] text-muted-foreground ml-2">Format:</span>
                      <span className="text-[11px] font-medium text-foreground bg-muted px-2 py-0.5 rounded-full">
                        SVG
                      </span>
                    </div>
                  </div>

                  {/* Generated SVG preview */}
                  <div className="w-full max-w-[480px]">
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
                      {generatedIcons.map(({ name, Icon }) => (
                        <div
                          key={name}
                          className="aspect-square bg-background border border-border rounded-xl flex items-center justify-center hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group"
                        >
                          <Icon className="w-7 h-7 text-foreground group-hover:text-primary transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Style Library Preview */}
              <div className="border-l border-border p-5 hidden lg:block">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Library
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="text-[11px] font-medium text-foreground mb-2">Minimal Outline</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[MinimalSearch, MinimalCalendar, MinimalFolder, MinimalLocation, MinimalSettings, RoundedDashboard].map((Icon, i) => (
                        <div key={i} className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-3">
                    <p className="text-[11px] font-medium text-foreground mb-2">Rounded</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[RoundedDashboard, RoundedUser, RoundedNotification, RoundedAnalytics, RoundedUpload, BoldArrow].map((Icon, i) => (
                        <div key={i} className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-3">
                    <p className="text-[11px] font-medium text-foreground mb-2">Bold</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[BoldArrow, BoldHome, BoldGlobe, BoldMessage, BoldDocument, MinimalSettings].map((Icon, i) => (
                        <div key={i} className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gradient glow beneath product */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-16 bg-primary/[0.06] blur-[60px] rounded-full pointer-events-none" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
