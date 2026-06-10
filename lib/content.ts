import { agents } from "@/content/agents/agents";
import { skills } from "@/content/skills/skills";
import { commands } from "@/content/commands/commands";
import { teams } from "@/content/teams/teams";
import type { PluginCard } from "./types";

export function getAllCards(): PluginCard[] {
  return [...agents, ...skills, ...commands, ...teams];
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
  return cards.filter((card) => {
    if (filters.type && card.type !== filters.type) return false;
    if (filters.class && card.class !== filters.class) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchName = card.name.toLowerCase().includes(q);
      const matchSummary = card.summary.toLowerCase().includes(q);
      const matchRole =
        card.type === "agent" ? card.role.toLowerCase().includes(q) : false;
      if (!matchName && !matchSummary && !matchRole) return false;
    }
    return true;
  });
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
