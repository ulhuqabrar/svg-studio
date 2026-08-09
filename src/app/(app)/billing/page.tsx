"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/svg-illustrations";

export default function BillingPage() {
  return (
    <div className="p-6 md:p-8 max-w-[900px]">
      <h1 className="text-[22px] font-bold text-foreground tracking-tight mb-6">
        Billing
      </h1>

      {/* Current Plan */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold text-foreground">
            Current Plan
          </h2>
          <span className="text-[12px] font-medium text-primary bg-primary/[0.06] px-2.5 py-1 rounded-full">
            Free
          </span>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[13px] text-muted-foreground">Generations</span>
            <span className="text-[13px] font-medium text-foreground">8 / 20</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "40%" }} />
          </div>
        </div>
        <Link href="#upgrade" className="inline-flex items-center justify-center h-9 px-4 rounded-4xl bg-primary text-primary-foreground text-[13px] font-medium hover:bg-primary/80 transition-colors">
          Upgrade to Pro
        </Link>
      </div>

      {/* Upgrade */}
      <div id="upgrade" className="bg-card border border-primary/20 rounded-2xl p-6 mb-6">
        <h2 className="text-[16px] font-semibold text-foreground mb-4">
          Upgrade to Pro
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start gap-2">
            <CheckIcon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-[13px] text-foreground">13+ curated styles</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckIcon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-[13px] text-foreground">Unlimited generations</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckIcon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-[13px] text-foreground">Upload your own SVGs</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckIcon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-[13px] text-foreground">AI style analysis</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckIcon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-[13px] text-foreground">Generate in your own style</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckIcon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-[13px] text-foreground">Priority support</span>
          </div>
        </div>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-[28px] font-bold text-foreground">$2</span>
          <span className="text-[14px] text-muted-foreground">/month</span>
        </div>
        <Button className="h-10 text-[13px] font-medium">
          Upgrade to Pro
        </Button>
      </div>

      {/* Usage History */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-[16px] font-semibold text-foreground mb-4">
          Usage History
        </h2>
        <p className="text-[13px] text-muted-foreground">
          No billing history yet. Upgrade to Pro to unlock all features.
        </p>
      </div>
    </div>
  );
}
