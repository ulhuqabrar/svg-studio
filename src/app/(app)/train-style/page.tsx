"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, CheckIcon } from "@/components/svg-illustrations";

const steps = [
  { number: 1, label: "Upload SVGs" },
  { number: 2, label: "Analyze Style" },
  { number: 3, label: "Save & Generate" },
];

const analysisMetrics = [
  { label: "Stroke weight", value: "2px", confidence: 95 },
  { label: "Corner radius", value: "Rounded", confidence: 88 },
  { label: "Fill behavior", value: "Outline only", confidence: 92 },
  { label: "Geometry", value: "Soft, organic", confidence: 85 },
  { label: "Visual density", value: "Minimal", confidence: 90 },
  { label: "Composition", value: "Centered", confidence: 87 },
];

export default function TrainStylePage() {
  const [step, setStep] = useState(1);
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [styleName, setStyleName] = useState("");

  function handleUpload() {
    setUploaded(true);
    setStep(2);
  }

  function handleAnalyze() {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      setStep(3);
    }, 3000);
  }

  return (
    <div className="p-6 md:p-8 max-w-[900px]">
      <div className="mb-8">
        <h1 className="text-[22px] font-bold text-foreground tracking-tight mb-0.5">
          Train Your Style
        </h1>
        <p className="text-[13px] text-muted-foreground">
          Upload SVGs and teach Studio your visual language
        </p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.number} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= s.number
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step > s.number ? (
                <CheckIcon className="w-3.5 h-3.5" />
              ) : (
                s.number
              )}
            </div>
            <span
              className={`text-[12px] font-medium ${
                step >= s.number ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div className="w-8 h-px bg-border mx-2" />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Upload */}
      {step === 1 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-[16px] font-semibold text-foreground mb-4">
            Upload your SVGs
          </h2>
          <div className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center mb-5 hover:border-primary/30 transition-colors cursor-pointer">
            <Upload className="w-10 h-10 text-muted-foreground mb-3" />
            <p className="text-[14px] text-muted-foreground text-center mb-1">
              Drag SVGs here or click to browse
            </p>
            <p className="text-[12px] text-muted-foreground/60">
              Upload 3–20 SVGs for best results
            </p>
          </div>
          <Button
            className="h-10 text-[13px] font-medium"
            onClick={handleUpload}
          >
            Upload Files
          </Button>
        </div>
      )}

      {/* Step 2: Analyze */}
      {step === 2 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-[16px] font-semibold text-foreground mb-4">
            Analyze Style
          </h2>

          {!analyzed && !analyzing && (
            <div className="text-center py-8">
              <p className="text-[13px] text-muted-foreground mb-4">
                6 SVGs ready for analysis
              </p>
              <Button
                className="h-10 text-[13px] font-medium"
                onClick={handleAnalyze}
              >
                Start Analysis
              </Button>
            </div>
          )}

          {analyzing && (
            <div className="text-center py-8">
              <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[14px] text-foreground font-medium mb-1">
                Analyzing your SVGs...
              </p>
              <p className="text-[12px] text-muted-foreground">
                Extracting visual DNA from uploaded files
              </p>
            </div>
          )}

          {analyzed && (
            <div className="space-y-4">
              <p className="text-[12px] text-primary font-medium">
                Style analysis complete
              </p>
              <div className="space-y-3">
                {analysisMetrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[13px] text-foreground font-medium">
                        {metric.label}
                      </span>
                      <span className="text-[12px] text-muted-foreground">
                        {metric.value}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${metric.confidence}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button
                className="h-10 text-[13px] font-medium mt-4"
                onClick={() => setStep(3)}
              >
                Continue
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Save */}
      {step === 3 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-[16px] font-semibold text-foreground mb-4">
            Save your style
          </h2>
          <div className="space-y-4 max-w-[400px]">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-foreground">
                Style name
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Design System"
                value={styleName}
                onChange={(e) => setStyleName(e.target.value)}
                className="w-full h-11 px-3 text-[14px] bg-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
              />
            </div>
            <Button
              className="h-10 text-[13px] font-medium"
              disabled={!styleName}
            >
              Save Style & Start Generating
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
