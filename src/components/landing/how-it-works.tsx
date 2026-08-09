"use client";

import { motion } from "framer-motion";
import {
  MinimalSearch,
  MinimalCalendar,
  RoundedDashboard,
  RoundedUser,
  BoldHome,
  BoldGlobe,
  Sparkles,
} from "@/components/svg-illustrations";

const steps = [
  {
    number: "01",
    title: "Choose a style",
    description: "Select from curated visual languages or upload your own SVGs.",
    visual: (
      <div className="bg-background border border-border rounded-xl p-4">
        <div className="space-y-1.5">
          {["Minimal Outline", "Rounded", "Bold", "Soft Filled"].map((name, i) => (
            <div
              key={name}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium ${
                i === 0
                  ? "bg-primary/[0.08] text-primary border border-primary/10"
                  : "text-muted-foreground"
              }`}
            >
              {i === 0 && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
              <span className={i === 0 ? "" : "ml-[16px]"}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Describe what you need",
    description: "Tell the AI what SVG you want in plain language.",
    visual: (
      <div className="bg-background border border-border rounded-xl p-4">
        <div className="flex items-center gap-2.5 bg-muted/50 rounded-lg px-3 py-2.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-[12px] text-foreground">
            Create a calendar icon with rounded geometry
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2.5">
          <span className="text-[10px] text-muted-foreground">Style:</span>
          <span className="text-[10px] font-medium text-primary bg-primary/[0.06] px-2 py-0.5 rounded-full">Rounded</span>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Generate matching SVGs",
    description: "Get consistent vector graphics in your chosen style.",
    visual: (
      <div className="bg-background border border-border rounded-xl p-4">
        <div className="grid grid-cols-3 gap-2">
          {[MinimalSearch, MinimalCalendar, RoundedDashboard].map((Icon, i) => (
            <div key={i} className="aspect-square bg-primary/[0.04] rounded-lg flex items-center justify-center border border-primary/10">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-[1160px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-foreground tracking-tight mb-4">
            From idea to SVG in seconds.
          </h2>
          <p className="text-[15px] md:text-[16px] text-muted-foreground max-w-[480px] mx-auto leading-relaxed">
            Three simple steps to create consistent vector graphics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <div className="mb-5">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-[12px] font-bold text-primary-foreground mb-3">
                  {step.number}
                </span>
                <h3 className="text-[17px] font-semibold text-foreground mb-1.5">
                  {step.title}
                </h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="flex-1 mt-auto">
                {step.visual}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
