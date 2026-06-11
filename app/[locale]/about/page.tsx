import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CLASS_MAP, getClassIcon } from "@/lib/classes";
import type { ClassName } from "@/lib/classes";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "À propos" };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tc = await getTranslations("classes");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-16">
      {/* Intro */}
      <section className="space-y-4">
        <h1
          className="text-2xl sm:text-3xl font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
          }}
        >
          {t("title")}
        </h1>
        <p
          className="text-base leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          {t("intro")}
        </p>
      </section>

      {/* Pourquoi */}
      <section
        className="space-y-3 border-t pt-10"
        style={{ borderColor: "var(--color-border)" }}
      >
        <h2
          className="text-lg font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
          }}
        >
          {t("whyTitle")}
        </h2>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          {t("whyBody")}
        </p>
      </section>

      {/* Classes */}
      <section
        className="space-y-5 border-t pt-10"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div>
          <h2
            className="text-lg font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text)",
            }}
          >
            {tc("title")}
          </h2>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            {tc("subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(
            Object.entries(CLASS_MAP) as [
              ClassName,
              { label: string; color: string; icon: string }
            ][]
          ).map(([key, info]) => {
            const color = info.color;
            const Icon = getClassIcon(key);
            return (
              <div
                key={key}
                className="flex items-start gap-3 border border-[var(--color-border)] px-3.5 py-3"
                style={{
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md mt-0.5"
                  style={{ backgroundColor: `${color}15` }}
                  aria-hidden
                >
                  <Icon size={14} style={{ color }} strokeWidth={1.5} />
                </div>
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text)" }}
                  >
                    {info.label}
                  </p>
                  <p
                    className="text-xs leading-relaxed mt-0.5"
                    style={{ color: "var(--color-text-faint)" }}
                  >
                    {tc(key as Parameters<typeof tc>[0])}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stack */}
      <section
        className="space-y-3 border-t pt-10"
        style={{ borderColor: "var(--color-border)" }}
      >
        <h2
          className="text-lg font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
          }}
        >
          {t("stackTitle")}
        </h2>
        <p
          className="text-sm leading-relaxed"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-text-muted)",
          }}
        >
          {t("stackBody")}
        </p>
      </section>
    </div>
  );
}
