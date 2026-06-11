import type { Metadata } from "next";
import { getCardsByType } from "@/lib/content";
import { AgentsClient } from "./AgentsClient";
import type { AgentCard } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Agents" };
}

export default async function AgentsPage({ params }: Props) {
  const { locale } = await params;
  const agents = getCardsByType("agent") as AgentCard[];

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
          Agents
        </h1>
        <p
          className="mt-1.5 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Des spécialistes Claude avec un rôle clair — tu sais exactement qui
          appeler.
        </p>
      </div>
      <AgentsClient agents={agents} locale={locale} />
    </div>
  );
}
