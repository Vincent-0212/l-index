"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "dim";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-surface-0)] hover:brightness-110",
  ghost:
    "bg-transparent border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-ink-muted)] hover:text-[var(--color-ink)]",
  dim: "bg-[var(--color-surface-2)] text-[var(--color-ink)] hover:bg-[var(--color-border)]",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-sm)] px-5 py-3 text-sm font-medium transition-all duration-150 ease-out cursor-pointer",
        "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
