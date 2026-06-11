import Link from "next/link";
import { getClassIcon, CLASS_MAP } from "@/lib/classes";
import { cn } from "@/lib/utils";
import type { SkillCard as SkillCardType } from "@/lib/types";
import type { ClassName } from "@/lib/classes";

interface SkillCardProps {
  skill: SkillCardType;
  locale: string;
  className?: string;
}

export function SkillCard({ skill, locale, className }: SkillCardProps) {
  const Icon = getClassIcon(skill.class as ClassName);
  const classInfo = CLASS_MAP[skill.class as ClassName];
  const color = classInfo?.color ?? "var(--color-text-faint)";
  const href = `/${locale}/c/${skill.type}/${skill.slug}`;

  return (
    <Link
      href={href}
      className={cn(
        "group block overflow-hidden border border-[var(--color-border)] transition-all duration-150",
        "hover:shadow-[var(--shadow-2)] hover:-translate-y-0.5",
        "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2",
        className
      )}
      style={{
        backgroundColor: "var(--color-surface)",
        borderRadius: "var(--radius-md)",
        borderTop: `2px solid ${color}`,
      }}
    >
      {/* Header — icon + name + class badge */}
      <div className="flex items-start justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Icon
            size={16}
            strokeWidth={1.75}
            style={{ color, flexShrink: 0 }}
            aria-hidden
          />
          <p
            className="truncate text-[14px] font-semibold"
            style={{ color: "var(--color-text)" }}
          >
            {skill.name}
          </p>
        </div>

        {/* Class badge — tag style (square corners for "module" feel) */}
        <span
          className="ml-2 shrink-0 rounded px-2 py-0.5 text-[11px] font-medium whitespace-nowrap"
          style={{
            backgroundColor: `color-mix(in srgb, ${color} 10%, var(--color-surface-3))`,
            color: color,
          }}
        >
          {classInfo?.label ?? skill.class}
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
        {skill.summary}
      </p>

      {/* Divider */}
      <div
        className="mx-4 mb-3 h-px"
        style={{ backgroundColor: "var(--color-border)" }}
        aria-hidden
      />

      {/* Triggers — mono, 1 line, faint */}
      <p
        className="px-4 pb-4 text-[12px] truncate"
        style={{
          color: "var(--color-text-faint)",
          fontFamily: "var(--font-mono)",
        }}
      >
        {skill.triggers}
      </p>
    </Link>
  );
}
