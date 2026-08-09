"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Copy, Download, RefreshCw, SoftStar } from "@/components/svg-illustrations";

interface SavedSvg {
  id: string;
  name: string;
  svg_content: string;
  is_favorite: boolean;
  created_at: string;
}

export default function MySvgsPage() {
  const [svgs, setSvgs] = useState<SavedSvg[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "favorites">("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchSvgs();
  }, [filter, page]);

  async function fetchSvgs() {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });
      if (filter === "favorites") params.set("favorite", "true");

      const res = await fetch(`/api/svgs?${params}`);
      const data = await res.json();

      if (data.svgs) {
        setSvgs(data.svgs);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  async function toggleFavorite(svg: SavedSvg) {
    try {
      await fetch(`/api/svgs/${svg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_favorite: !svg.is_favorite }),
      });
      fetchSvgs();
    } catch {
      // silent
    }
  }

  function handleCopy(content: string) {
    navigator.clipboard.writeText(content);
  }

  function handleDownload(content: string, name: string) {
    const blob = new Blob([content], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.toLowerCase().replace(/\s+/g, "-")}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  }

  return (
    <div className="p-6 md:p-8 max-w-[1200px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[22px] font-bold text-foreground tracking-tight mb-0.5">
            My SVGs
          </h1>
          <p className="text-[13px] text-muted-foreground">
            {svgs.length} SVGs in your library
          </p>
        </div>
        <Link
          href="/generate"
          className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-4xl bg-primary text-primary-foreground text-[13px] font-medium hover:bg-primary/80 transition-colors"
        >
          + Create SVG
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex gap-1 bg-muted rounded-lg p-0.5">
          {(["all", "favorites"] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-colors capitalize ${
                filter === f
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      ) : svgs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-[14px] text-muted-foreground mb-3">
            {filter === "favorites" ? "No favorites yet" : "No SVGs saved yet"}
          </p>
          <Link href="/generate">
            <Button size="sm" className="text-[13px]">
              Create your first SVG
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {svgs.map((svg) => (
              <div
                key={svg.id}
                className="group bg-card border border-border rounded-2xl p-4 hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="aspect-square bg-muted/30 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/[0.04] transition-colors relative overflow-hidden">
                  <div
                    className="w-full h-full flex items-center justify-center p-3 [&>svg]:w-full [&>svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: svg.svg_content }}
                  />
                  {svg.is_favorite && (
                    <button
                      onClick={() => toggleFavorite(svg)}
                      className="absolute top-2 right-2"
                    >
                      <SoftStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </button>
                  )}
                </div>
                <p className="text-[12px] font-medium text-foreground truncate mb-0.5">
                  {svg.name}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {formatDate(svg.created_at)}
                </p>
                <div className="flex items-center justify-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleCopy(svg.svg_content)}
                    className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Copy"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDownload(svg.svg_content, svg.name)}
                    className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Download"
                  >
                    <Download className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => toggleFavorite(svg)}
                    className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Favorite"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-[12px] text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
