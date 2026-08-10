"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/svg-illustrations";
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

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Beautiful animated gradient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Main large gradient orbs */}
        <div className="absolute top-[-20%] left-[5%] w-[800px] h-[700px] rounded-full bg-gradient-to-br from-blue-500/30 via-cyan-400/20 to-blue-600/25 blur-[120px] animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute top-[5%] right-[-5%] w-[700px] h-[600px] rounded-full bg-gradient-to-tl from-indigo-500/25 via-blue-400/20 to-cyan-300/25 blur-[100px] animate-[float_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[30%] left-[20%] w-[600px] h-[500px] rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-500/25 to-indigo-400/20 blur-[90px] animate-[float_12s_ease-in-out_infinite]" />
        
        {/* Secondary accent orbs for depth */}
        <div className="absolute top-[50%] left-[50%] w-[500px] h-[400px] rounded-full bg-gradient-to-bl from-blue-400/15 via-cyan-300/10 to-blue-500/15 blur-[80px] animate-[float_7s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[60%] right-[10%] w-[400px] h-[350px] rounded-full bg-gradient-to-tl from-indigo-400/15 via-blue-300/10 to-cyan-400/15 blur-[70px] animate-[float_9s_ease-in-out_infinite]" />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="w-full h-full" viewBox="0 0 1200 1200" fill="none" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="1200" height="1200" fill="url(#hero-grid)" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-[1160px] mx-auto px-5">
        {/* Text content */}
        <div className="text-center mb-16 md:mb-24">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-medium text-primary bg-primary/[0.06] border border-primary/10 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              AI-powered SVG creation
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[40px] leading-[48px] sm:text-[48px] sm:leading-[56px] md:text-[56px] md:leading-[64px] font-bold text-foreground tracking-tight max-w-[720px] mx-auto mb-5"
          >
            Create SVGs that
            <br />
            match your{" "}
            <span className="text-primary">style.</span>
          </motion.h1>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[16px] leading-[26px] md:text-[18px] md:leading-[28px] text-muted-foreground max-w-[540px] mx-auto mb-10"
          >
            Generate custom vector graphics in seconds — using curated styles or
            your own SVG design language.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button size="lg" className="text-[14px] font-medium h-11 px-6 gap-2">
              Start Creating — Free
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" className="text-[14px] font-medium h-11 px-6">
              Explore Styles
            </Button>
          </motion.div>
        </div>

        {/* Product UI Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative"
        >
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-xl overflow-hidden">
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
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] h-24 bg-primary/[0.08] blur-[80px] rounded-full pointer-events-none" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
