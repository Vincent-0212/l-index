"use client";

import { useState, useMemo } from "react";
import { FilterRail } from "@/components/catalog/FilterRail";
import { CardMini } from "@/components/card/CardMini";
import { filterCards, type FilterOptions } from "@/lib/content";
import type { PluginCard } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CollectionClientProps {
  cards: PluginCard[];
  locale: string;
}

export function CollectionClient({ cards, locale }: CollectionClientProps) {
  const [filters, setFilters] = useState<FilterOptions>({});

  const filtered = useMemo(() => filterCards(cards, filters), [cards, filters]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filter rail */}
      <div className="w-full lg:w-52 shrink-0">
        <FilterRail
          filters={filters}
          onChange={setFilters}
          totalCount={cards.length}
          filteredCount={filtered.length}
        />
      </div>

      {/* Grid */}
      <div className="flex-1 min-w-0">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <p className="text-[var(--color-ink-muted)]">Aucun plugin trouvé</p>
            <p className="text-sm text-[var(--color-ink-faint)]">Essaie d&apos;ajuster tes filtres.</p>
            <button
              onClick={() => setFilters({})}
              className="mt-2 text-xs text-[var(--color-accent)] underline-offset-2 hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className={cn(
            "grid gap-4",
            "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
          )}>
            {filtered.map((card) => (
              <CardMini
                key={card.slug + card.type}
                card={card}
                locale={locale}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
