"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CLASS_MAP } from "@/lib/classes";
import type { PluginCard } from "@/lib/types";
import type { FilterOptions } from "@/lib/content";

const TYPES: PluginCard["type"][] = ["agent", "skill", "command", "team"];

const TYPE_LABELS: Record<PluginCard["type"], string> = {
  agent: "Agent",
  skill: "Skill",
  command: "Commande",
  team: "Team",
};

interface FilterRailProps {
  filters: FilterOptions;
  onChange: (f: FilterOptions) => void;
  totalCount: number;
  filteredCount: number;
}

export function FilterRail({ filters, onChange, totalCount, filteredCount }: FilterRailProps) {
  const hasFilters = !!(filters.type || filters.class || (filters.search && filters.search.length > 0));

  function setType(t: PluginCard["type"] | undefined) {
    onChange({ ...filters, type: t });
  }

  function toggleClass(c: string) {
    onChange({ ...filters, class: filters.class === c ? undefined : c });
  }

  function setSearch(s: string) {
    onChange({ ...filters, search: s || undefined });
  }

  function reset() {
    onChange({});
  }

  return (
    <aside className="flex flex-col gap-5 w-full">
      {/* Search */}
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-faint)] pointer-events-none"
          aria-hidden
        />
        <input
          type="search"
          placeholder="Rechercher un plugin..."
          value={filters.search ?? ""}
          onChange={(e) => setSearch(e.target.value)}
          className={cn(
            "w-full rounded-[var(--radius-sm)] bg-[var(--color-surface-1)] border border-[var(--color-border)]",
            "pl-8 pr-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-surface-0)]",
            "transition-colors duration-150"
          )}
        />
      </div>

      {/* Count + reset */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-[var(--color-ink-faint)]">
          {filteredCount} / {totalCount} plugins
        </span>
        {hasFilters && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            <X size={12} aria-hidden />
            Effacer
          </button>
        )}
      </div>

      {/* Type filter */}
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-faint)]">
          Type
        </p>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setType(undefined)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-all duration-150 cursor-pointer",
              "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]",
              !filters.type
                ? "bg-[var(--color-accent)] text-[var(--color-surface-0)]"
                : "bg-[var(--color-surface-2)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            )}
          >
            Tous
          </button>
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-all duration-150 cursor-pointer",
                "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]",
                filters.type === t
                  ? "bg-[var(--color-accent)] text-[var(--color-surface-0)]"
                  : "bg-[var(--color-surface-2)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
              )}
            >
              {TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Class filter */}
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-faint)]">
          Discipline
        </p>
        <div className="flex flex-col gap-1">
          {(Object.entries(CLASS_MAP) as [string, { label: string; color: string }][]).map(([key, info]) => {
            const color = info.color === "prismatic" ? "#a78bfa" : info.color;
            const active = filters.class === key;
            return (
              <button
                key={key}
                onClick={() => toggleClass(key)}
                className={cn(
                  "flex items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-left text-xs transition-all duration-150 cursor-pointer",
                  "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]",
                  active
                    ? "bg-[var(--color-surface-2)] text-[var(--color-ink)]"
                    : "text-[var(--color-ink-muted)] hover:bg-[var(--color-surface-1)] hover:text-[var(--color-ink)]"
                )}
                aria-pressed={active}
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                  aria-hidden
                />
                {info.label}
                {active && (
                  <X size={11} className="ml-auto text-[var(--color-ink-faint)]" aria-hidden />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
