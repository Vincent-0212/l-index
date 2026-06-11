"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getAllCards } from "@/lib/content";
import { getClassIcon, CLASS_MAP } from "@/lib/classes";
import { cn } from "@/lib/utils";
import type { PluginCard } from "@/lib/types";
import type { ClassName } from "@/lib/classes";

interface CommandPaletteProps {
  locale: string;
  onClose: () => void;
}

const TYPE_LABELS: Record<string, string> = {
  agent: "Agent",
  skill: "Skill",
  command: "Commande",
};

function searchCards(cards: PluginCard[], query: string): PluginCard[] {
  if (!query.trim()) return cards;
  const q = query.toLowerCase();
  return cards.filter((card) => {
    const base = `${card.name} ${card.summary}`.toLowerCase();
    const tags =
      card.type !== "team" ? (card.tags?.join(" ").toLowerCase() ?? "") : "";
    const role = card.type === "agent" ? (card.role?.toLowerCase() ?? "") : "";
    return (base + " " + tags + " " + role).includes(q);
  });
}

function groupByType(cards: PluginCard[]): Record<string, PluginCard[]> {
  const groups: Record<string, PluginCard[]> = {};
  for (const card of cards) {
    if (!groups[card.type]) groups[card.type] = [];
    groups[card.type].push(card);
  }
  return groups;
}

