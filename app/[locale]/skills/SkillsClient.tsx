"use client";

import { useState, useMemo } from "react";
import { filterCards } from "@/lib/content";
import { FilterRail } from "@/components/catalog/FilterRail";
import { SkillCard } from "@/components/card/SkillCard";
import type { SkillCard as SkillCardType } from "@/lib/types";
import type { ClassName } from "@/lib/classes";

interface SkillsClientProps {
  skills: SkillCardType[];
  locale: string;
}

export function SkillsClient({ skills, locale }: SkillsClientProps) {
  const [filters, setFilters] = useState<{ search: string; class?: string }>({
    search: "",
  });

  const filtered = useMemo(
    () => filterCards(skills, filters) as SkillCardType[],
    [skills, filters]
  );

  const availableClasses = useMemo(
    () => [...new Set(skills.map((s) => s.class))] as ClassName[],
    [skills]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
      {/* FilterRail */}
      <aside>
        <FilterRail
          filters={filters}
          onFiltersChange={setFilters}
          totalCount={skills.length}
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
              Aucun skill trouvé
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((skill) => (
              <SkillCard key={skill.slug} skill={skill} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
