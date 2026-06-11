import Link from "next/link";
import {
  Layers, Server, Shield, Bug, Palette, Brain,
  GitBranch, Compass, CheckCircle, BookOpen, Network,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CLASS_MAP, type ClassName } from "@/lib/classes";
import type { PluginCard } from "@/lib/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Layers, Server, Shield, Bug, Palette, Brain,
  GitBranch, Compass, CheckCircle, BookOpen, Network,
};

interface CardMiniProps {
  card: PluginCard;
  locale: string;
  className?: string;
}

export function CardMini({ card, locale, className }: CardMiniProps) {
  const classKey = card.class as ClassName;
  const classInfo = CLASS_MAP[classKey];
  const classColor = classInfo.color;
  const IconComponent = ICON_MAP[classInfo.icon] ?? Network;

  const isAgent = card.type === "agent";
  const isCommand = card.type === "command";

  return (
    <Link
      href={`/${locale}/c/${card.type}/${card.slug}`}
      className={cn(
        "group flex flex-col gap-3 rounded-[var(--radius-card)] bg-[var(--color-surface-1)]",
        "border border-[var(--color-border)] p-4 relative overflow-hidden",
        "shadow-[var(--shadow-card)] transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-0)]",
        className
      )}
      aria-label={`${isAgent ? card.role + " — " : ""}${card.name}`}
    >
      {/* Left accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[var(--radius-card)] opacity-60 group-hover:opacity-100 transition-opacity duration-200"
        style={{ backgroundColor: classColor }}
        aria-hidden
      />

      <div className="pl-2">
        {/* Icon + name */}
        <div className="flex items-center gap-2.5 mb-2">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${classColor}15` }}
            aria-hidden
          >
            <IconComponent size={16} style={{ color: classColor }} strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <p
              className={cn(
                "font-semibold text-sm leading-tight text-[var(--color-ink)] truncate",
                isCommand && "font-mono"
              )}
              style={{ fontFamily: isCommand ? "var(--font-mono)" : "var(--font-display)" }}
            >
              {card.name}
            </p>
            {isAgent && (
              <p className="text-[11px] text-[var(--color-ink-muted)] truncate">{card.role}</p>
            )}
          </div>
        </div>

        {/* Summary */}
        <p className="text-xs text-[var(--color-ink-muted)] line-clamp-2 leading-relaxed">
          {card.summary}
        </p>

        {/* Class badge */}
        <div className="mt-2.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: classColor }} aria-hidden />
          <span className="text-[11px] text-[var(--color-ink-faint)]">{classInfo.label}</span>
        </div>
      </div>
    </Link>
  );
}
