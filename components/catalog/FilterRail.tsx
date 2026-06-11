"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CLASS_MAP } from "@/lib/classes";
import { getClassIcon } from "@/lib/classes";
import type { ClassName } from "@/lib/classes";

interface FilterRailFilters {
  class?: string;
  search: string;
}

interface FilterRailProps {
  filters: FilterRailFilters;
  onFiltersChange: (f: FilterRailFilters) => void;
  totalCount: number;
  filteredCount: number;
  availableClasses?: ClassName[];
}

export function FilterRail({
  filters,
  onFiltersChange,
  totalCount,
  filteredCount,
  availableClasses,
}: FilterRailProps) {
  const hasFilters = !!(filters.class || filters.search);

  const classEntries = (
    Object.entries(CLASS_MAP) as [ClassName, { label: string; color: string }][]
  ).filter(([key]) =>
    availableClasses ? availableClasses.includes(key) : true
  );

  function toggleClass(key: string) {
    onFiltersChange({
      ...filters,
      class: filters.class === key ? undefined : key,
    });
  }

  function setSearch(s: string) {
    onFiltersChange({ ...filters, search: s });
  }

  function reset() {
    onFiltersChange({ search: "" });
  }

  return (
    <aside
      className="flex flex-col gap-5 w-full"
      aria-label="Filtres"
    >
      {/* Search input */}
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--color-text-faint)" }}
          aria-hidden
        />
        <input
          type="search"
          placeholder="Filtrer…"
          value={filters.search}
          onChange={(e) => setSearch(e.target.value)}
          className={cn(
            "w-full border border-[var(--color-border)] pl-8 pr-3 text-sm",
            "placeholder:text-[var(--color-text-faint)]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]",
            "transition-colors duration-150"
          )}
          style={{
            height: "36px",
            backgroundColor: "var(--color-surface-2)",
            borderRadius: "var(--radius-sm)",
            color: "var(--color-text)",
          }}
        />
      </div>

      {/* Count + Reset */}
      <div className="flex items-center justify-between">
        <span
          className="text-[12px]"
          style={{ color: "var(--color-text-faint)" }}
        >
          {filteredCount} / {totalCount}
        </span>
        {hasFilters && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-[12px] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            style={{ color: "var(--color-text-faint)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-text-muted)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-faint)")
            }
          >
            <X size={11} aria-hidden />
            Effacer
          </button>
        )}
      </div>

      {/* Discipline filter */}
      <div>
        <p
          className="mb-2 text-[11px] font-semibold uppercase tracking-widest"
          style={{ color: "var(--color-text-faint)" }}
        >
          Discipline
        </p>
        <div className="flex flex-col gap-0.5">
          {classEntries.map(([key, info]) => {
            const color = info.color;
            const active = filters.class === key;
            const Icon = getClassIcon(key);

            return (
              <button
                key={key}
                onClick={() => toggleClass(key)}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-2 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left text-[13px]",
                  "transition-all duration-150 cursor-pointer",
                  "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                )}
                style={
                  active
                    ? {
                        backgroundColor: `color-mix(in srgb, ${color} 10%, var(--color-surface-2))`,
                        color: color,
                      }
                    : {
                        color: "var(--color-text-muted)",
                      }
                }
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-surface-2)";
                    e.currentTarget.style.color = "var(--color-text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = "";
                    e.currentTarget.style.color = "var(--color-text-muted)";
                  }
                }}
              >
                {/* Color dot */}
                <span
                  className="h-2 w-2 rounded-full shrink-0 transition-all duration-150"
                  style={{
                    backgroundColor: active ? color : `${color}66`,
                  }}
                  aria-hidden
                />

                {/* Icon */}
                <Icon
                  size={13}
                  strokeWidth={1.75}
                  style={{ color: active ? color : "var(--color-text-faint)", flexShrink: 0 }}
                  aria-hidden
                />

                {/* Label */}
                <span className="flex-1 truncate">{info.label}</span>

                {/* X to clear when active */}
                {active && (
                  <X
                    size={11}
                    style={{ color: "var(--color-text-faint)" }}
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
