"use client";

import { useState } from "react";
import { CLASS_MAP, getClassIcon } from "@/lib/classes";
import { cn } from "@/lib/utils";

interface ClassLegendProps {
  descriptions: Record<string, string>;
}

export function ClassLegend({ descriptions }: ClassLegendProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex flex-col divide-y divide-[var(--color-border)]">
      {(
        Object.entries(CLASS_MAP) as [
          string,
          { label: string; color: string; icon: string }
        ][]
      ).map(([key, info]) => {
        const color = info.color;
        const Icon = getClassIcon(key as Parameters<typeof getClassIcon>[0]);
        const isHovered = hovered === key;

        return (
          <div
            key={key}
            className={cn(
              "flex items-center gap-4 px-4 py-3.5 transition-all duration-200 cursor-default rounded-sm"
            )}
            style={{
              backgroundColor: isHovered
                ? "var(--color-surface-2)"
                : "transparent",
            }}
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Icon chip */}
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200"
              style={{
                backgroundColor: `${color}${isHovered ? "22" : "12"}`,
                border: `1px solid ${color}${isHovered ? "40" : "20"}`,
              }}
              aria-hidden
            >
              <Icon size={16} style={{ color }} strokeWidth={1.5} />
            </div>

            {/* Label + description */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span
                className="text-sm font-medium whitespace-nowrap transition-colors duration-200"
                style={{
                  color: isHovered ? color : "var(--color-text)",
                }}
              >
                {info.label}
              </span>
              <span
                className="text-xs truncate hidden sm:block"
                style={{ color: "var(--color-text-faint)" }}
              >
                {descriptions[key] ?? ""}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
