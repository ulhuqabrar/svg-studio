"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
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

const styles = [
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

export default function StylesPage() {
  return (
    <div className="p-6 md:p-8 max-w-[1200px]">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-foreground tracking-tight mb-0.5">
          Styles
        </h1>
        <p className="text-[13px] text-muted-foreground">
          Curated visual languages for consistent SVG generation
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {styles.map((style) => (
          <div
            key={style.name}
            className="group bg-card border border-border rounded-2xl p-5 hover:border-primary/20 hover:shadow-sm transition-all"
          >
            <div className="grid grid-cols-2 gap-2 mb-4">
              {style.icons.map((Icon, j) => (
                <div
                  key={j}
                  className="aspect-square bg-muted/40 rounded-xl flex items-center justify-center group-hover:bg-primary/[0.04] transition-colors"
                >
                  <Icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
            <h3 className="text-[14px] font-semibold text-foreground mb-1">
              {style.name}
            </h3>
            <p className="text-[12px] text-muted-foreground leading-relaxed mb-4">
              {style.description}
            </p>
            <Link href={`/generate?style=${encodeURIComponent(style.name)}`} className="inline-flex items-center justify-center w-full h-8 px-3 rounded-4xl border border-border bg-transparent text-[12px] font-medium text-foreground hover:bg-muted transition-colors">
              Use Style
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
