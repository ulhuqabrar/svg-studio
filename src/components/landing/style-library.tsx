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
  SoftHeart,
  SoftStar,
  SoftBookmark,
  SoftLightning,
  TechnicalCode,
  TechnicalApi,
  TechnicalDatabase,
  EditorialLayout,
  EditorialTypography,
  MonolineGrid,
  MonolineLayers,
  GeometricHex,
  GeometricTriangle,
} from "@/components/svg-illustrations";

const styleFamilies = [
  {
    name: "Minimal Outline",
    description: "Clean strokes, sharp geometry, maximum clarity",
    icons: [MinimalSearch, MinimalCalendar, MinimalFolder, MinimalLocation],
  },
  {
    name: "Rounded",
    description: "Soft corners, friendly forms, approachable feel",
    icons: [RoundedDashboard, RoundedUser, RoundedNotification, RoundedAnalytics],
  },
  {
    name: "Bold Stroke",
    description: "Strong weight, confident presence, high impact",
    icons: [BoldArrow, BoldHome, BoldGlobe, BoldMessage],
  },
  {
    name: "Soft Filled",
    description: "Gentle fills with subtle strokes, warm character",
    icons: [SoftHeart, SoftStar, SoftBookmark, SoftLightning],
  },
  {
    name: "Technical",
    description: "Precise, grid-aware, developer-friendly",
    icons: [TechnicalCode, TechnicalApi, TechnicalDatabase, MinimalSettings],
  },
  {
    name: "Editorial",
    description: "Structured layouts, refined detail, magazine-inspired",
    icons: [EditorialLayout, EditorialTypography, MonolineGrid, MonolineLayers],
  },
  {
    name: "Geometric",
    description: "Angular precision, modern abstract forms",
    icons: [GeometricHex, GeometricTriangle, BoldDocument, RoundedUpload],
  },
  {
    name: "Monoline",
    description: "Single weight, consistent density, timeless",
    icons: [MonolineGrid, MonolineLayers, MinimalSearch, MinimalCalendar],
  },
];

export default function StyleLibrary() {
  return (
    <section id="styles" className="py-24 md:py-32">
      <div className="max-w-[1160px] mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] font-bold text-foreground tracking-tight mb-4">
            Start with a style that fits.
          </h2>
          <p className="text-[15px] md:text-[16px] text-muted-foreground max-w-[520px] mx-auto leading-relaxed">
            Choose a visual language and create a complete library of SVGs that
            feel like they belong together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {styleFamilies.map((style, i) => (
            <motion.div
              key={style.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-card border border-border rounded-2xl p-5 hover:border-primary/20 hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              <div className="grid grid-cols-2 gap-2 mb-4">
                {style.icons.map((Icon, j) => (
                  <div
                    key={j}
                    className="aspect-square bg-muted/40 rounded-xl flex items-center justify-center group-hover:bg-primary/[0.04] transition-colors duration-200"
                  >
                    <Icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors duration-200" />
                  </div>
                ))}
              </div>
              <h3 className="text-[14px] font-semibold text-foreground mb-1">
                {style.name}
              </h3>
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                {style.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
