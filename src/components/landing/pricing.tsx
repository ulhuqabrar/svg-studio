"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/svg-illustrations";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Get started with curated styles",
    features: [
      "2–3 curated styles",
      "Custom SVG generation",
      "Standard SVG export",
      "Limited generations",
    ],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$2",
    period: "/month",
    description: "Unlock your own visual language",
    features: [
      "13+ curated styles",
      "Unlimited generations",
      "Upload your own SVGs",
      "AI style analysis",
      "Generate in your own style",
      "Priority support",
    ],
    cta: "Start Creating",
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-[1160px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-foreground tracking-tight mb-4">
            Start free. Go further with your own style.
          </h2>
          <p className="text-[15px] md:text-[16px] text-muted-foreground max-w-[480px] mx-auto leading-relaxed">
            Try SVG Studio with curated styles, then unlock the full power of
            custom style generation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[780px] mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`bg-card rounded-2xl p-6 md:p-7 flex flex-col ${
                plan.featured
                  ? "border-2 border-primary/20 shadow-md"
                  : "border border-border"
              }`}
            >
              <div className="mb-6">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-[32px] font-bold text-foreground tracking-tight">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-[14px] text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <h3 className="text-[15px] font-semibold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-[13px] text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckIcon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-[13px] text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.featured ? "default" : "outline"}
                className={`w-full h-10 text-[13px] font-medium ${
                  plan.featured ? "" : ""
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
