import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";
import { getClassIcon, CLASS_MAP } from "@/lib/classes";
import { cn } from "@/lib/utils";
import type { AgentCard as AgentCardType } from "@/lib/types";
import type { ClassName } from "@/lib/classes";

interface AgentCardProps {
  agent: AgentCardType;
  locale: string;
  className?: string;
}

export function AgentCard({ agent, locale, className }: AgentCardProps) {
  const Icon = getClassIcon(agent.class as ClassName);
  const classInfo = CLASS_MAP[agent.class as ClassName];
  const color = classInfo?.color ?? "var(--color-text-faint)";
  const href = `/${locale}/c/${agent.type}/${agent.slug}`;

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
        borderTop: `3px solid ${color}`,
      }}
    >
      {/* Header — icon + name + role + class badge */}
      <div className="flex items-start justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Icon
            size={18}
            strokeWidth={1.75}
            style={{ color, flexShrink: 0 }}
            aria-hidden
          />
          <div className="min-w-0">
            <p
              className="truncate text-[15px] font-semibold leading-tight"
              style={{ color: "var(--color-text)" }}
            >
              {agent.name}
            </p>
            <p
              className="truncate text-[13px] leading-tight mt-0.5"
              style={{ color: "var(--color-text-muted)" }}
            >
              {agent.role}
            </p>
          </div>
        </div>

        {/* Class badge — pill */}
        <span
          className="ml-2 shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap"
          style={{
            backgroundColor: `color-mix(in srgb, ${color} 12%, var(--color-surface-3))`,
            color: color,
          }}
        >
          {classInfo?.label ?? agent.class}
        </span>
      </div>

      {/* Avatar zone — 3:2 aspect ratio */}
      <div
        className="mx-4 mb-3 overflow-hidden"
        style={{ borderRadius: "var(--radius-sm)" }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            aspectRatio: "3/2",
            backgroundColor: "var(--color-surface-3)",
          }}
        >
          {agent.avatar ? (
            <Image
              src={agent.avatar}
              alt={agent.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 300px"
            />
          ) : (
            <User
              size={32}
              strokeWidth={1.25}
              style={{ color: "var(--color-text-faint)" }}
              aria-hidden
            />
          )}
        </div>
      </div>

      {/* Summary — 2 lines max */}
      <p
        className="px-4 pb-4 text-[13px] leading-[1.5]"
        style={{
          color: "var(--color-text-muted)",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {agent.summary}
      </p>
    </Link>
  );
}
