"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "@/components/svg-illustrations";

const faqs = [
  {
    question: "What is SVG Studio?",
    answer:
      "SVG Studio is an AI-powered platform that generates custom SVG graphics while maintaining a consistent visual style. You can choose from curated styles or teach it your own visual language.",
  },
  {
    question: "How does style generation work?",
    answer:
      "When you select a style, SVG Studio uses that style's visual parameters — stroke weight, corner radius, geometry, proportions — to guide the AI generation process. Every output follows the selected style consistently.",
  },
  {
    question: "Can I upload my own SVGs?",
    answer:
      "Yes. Pro users can upload 3–20 of their existing SVGs. SVG Studio analyzes their visual language and creates a style profile that guides future generation.",
  },
  {
    question: "How many SVGs should I upload for style analysis?",
    answer:
      "We recommend uploading 5–15 SVGs for the most accurate style analysis. More references help the AI understand your visual language more precisely.",
  },
  {
    question: "Does the AI generate actual SVG files?",
    answer:
      "Yes. All generated outputs are valid SVG vector files using standard SVG elements. They're compatible with any design tool, code editor, or browser.",
  },
  {
    question: "Can I use generated SVGs commercially?",
    answer:
      "Yes. You own the rights to all SVGs generated with SVG Studio. Use them in products, websites, marketing materials, or any commercial project.",
  },
  {
    question: "What's included in Free?",
    answer:
      "The free plan includes 2–3 curated styles, custom SVG generation using those styles, standard SVG export, and a limited number of generations per month.",
  },
  {
    question: "What's included in Pro?",
    answer:
      "Pro includes all free features plus 13+ curated styles, unlimited generations, SVG upload, AI style analysis, generating in your own style, and priority support.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-[15px] font-medium text-foreground pr-4 group-hover:text-primary transition-colors duration-150">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="text-[14px] text-muted-foreground leading-relaxed pb-5">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="max-w-[1160px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-foreground tracking-tight">
            Questions, answered.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-[680px] mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl px-6 md:px-7">
            {faqs.map((faq) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
