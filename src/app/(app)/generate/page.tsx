"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Copy, Download, RefreshCw } from "@/components/svg-illustrations";

interface Style {
  id: string;
  name: string;
  slug: string;
}

interface GeneratedSvg {
  svgContent: string;
  metadata?: { index?: number };
}

export default function GeneratePage() {
  const [styles, setStyles] = useState<Style[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<GeneratedSvg[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [usage, setUsage] = useState({ used: 0, limit: 20 });

  useEffect(() => {
    fetch("/api/styles")
      .then((res) => res.json())
      .then((data) => {
        if (data.styles) {
          setStyles(data.styles);
          if (data.styles.length > 0) setSelectedStyle(data.styles[0].slug);
        }
      })
      .catch(() => {});

    fetch("/api/usage")
      .then((res) => res.json())
      .then((data) => {
        if (data.usage?.generations) {
          setUsage(data.usage.generations);
        }
      })
      .catch(() => {});
  }, []);

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setGenerating(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style: selectedStyle,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Generation failed");
        return;
      }

      setResults(data.results || []);
      if (data.usage) {
        setUsage(data.usage);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  function handleCopy(svgContent: string) {
    navigator.clipboard.writeText(svgContent);
  }

  function handleDownload(svgContent: string, index: number) {
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `svg-${Date.now()}-${index}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex h-full">
      {/* Left: Style Selector */}
      <div className="w-[220px] border-r border-border p-4 hidden lg:block flex-shrink-0">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Styles
        </p>
        <div className="space-y-0.5">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.slug)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors text-[13px] font-medium ${
                selectedStyle === style.slug
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {selectedStyle === style.slug && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              )}
              <span className={selectedStyle === style.slug ? "" : "ml-[16px]"}>
                {style.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Center + Right */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Prompt Area */}
        <div className="border-b border-border p-5">
          <div className="max-w-[640px]">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
              What do you want to create?
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <Input
                  placeholder="Create a calendar icon with rounded geometry and a 2px outline"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="h-11 pl-10 text-[14px]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleGenerate();
                  }}
                />
              </div>
              <Button
                className="h-11 px-5 text-[13px] font-medium gap-2"
                onClick={handleGenerate}
                disabled={generating || !prompt.trim()}
              >
                {generating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-[11px] text-muted-foreground">Style:</span>
              <span className="text-[11px] font-medium text-primary bg-primary/[0.06] px-2 py-0.5 rounded-full">
                {styles.find((s) => s.slug === selectedStyle)?.name || selectedStyle}
              </span>
              <span className="text-[11px] text-muted-foreground">Format:</span>
              <span className="text-[11px] font-medium text-foreground bg-muted px-2 py-0.5 rounded-full">
                SVG
              </span>
              <span className="text-[11px] text-muted-foreground ml-auto">
                {usage.used} / {usage.limit} generations
              </span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 p-5 overflow-y-auto">
          {/* Mobile style selector */}
          <div className="lg:hidden mb-5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Style
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.slug)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                    selectedStyle === style.slug
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-5">
              <p className="text-[13px] text-destructive">{error}</p>
            </div>
          )}

          {generating && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
              <p className="text-[14px] text-muted-foreground">
                Generating your SVGs...
              </p>
            </div>
          )}

          {!generating && results.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Generated Results
                </p>
                <span className="text-[11px] text-muted-foreground">
                  {results.length} SVGs
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {results.map((result, i) => (
                  <div
                    key={i}
                    className="group bg-card border border-border rounded-2xl p-4 hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div
                      className="aspect-square bg-muted/30 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/[0.04] transition-colors"
                      dangerouslySetInnerHTML={{ __html: result.svgContent }}
                    />
                    <p className="text-[12px] font-medium text-foreground truncate text-center mb-2">
                      SVG {i + 1}
                    </p>
                    <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(result.svgContent)}
                        className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        aria-label="Copy"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDownload(result.svgContent, i)}
                        className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        aria-label="Download"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={handleGenerate}
                        className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        aria-label="Regenerate"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {!generating && results.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Sparkles className="w-10 h-10 text-muted-foreground/30 mb-4" />
              <p className="text-[14px] text-muted-foreground mb-1">
                Describe what you want to create
              </p>
              <p className="text-[12px] text-muted-foreground/60">
                e.g. &quot;A settings gear icon with minimal outline style&quot;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
