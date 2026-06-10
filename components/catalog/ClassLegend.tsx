"use client";

import { useState } from "react";
import {
  Layers, Server, Shield, Bug, Palette, Brain,
  GitBranch, Compass, CheckCircle, BookOpen, Network,
  type LucideIcon,
} from "lucide-react";
import { CLASS_MAP } from "@/lib/classes";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, LucideIcon> = {
  Layers, Server, Shield, Bug, Palette, Brain,
  GitBranch, Compass, CheckCircle, BookOpen, Network,
};

interface ClassLegendProps {
  descriptions: Record<string, string>;
}

export function ClassLegend({ descriptions }: ClassLegendProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex flex-col divide-y divide-[var(--color-border)]">
      {(Object.entries(CLASS_MAP) as [string, { label: string; color: string; icon: string }][]).map(([key, info]) => {
        const color = info.color === "prismatic" ? "#a78bfa" : info.color;
        const Icon = ICON_MAP[info.icon] ?? Network;
        const isHovered = hovered === key;

        return (
          <div
            key={key}
            className={cn(
              "flex items-center gap-4 px-4 py-3.5 transition-all duration-200 cursor-default rounded-sm",
              isHovered ? "bg-[var(--color-surface-1)]" : "bg-transparent"
            )}
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
          >
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
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span
                className="text-sm font-medium whitespace-nowrap transition-colors duration-200"
                style={{ color: isHovered ? color : "var(--color-ink)" }}
              >
                {info.label}
              </span>
              <span className="text-xs text-[var(--color-ink-faint)] truncate hidden sm:block">
                {descriptions[key] ?? ""}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
