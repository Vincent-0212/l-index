import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getAllCards } from "@/lib/content";
import { CLASS_MAP } from "@/lib/classes";
import { CardHolo } from "@/components/card/CardHolo";
import { CardMini } from "@/components/card/CardMini";
import { ClassLegend } from "@/components/catalog/ClassLegend";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("hero");
  const tc = await getTranslations("concept");
  const tcl = await getTranslations("classes");
  const tn = await getTranslations("collection");

  const allCards = getAllCards();
  const previewCards = allCards.slice(0, 6);
  const orion = allCards.find((c) => c.slug === "orion") ?? allCards[0];

  const classDescriptions = Object.fromEntries(
    Object.keys(CLASS_MAP).map((k) => [k, tcl(k as keyof typeof CLASS_MAP)])
  );

  return (
    <div className="flex flex-col">
      {/* ── Héros ── */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 text-center gap-10">
        {/* Subtle radial glow */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <div
            className="h-[480px] w-[480px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 70%)" }}
          />
        </div>

        {/* Card flottante */}
        <div className="relative z-10 w-64 sm:w-72">
          <CardHolo card={orion} locale={locale} />
        </div>

        {/* Copy */}
        <div className="relative z-10 max-w-lg space-y-4">
          <h1
            className="text-3xl sm:text-4xl font-semibold leading-tight text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            L&apos;Index
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-ink-muted)] leading-relaxed">
            {t("tagline")}
          </p>
          <Link
            href={`/${locale}/collection`}
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--color-surface-0)] hover:brightness-110 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
          >
            {t("cta")} →
          </Link>
        </div>
      </section>

      {/* ── Preview collection ── */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-baseline justify-between mb-8">
            <h2
              className="text-xl font-semibold text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {tn("title")}
            </h2>
            <Link
              href={`/${locale}/collection`}
              className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              {tn("preview")} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {previewCards.map((card) => (
              <CardMini key={card.slug + card.type} card={card} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Concept ── */}
      <section className="px-4 py-16 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <h2
            className="text-2xl sm:text-3xl font-semibold text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {tc("title")}
          </h2>
          <p className="text-base text-[var(--color-ink-muted)] leading-relaxed">
            {tc("body")}
          </p>
        </div>
      </section>

      {/* ── Classes ── */}
      <section className="px-4 py-16 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 space-y-1.5">
            <h2
              className="text-xl font-semibold text-[var(--color-ink)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {tcl("title")}
            </h2>
            <p className="text-sm text-[var(--color-ink-muted)]">
              {tcl("subtitle")}
            </p>
          </div>
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden bg-[var(--color-surface-1)]">
            <ClassLegend descriptions={classDescriptions} />
          </div>
        </div>
      </section>
    </div>
  );
}
