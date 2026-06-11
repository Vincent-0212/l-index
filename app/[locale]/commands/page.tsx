import type { Metadata } from "next";
import { getCardsByType } from "@/lib/content";
import { CommandsClient } from "./CommandsClient";
import type { CommandCard } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Commandes" };
}

export default async function CommandsPage({ params }: Props) {
  const { locale } = await params;
  const commands = getCardsByType("command") as CommandCard[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1
          className="text-2xl sm:text-3xl font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
          }}
        >
          Commandes
        </h1>
        <p
          className="mt-1.5 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Des raccourcis pour les actions répétitives — moins de friction, plus
          de flow.
        </p>
      </div>
      <CommandsClient commands={commands} locale={locale} />
    </div>
  );
}
