import type { Metadata } from "next";
import { getCardsByType } from "@/lib/content";
import { SkillsClient } from "./SkillsClient";
import type { SkillCard } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Skills" };
}

export default async function SkillsPage({ params }: Props) {
  const { locale } = await params;
  const skills = getCardsByType("skill") as SkillCard[];

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
          Skills
        </h1>
        <p
          className="mt-1.5 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Des modules activables qui changent le comportement de Claude en
          profondeur.
        </p>
      </div>
      <SkillsClient skills={skills} locale={locale} />
    </div>
  );
}
