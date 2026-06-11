import { agents } from "@/content/agents/agents";
import { skills } from "@/content/skills/skills";
import { commands } from "@/content/commands/commands";
import { teams } from "@/content/teams/teams";
import type { PluginCard } from "./types";

export function getAllCards(): PluginCard[] {
  return [...agents, ...skills, ...commands, ...teams];
}

export function getVisibleCards(): PluginCard[] {
  return getAllCards().filter((c) => c.type !== "team");
}

export function getCardsByType(type: PluginCard["type"]): PluginCard[] {
  return getAllCards().filter((card) => card.type === type);
}

export function getCardBySlug(
  type: string,
  slug: string
): PluginCard | undefined {
  return getAllCards().find((card) => card.type === type && card.slug === slug);
}

export type FilterOptions = {
  type?: PluginCard["type"];
  class?: string;
  search?: string;
};

export function filterCards(
  cards: PluginCard[],
  filters: FilterOptions
): PluginCard[] {
  let filtered = [...cards];

  if (filters.type) {
    filtered = filtered.filter((card) => card.type === filters.type);
  }

  if (filters.class) {
    filtered = filtered.filter((card) => card.class === filters.class);
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter((card) => {
      const base = `${card.name} ${card.summary}`.toLowerCase();
      const role =
        card.type === "agent" ? (card.role?.toLowerCase() ?? "") : "";
      const tags =
        card.type !== "team" ? (card.tags?.join(" ").toLowerCase() ?? "") : "";
      const extra =
        card.type === "agent"
          ? `${card.whatItDoes} ${card.whenToUse} ${card.example}`.toLowerCase()
          : card.type === "skill"
          ? `${card.triggers} ${card.effect}`.toLowerCase()
          : card.type === "command"
          ? `${card.usage} ${card.effect}`.toLowerCase()
          : "";
      return (base + " " + role + " " + tags + " " + extra).includes(q);
    });
  }

  return filtered;
}

export function getAdjacentCards(
  card: PluginCard
): { prev: PluginCard | undefined; next: PluginCard | undefined } {
  const sameType = getCardsByType(card.type);
  const idx = sameType.findIndex((c) => c.slug === card.slug);
  return {
    prev: idx > 0 ? sameType[idx - 1] : undefined,
    next: idx < sameType.length - 1 ? sameType[idx + 1] : undefined,
  };
}

export const GLOBAL_INSTALL = `# Installer l'environnement complet
npx claude-index install --all

# Ou individuellement
npx claude-index install lino theo maya sami`;
