import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "SVG Studio — Create SVGs That Match Your Style",
  description:
    "Generate custom SVGs in your visual style with AI. Choose curated styles or teach SVG Studio your own SVG design language.",
  keywords: [
    "SVG generator",
    "AI SVG",
    "design system",
    "vector graphics",
    "SVG style",
    "custom SVG",
    "SVG design tool",
  ],
  openGraph: {
    title: "SVG Studio — Create SVGs That Match Your Style",
    description:
      "Generate custom SVGs in your visual style with AI. Choose curated styles or teach SVG Studio your own SVG design language.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="font-poppins antialiased">{children}</body>
    </html>
  );
}
