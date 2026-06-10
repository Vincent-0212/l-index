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

function ClassBadge({ className, color }: { className: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
      style={{ backgroundColor: `${color}18`, color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} aria-hidden />
      {className}
    </span>
  );
}

function TypeLabel({ type }: { type: PluginCard["type"] }) {
  const labels: Record<PluginCard["type"], string> = {
    agent: "Agent",
    skill: "Skill",
    command: "Commande",
    team: "Team",
  };
  return (
    <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-ink-faint)]">
      {labels[type]}
    </span>
  );
}

interface CardBaseProps {
  card: PluginCard;
  locale: string;
  className?: string;
  standalone?: boolean;
}

export function CardBase({ card, locale, className, standalone = false }: CardBaseProps) {
  const classKey = card.class as ClassName;
  const classInfo = CLASS_MAP[classKey];
  const classColor = classInfo.color === "prismatic" ? "#a78bfa" : classInfo.color;
  const IconComponent = ICON_MAP[classInfo.icon] ?? Network;

  const isAgent = card.type === "agent";
  const isCommand = card.type === "command";

  const cardContent = (
    <div
      className={cn(
        "relative flex flex-col rounded-[var(--radius-card)] bg-[var(--color-surface-1)]",
        "border border-[var(--color-border)] overflow-hidden",
        "shadow-[var(--shadow-card)]",
        "transition-all duration-200 ease-out",
        !standalone && [
          "cursor-pointer group",
          "hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]",
          "focus-within:ring-2 focus-within:ring-[var(--color-accent)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--color-surface-0)]",
        ],
        className
      )}
    >
      {/* Accent left border (couleur de classe) */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[var(--radius-card)] transition-all duration-200"
        style={{
          backgroundColor: classColor,
          opacity: standalone ? 1 : undefined,
          boxShadow: standalone ? `2px 0 8px ${classColor}40` : undefined,
        }}
        aria-hidden
      />

      <div className="pl-5 pr-4 pt-4 pb-4 flex flex-col gap-3 flex-1">
        {/* Header: type label */}
        <TypeLabel type={card.type} />

        {/* Avatar + nom + rôle */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${classColor}15`, border: `1px solid ${classColor}25` }}
            aria-hidden
          >
            <IconComponent size={20} style={{ color: classColor }} strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <p
              className={cn(
                "font-semibold leading-tight text-[var(--color-ink)] truncate",
                isCommand ? "text-sm font-mono" : "text-base"
              )}
              style={{ fontFamily: isCommand ? "var(--font-mono)" : "var(--font-display)" }}
            >
              {card.name}
            </p>
            {isAgent && (
              <p className="text-xs text-[var(--color-ink-muted)] mt-0.5 truncate">{card.role}</p>
            )}
            {card.type === "team" && (
              <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">
                {card.memberSlugs.length} agent{card.memberSlugs.length > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>

        {/* Class badge */}
        <ClassBadge className={classInfo.label} color={classColor} />

        {/* Summary */}
        <p className="text-sm leading-relaxed text-[var(--color-ink-muted)] line-clamp-3 flex-1">
          {card.summary}
        </p>

        {/* CTA */}
        {!standalone && (
          <p
            className="text-xs font-medium text-[var(--color-ink-faint)] group-hover:text-[var(--color-accent)] transition-colors duration-150 mt-auto pt-1"
          >
            Voir la fiche →
          </p>
        )}
      </div>
    </div>
  );

  if (standalone) return cardContent;

  return (
    <Link
      href={`/${locale}/c/${card.type}/${card.slug}`}
      className="block focus:outline-none"
      tabIndex={0}
      aria-label={`${isAgent ? card.role + " — " : ""}${card.name}`}
    >
      {cardContent}
    </Link>
  );
}
