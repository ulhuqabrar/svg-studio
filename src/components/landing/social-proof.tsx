"use client";

import { motion } from "framer-motion";

export default function SocialProof() {
  return (
    <section className="py-16 md:py-20 border-y border-border">
      <div className="max-w-[1160px] mx-auto px-5 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[14px] text-muted-foreground mb-8"
        >
          Built for people who care about consistency.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {["Designers", "Developers", "Product Teams", "Agencies", "Marketing Teams"].map(
            (label) => (
              <span
                key={label}
                className="text-[13px] font-medium text-foreground/60"
              >
                {label}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
