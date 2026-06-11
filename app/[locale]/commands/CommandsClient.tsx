"use client";

import { useState, useMemo } from "react";
import { filterCards } from "@/lib/content";
import { FilterRail } from "@/components/catalog/FilterRail";
import { CommandCard } from "@/components/card/CommandCard";
import type { CommandCard as CommandCardType } from "@/lib/types";
import type { ClassName } from "@/lib/classes";

interface CommandsClientProps {
  commands: CommandCardType[];
  locale: string;
}

export function CommandsClient({ commands, locale }: CommandsClientProps) {
  const [filters, setFilters] = useState<{ search: string; class?: string }>({
    search: "",
  });

  const filtered = useMemo(
    () => filterCards(commands, filters) as CommandCardType[],
    [commands, filters]
  );

  const availableClasses = useMemo(
    () => [...new Set(commands.map((c) => c.class))] as ClassName[],
    [commands]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
      {/* FilterRail */}
      <aside>
        <FilterRail
          filters={filters}
          onFiltersChange={setFilters}
          totalCount={commands.length}
          filteredCount={filtered.length}
          availableClasses={availableClasses}
        />
      </aside>

      {/* Grille — 1 colonne (ligne dense) ou 2 colonnes desktop */}
      <div>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              Aucune commande trouvée
            </p>
            <p className="text-xs" style={{ color: "var(--color-text-faint)" }}>
              Essaie d&apos;ajuster tes filtres ou ta recherche.
            </p>
            <button
              onClick={() => setFilters({ search: "" })}
              className="mt-1 text-xs transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              style={{ color: "var(--color-accent)" }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((command) => (
              <CommandCard
                key={command.slug}
                command={command}
                locale={locale}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
