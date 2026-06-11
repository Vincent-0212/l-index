"use client";

import { useState, useMemo } from "react";
import { filterCards } from "@/lib/content";
import { FilterRail } from "@/components/catalog/FilterRail";
import { AgentCard } from "@/components/card/AgentCard";
import type { AgentCard as AgentCardType } from "@/lib/types";
import type { ClassName } from "@/lib/classes";

interface AgentsClientProps {
  agents: AgentCardType[];
  locale: string;
}

export function AgentsClient({ agents, locale }: AgentsClientProps) {
  const [filters, setFilters] = useState<{ search: string; class?: string }>({
    search: "",
  });

  const filtered = useMemo(
    () => filterCards(agents, filters) as AgentCardType[],
    [agents, filters]
  );

  const availableClasses = useMemo(
    () => [...new Set(agents.map((a) => a.class))] as ClassName[],
    [agents]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
      {/* FilterRail */}
      <aside>
        <FilterRail
          filters={filters}
          onFiltersChange={setFilters}
          totalCount={agents.length}
          filteredCount={filtered.length}
          availableClasses={availableClasses}
        />
      </aside>

      {/* Grille */}
      <div>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              Aucun agent trouvé
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filtered.map((agent) => (
              <AgentCard key={agent.slug} agent={agent} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
