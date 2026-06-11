"use client";

import { useState, useMemo } from "react";
import { FilterRail } from "@/components/catalog/FilterRail";
import { AgentCard } from "@/components/card/AgentCard";
import { SkillCard } from "@/components/card/SkillCard";
import { CommandCard } from "@/components/card/CommandCard";
import { filterCards } from "@/lib/content";
import type { PluginCard, AgentCard as AgentCardType, SkillCard as SkillCardType, CommandCard as CommandCardType } from "@/lib/types";
import type { ClassName } from "@/lib/classes";
import { cn } from "@/lib/utils";

interface FilterState {
  class?: string;
  search: string;
}

interface CollectionClientProps {
  cards: PluginCard[];
  locale: string;
}

export function CollectionClient({ cards, locale }: CollectionClientProps) {
  const [filters, setFilters] = useState<FilterState>({ search: "" });

  const filtered = useMemo(
    () =>
      filterCards(cards, {
        class: filters.class,
        search: filters.search || undefined,
      }),
    [cards, filters]
  );

  const availableClasses = useMemo(() => {
    const set = new Set(cards.map((c) => c.class as ClassName));
    return Array.from(set);
  }, [cards]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filter rail */}
      <div className="w-full lg:w-52 shrink-0">
        <FilterRail
          filters={filters}
          onFiltersChange={setFilters}
          totalCount={cards.length}
          filteredCount={filtered.length}
          availableClasses={availableClasses}
        />
      </div>

      {/* Cards grid */}
      <div className="flex-1 min-w-0">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <p style={{ color: "var(--color-text-muted)" }}>
              Aucun plugin trouvé
            </p>
            <p
              className="text-sm"
              style={{ color: "var(--color-text-faint)" }}
            >
              Essaie d&apos;ajuster tes filtres.
            </p>
            <button
              onClick={() => setFilters({ search: "" })}
              className="mt-2 text-xs underline-offset-2 hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              style={{ color: "var(--color-accent)" }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div
            className={cn(
              "grid gap-4",
              "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
            )}
          >
            {filtered.map((card) => {
              if (card.type === "agent") {
                return (
                  <AgentCard
                    key={card.slug + card.type}
                    agent={card as AgentCardType}
                    locale={locale}
                  />
                );
              }
              if (card.type === "skill") {
                return (
                  <SkillCard
                    key={card.slug + card.type}
                    skill={card as SkillCardType}
                    locale={locale}
                  />
                );
              }
              if (card.type === "command") {
                return (
                  <CommandCard
                    key={card.slug + card.type}
                    command={card as CommandCardType}
                    locale={locale}
                  />
                );
              }
              // Teams are excluded from the visible collection grid
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
