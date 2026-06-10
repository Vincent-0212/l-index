import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CollectionClient } from "./CollectionClient";
import { getAllCards } from "@/lib/content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Collection" };
}

export default async function CollectionPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("collection");
  const allCards = getAllCards();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1
          className="text-2xl sm:text-3xl font-semibold text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("title")}
        </h1>
        <p className="mt-1.5 text-sm text-[var(--color-ink-muted)]">
          {t("subtitle")}
        </p>
      </div>
      <CollectionClient cards={allCards} locale={locale} />
    </div>
  );
}
