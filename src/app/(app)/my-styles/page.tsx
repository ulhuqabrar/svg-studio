"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

function StyleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const myStyles = [
  { name: "Acme Design System", count: 18, updated: "2 days ago", status: "Learned" },
  { name: "Product Icons", count: 24, updated: "5 days ago", status: "Learned" },
];

export default function MyStylesPage() {
  return (
    <div className="p-6 md:p-8 max-w-[1200px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-foreground tracking-tight mb-0.5">
            My Styles
          </h1>
          <p className="text-[13px] text-muted-foreground">
            Custom styles trained from your uploaded SVGs
          </p>
        </div>
        <Link href="/train-style" className="inline-flex items-center justify-center h-9 px-4 rounded-4xl bg-primary text-primary-foreground text-[13px] font-medium hover:bg-primary/80 transition-colors">
          + New Style
        </Link>
      </div>

      {myStyles.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <StyleIcon />
          </div>
          <h2 className="text-[16px] font-semibold text-foreground mb-1">
            No styles yet
          </h2>
          <p className="text-[13px] text-muted-foreground mb-5 max-w-[320px] mx-auto">
            Upload your SVGs to teach Studio your visual language.
          </p>
          <Link href="/train-style" className="inline-flex items-center justify-center h-9 px-4 rounded-4xl bg-primary text-primary-foreground text-[13px] font-medium hover:bg-primary/80 transition-colors">
            Train Your Style
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {myStyles.map((style) => (
            <div
              key={style.name}
              className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/20 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <StyleIcon />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-foreground truncate mb-0.5">
                  {style.name}
                </p>
                <p className="text-[12px] text-muted-foreground">
                  {style.count} SVGs · {style.status} · Updated {style.updated}
                </p>
              </div>
                <Link href="/generate" className="inline-flex items-center justify-center h-8 px-3 rounded-4xl border border-border bg-transparent text-[12px] font-medium text-foreground hover:bg-muted transition-colors flex-shrink-0">
                  Generate
                </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
