"use client";

import { CardBase } from "./CardBase";
import type { PluginCard } from "@/lib/types";

interface CardHoloProps {
  card: PluginCard;
  locale: string;
}

export function CardHolo({ card, locale }: CardHoloProps) {
  return (
    <div
      className="relative w-full max-w-xs mx-auto"
      style={{ animation: "cardFloat 4s ease-in-out infinite" }}
    >
      <style>{`
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="cardFloat"] { animation: none !important; }
        }
      `}</style>
      <CardBase card={card} locale={locale} standalone />
    </div>
  );
}
