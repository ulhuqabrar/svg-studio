"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/svg-illustrations";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-8 md:pt-44 md:pb-12 overflow-hidden">
      {/* Atmospheric gradient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px]" />
        <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-secondary/[0.03] blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[700px] h-[400px] rounded-full bg-primary/[0.03] blur-[140px]" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1200" height="800" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative max-w-[1160px] mx-auto px-5 text-center">
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
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 md:mb-24"
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
    </section>
  );
}
