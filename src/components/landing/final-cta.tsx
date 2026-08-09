"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/svg-illustrations";

export default function FinalCta() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1160px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-background to-secondary/[0.04]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.05] blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-secondary/[0.04] blur-[80px] pointer-events-none" />

          <div className="relative border border-border rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-foreground tracking-tight mb-4">
              Create once.
              <br />
              Stay consistent everywhere.
            </h2>
            <p className="text-[15px] md:text-[16px] text-muted-foreground max-w-[480px] mx-auto leading-relaxed mb-8">
              Generate SVGs that actually belong to your visual language.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" className="text-[14px] font-medium h-11 px-6 gap-2">
                Start Creating — Free
                <ArrowRight className="w-4 h-4" />
              </Button>
              <span className="text-[12px] text-muted-foreground">
                No credit card required.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
