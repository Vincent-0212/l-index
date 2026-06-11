"use client";

import { useState, useCallback } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TerminalProps {
  command: string;
  label?: string;
  className?: string;
}

type CopyState = "idle" | "copied" | "error";

export function Terminal({ command, label, className }: TerminalProps) {
  const [state, setState] = useState<CopyState>("idle");

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setState("copied");
      setTimeout(() => setState("idle"), 1800);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 1800);
    }
  }, [command]);

  const lines = command.split("\n");

  return (
    <div
      className={cn(
        "overflow-hidden border border-[var(--color-border)]",
        className
      )}
      style={{
        backgroundColor: "var(--color-surface)",
        borderRadius: "var(--radius-md)",
      }}
    >
      {/* Title bar */}
      <div
        className="relative flex items-center justify-between px-3"
        style={{
          height: "36px",
          backgroundColor: "var(--color-surface-2)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {/* macOS dots */}
        <div className="flex items-center gap-1.5" aria-hidden>
          <span
            className="block rounded-full"
            style={{ width: 10, height: 10, backgroundColor: "#FF5F57" }}
          />
          <span
            className="block rounded-full"
            style={{ width: 10, height: 10, backgroundColor: "#FEBC2E" }}
          />
          <span
            className="block rounded-full"
            style={{ width: 10, height: 10, backgroundColor: "#28C840" }}
          />
        </div>

        {/* Optional label — centré via position absolute */}
        {label && (
          <span
            className="pointer-events-none absolute inset-x-0 text-center text-xs"
            style={{
              color: "var(--color-text-faint)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {label}
          </span>
        )}

        {/* Copy button */}
        <button
          onClick={handleCopy}
          aria-label={
            state === "copied"
              ? "Copié"
              : state === "error"
              ? "Erreur lors de la copie"
              : "Copier la commande"
          }
          className={cn(
            "relative flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium transition-all duration-150 cursor-pointer",
            "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-1",
            state === "idle" &&
              "text-[var(--color-text-faint)] hover:text-[var(--color-text)]",
            state === "copied" && "text-[#28C840]",
            state === "error" && "text-[var(--color-accent)]"
          )}
        >
          {state === "idle" && <Copy size={13} strokeWidth={1.75} aria-hidden />}
          {state === "copied" && <Check size={13} strokeWidth={2} aria-hidden />}
          {state === "error" && (
            <AlertCircle size={13} strokeWidth={1.75} aria-hidden />
          )}
          <span>
            {state === "idle"
              ? "Copier"
              : state === "copied"
              ? "Copié !"
              : "Erreur"}
          </span>
        </button>
      </div>

      {/* Body */}
      <div className="px-4 py-4">
        <code
          className="block text-[13px] leading-6"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-text)",
          }}
        >
          {lines.map((line, i) => (
            <div key={i} className="flex items-start gap-2">
              <span
                className="shrink-0 select-none"
                style={{ color: "var(--color-accent)" }}
                aria-hidden
              >
                $
              </span>
              <span className="flex-1 whitespace-pre-wrap break-all">
                {line}
              </span>
            </div>
          ))}
        </code>
      </div>
    </div>
  );
}
