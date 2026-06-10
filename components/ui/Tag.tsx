import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Tag({ children, className, style }: TagProps) {
  return (
    <span
      style={style}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        "border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-ink-muted)]",
        className
      )}
    >
      {children}
    </span>
  );
}
