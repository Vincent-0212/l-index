import Link from "next/link";
import { getClassIcon, CLASS_MAP } from "@/lib/classes";
import { cn } from "@/lib/utils";
import type { CommandCard as CommandCardType } from "@/lib/types";
import type { ClassName } from "@/lib/classes";

interface CommandCardProps {
  command: CommandCardType;
  locale: string;
  className?: string;
}

export function CommandCard({ command, locale, className }: CommandCardProps) {
  const Icon = getClassIcon(command.class as ClassName);
  const classInfo = CLASS_MAP[command.class as ClassName];
  const color = classInfo?.color ?? "var(--color-text-faint)";
  const href = `/${locale}/c/${command.type}/${command.slug}`;

  return (
    <Link
      href={href}
      className={cn(
        "group block overflow-hidden border border-[var(--color-border)] transition-all duration-150",
        "hover:bg-[var(--color-surface-3)] hover:shadow-[var(--shadow-1)]",
        "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2",
        className
      )}
      style={{
        backgroundColor: "var(--color-surface-2)",
        borderRadius: "var(--radius-md)",
        // Left border instead of top — visual distinction from Agent/Skill cards
        borderLeft: `3px solid ${color}`,
      }}
    >
      {/* Header row — class icon + badge */}
      <div className="flex items-start justify-between px-4 pt-4 pb-2">
        <Icon
          size={15}
          strokeWidth={1.75}
          style={{ color, flexShrink: 0 }}
          aria-hidden
        />

        {/* Class badge */}
        <span
          className="shrink-0 rounded px-2 py-0.5 text-[11px] font-medium whitespace-nowrap"
          style={{
            backgroundColor: `color-mix(in srgb, ${color} 10%, var(--color-surface-3))`,
            color: color,
          }}
        >
          {classInfo?.label ?? command.class}
        </span>
      </div>

      {/* Command name — $ prefix + mono bold accent */}
      <div className="px-4 pb-2 flex items-baseline gap-1.5">
        <span
          className="text-[15px] select-none"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-text-faint)",
          }}
          aria-hidden
        >
          $
        </span>
        <span
          className="text-[15px] font-semibold"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-accent)",
          }}
        >
          {command.name}
        </span>
      </div>

      {/* Summary — 2 lines max */}
      <p
        className="px-4 pb-3 text-[13px] leading-[1.5]"
        style={{
          color: "var(--color-text-muted)",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {command.summary}
      </p>

      {/* Effect — 1 line, faint */}
      <p
        className="px-4 pb-4 text-[12px] truncate"
        style={{ color: "var(--color-text-faint)" }}
      >
        {command.effect}
      </p>
    </Link>
  );
}
