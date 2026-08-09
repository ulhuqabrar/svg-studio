"use client";

import { motion } from "framer-motion";
import {
  UseCaseDesign,
  UseCaseDev,
  UseCaseMarketing,
  UseCaseProduct,
  BoldDocument,
  RoundedDashboard,
  MinimalSearch,
  BoldGlobe,
  SoftHeart,
  TechnicalCode,
} from "@/components/svg-illustrations";

const useCases = [
  {
    title: "Product Designers",
    description: "Create icons that match your product's visual language.",
    icons: [RoundedDashboard, MinimalSearch, BoldDocument],
  },
  {
    title: "Design Systems",
    description: "Maintain consistency across your entire component library.",
    icons: [UseCaseDesign, UseCaseProduct, UseCaseDev],
  },
  {
    title: "Developers",
    description: "Generate production-ready SVGs without leaving your workflow.",
    icons: [TechnicalCode, BoldGlobe, MinimalSearch],
  },
  {
    title: "Marketing Teams",
    description: "On-brand visuals for landing pages and campaigns.",
    icons: [UseCaseMarketing, SoftHeart, BoldDocument],
  },
];

export default function UseCases() {
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
            Built for every place your brand
            <br className="hidden sm:block" />
            needs to stay consistent.
          </h2>
          <p className="text-[15px] md:text-[16px] text-muted-foreground max-w-[520px] mx-auto leading-relaxed">
            From product interfaces to marketing materials, create SVGs that
            belong to the same visual system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {useCases.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/20 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex -space-x-1.5">
                  {useCase.icons.map((Icon, j) => (
                    <div
                      key={j}
                      className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center border-2 border-card"
                    >
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                  ))}
                </div>
                <div className="pt-1">
                  <h3 className="text-[15px] font-semibold text-foreground mb-1">
                    {useCase.title}
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
