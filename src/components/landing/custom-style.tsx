"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, CheckIcon } from "@/components/svg-illustrations";

const uploadedSvgs = [
  "icon-search.svg",
  "icon-calendar.svg",
  "icon-folder.svg",
  "icon-location.svg",
];

export default function CustomStyle() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1160px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Upload UI */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
              <div className="p-5">
                <h3 className="text-[14px] font-semibold text-foreground mb-4">
                  Upload your SVGs
                </h3>

                {/* Drop area */}
                <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center mb-5 hover:border-primary/30 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mb-3" />
                  <p className="text-[13px] text-muted-foreground text-center">
                    Drag SVGs here or click to browse
                  </p>
                  <p className="text-[11px] text-muted-foreground/60 mt-1">
                    Upload 3–20 SVGs for best results
                  </p>
                </div>

                {/* Uploaded files */}
                <div className="space-y-2">
                  {uploadedSvgs.map((name) => (
                    <div
                      key={name}
                      className="flex items-center gap-2.5 px-3 py-2 bg-primary/[0.04] rounded-lg border border-primary/10"
                    >
                      <CheckIcon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span className="text-[12px] font-medium text-foreground">
                        {name}
                      </span>
                      <span className="ml-auto text-[10px] text-muted-foreground">
                        Analyzed
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-foreground tracking-tight mb-4">
              Already have a
              <br />
              visual language?
            </h2>
            <p className="text-[15px] md:text-[16px] text-muted-foreground leading-relaxed mb-6 max-w-[440px]">
              Upload your SVGs and let Studio learn what makes them yours. Then
              generate new graphics that match your existing design system.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "AI analyzes stroke, geometry, and proportions",
                "Detects color palette and visual density",
                "Creates a reusable style profile",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckIcon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-[14px] text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" className="text-[14px] font-medium h-11 px-6">
              Upload Your SVGs
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