export function CommandPalette({ locale, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const allCards = getAllCards().filter((c) => c.type !== "team");

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = searchCards(allCards, query);
  const grouped = groupByType(filtered);
  const typeOrder = ["agent", "skill", "command"];

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleSelect = useCallback(
    (card: PluginCard) => {
      router.push(`/${locale}/c/${card.type}/${card.slug}`);
      onClose();
    },
    [router, locale, onClose]
  );

  // Keyboard navigation
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const card = filtered[activeIndex];
        if (card) handleSelect(card);
      } else if (e.key === "Tab") {
        // Trap focus — cycle through results with Tab
        e.preventDefault();
        if (e.shiftKey) {
          setActiveIndex((i) => Math.max(i - 1, 0));
        } else {
          setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [filtered, activeIndex, handleSelect, onClose]);

  // Scroll active item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.querySelector(`[data-idx="${activeIndex}"]`);
    if (item) {
      (item as HTMLElement).scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  // Build flat index counter for grouped rendering
  let flatIndex = 0;

  return (
    <AnimatePresence>
      {/* Overlay — backdrop blur + dark scrim */}
      <motion.div
        key="overlay"
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.08 }}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        aria-hidden={false}
      >
        {/* Panel */}
        <motion.div
          key="panel"
          role="dialog"
          aria-modal="true"
          aria-label="Recherche globale"
          className="w-full max-w-[560px] overflow-hidden border border-[var(--color-border)] flex flex-col"
          style={{
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-2)",
            maxHeight: "min(600px, calc(100dvh - 6rem))",
          }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Search header */}
          <div
            className="flex items-center gap-3 px-4 border-b border-[var(--color-border)]"
            style={{ height: "52px" }}
          >
            <Search
              size={16}
              strokeWidth={1.75}
              className="shrink-0"
              style={{ color: "var(--color-text-faint)" }}
              aria-hidden
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher agents, skills, commandes…"
              className="flex-1 bg-transparent text-[16px] outline-none placeholder:text-[var(--color-text-faint)]"
              style={{ color: "var(--color-text)" }}
              aria-label="Recherche"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          {/* Results list */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto"
            style={{ maxHeight: "360px" }}
          >
            {filtered.length === 0 ? (
              <div
                className="flex h-24 items-center justify-center text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                Aucun résultat
              </div>
            ) : query.trim() ? (
              // Flat list when a search query is active
              <ul role="listbox" aria-label="Résultats">
                {filtered.map((card) => {
                  const idx = flatIndex++;
                  return (
                    <ResultItem
                      key={`${card.type}-${card.slug}`}
                      card={card}
                      index={idx}
                      activeIndex={activeIndex}
                      onSelect={handleSelect}
                      onHover={setActiveIndex}
                    />
                  );
                })}
              </ul>
            ) : (
              // Grouped by type when no search
              <div>
                {typeOrder.map((type) => {
                  const cards = grouped[type];
                  if (!cards || cards.length === 0) return null;
                  return (
                    <div key={type}>
                      <div
                        className="px-4 py-2 text-[11px] font-semibold uppercase tracking-widest"
                        style={{ color: "var(--color-text-faint)" }}
                      >
                        {TYPE_LABELS[type] ?? type}
                      </div>
                      <ul role="listbox">
                        {cards.map((card) => {
                          const idx = flatIndex++;
                          return (
                            <ResultItem
                              key={`${card.type}-${card.slug}`}
                              card={card}
                              index={idx}
                              activeIndex={activeIndex}
                              onSelect={handleSelect}
                              onHover={setActiveIndex}
                            />
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer keyboard hints */}
          <div
            className="flex items-center gap-4 border-t border-[var(--color-border)] px-4 py-2.5"
            style={{ backgroundColor: "var(--color-surface-2)" }}
          >
            <KbdHint keys={["↑", "↓"]} label="naviguer" />
            <KbdHint keys={["↵"]} label="ouvrir" />
            <KbdHint keys={["esc"]} label="fermer" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

interface ResultItemProps {
  card: PluginCard;
  index: number;
  activeIndex: number;
  onSelect: (card: PluginCard) => void;
  onHover: (index: number) => void;
}

function ResultItem({
  card,
  index,
  activeIndex,
  onSelect,
  onHover,
}: ResultItemProps) {
  const isActive = index === activeIndex;
  const Icon = getClassIcon(card.class as ClassName);
  const classInfo = CLASS_MAP[card.class as ClassName];
  const color = classInfo?.color ?? "var(--color-text-faint)";

  return (
    <li
      role="option"
      aria-selected={isActive}
      data-idx={index}
      className={cn(
        "relative flex h-11 cursor-pointer items-center gap-3 px-4 transition-colors duration-100",
        isActive ? "bg-[var(--color-surface-2)]" : "hover:bg-[var(--color-surface-2)]"
      )}
      onClick={() => onSelect(card)}
      onMouseEnter={() => onHover(index)}
    >
      {/* Active accent bar on left */}
      {isActive && (
        <span
          className="absolute left-0 top-0 h-full w-0.5"
          style={{ backgroundColor: "var(--color-accent)" }}
          aria-hidden
        />
      )}

      {/* Class icon */}
      <Icon
        size={16}
        strokeWidth={1.75}
        style={{ color, flexShrink: 0 }}
        aria-hidden
      />

      {/* Card name */}
      <span
        className="flex-1 truncate text-sm font-semibold"
        style={{ color: "var(--color-text)" }}
      >
        {card.name}
      </span>

      {/* Type badge */}
      <span
        className="shrink-0 rounded px-1.5 py-0.5 text-[11px]"
        style={{
          color: "var(--color-text-faint)",
          backgroundColor: "var(--color-surface-3)",
        }}
      >
        {TYPE_LABELS[card.type] ?? card.type}
      </span>
    </li>
  );
}

interface KbdHintProps {
  keys: string[];
  label: string;
}

function KbdHint({ keys, label }: KbdHintProps) {
  return (
    <span
      className="flex items-center gap-1 text-[11px]"
      style={{ color: "var(--color-text-faint)" }}
    >
      {keys.map((k) => (
        <kbd
          key={k}
          className="rounded px-1 py-0.5 font-mono text-[10px]"
          style={{
            backgroundColor: "var(--color-surface-3)",
            color: "var(--color-text-muted)",
            border: "1px solid var(--color-border)",
          }}
        >
          {k}
        </kbd>
      ))}
      <span className="ml-0.5">{label}</span>
    </span>
  );
}
