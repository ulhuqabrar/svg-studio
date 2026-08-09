"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CommandSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  const filteredItems = [
    { label: "Generate SVG", href: "/generate", category: "Actions" },
    { label: "My SVGs", href: "/svgs", category: "Navigation" },
    { label: "Browse Styles", href: "/styles", category: "Navigation" },
    { label: "My Styles", href: "/my-styles", category: "Navigation" },
    { label: "Train Your Style", href: "/train-style", category: "Actions" },
    { label: "Settings", href: "/settings", category: "Navigation" },
  ].filter(
    (item) =>
      query === "" ||
      item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-[520px] mx-4 bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search SVGs, styles, actions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 h-12 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground outline-none"
            autoFocus
          />
          <kbd className="text-[10px] text-muted-foreground bg-muted border border-border rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        <div className="max-h-[320px] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <p className="text-[13px] text-muted-foreground text-center py-8">
              No results found.
            </p>
          ) : (
            <>
              {["Actions", "Navigation"].map((cat) => {
                const items = filteredItems.filter((i) => i.category === cat);
                if (items.length === 0) return null;
                return (
                  <div key={cat}>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                      {cat}
                    </p>
                    {items.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => {
                          router.push(item.href);
                          onOpenChange(false);
                          setQuery("");
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-foreground hover:bg-muted transition-colors text-left"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
