"use client";

import { useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyBlockProps {
  code: string;
  label?: string;
  className?: string;
}

type CopyState = "idle" | "copied" | "error";

export function CopyBlock({ code, label, className }: CopyBlockProps) {
  const [state, setState] = useState<CopyState>("idle");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 2000);
    }
  }

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-0)] p-4",
        className
      )}
    >
      <pre className="flex-1 overflow-x-auto font-mono text-sm text-[var(--color-ink-muted)] leading-relaxed whitespace-pre-wrap break-all">
        {label && (
          <span className="text-[var(--color-ink-faint)] select-none">
            {"$ "}
          </span>
        )}
        {code}
      </pre>
      <button
        onClick={handleCopy}
        aria-label={
          state === "copied"
            ? "Copié !"
            : state === "error"
              ? "Erreur de copie"
              : "Copier le code"
        }
        className={cn(
          "flex-shrink-0 flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-1.5 text-xs font-medium transition-all duration-150 ease-out",
          "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2",
          state === "idle" &&
            "bg-[var(--color-surface-2)] text-[var(--color-ink-muted)] hover:bg-[var(--color-border)] hover:text-[var(--color-ink)]",
          state === "copied" &&
            "bg-[var(--color-class-quality)] bg-opacity-20 text-[var(--color-class-quality)]",
          state === "error" && "bg-red-900/20 text-red-400"
        )}
      >
        {state === "idle" && <Copy size={12} aria-hidden />}
        {state === "copied" && <Check size={12} aria-hidden />}
        {state === "error" && <AlertCircle size={12} aria-hidden />}
        <span>
          {state === "idle" ? "Copier" : state === "copied" ? "Copié !" : "Erreur"}
        </span>
      </button>
    </div>
  );
}
