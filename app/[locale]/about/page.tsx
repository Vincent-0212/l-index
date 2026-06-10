import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CLASS_MAP } from "@/lib/classes";
import {
  Layers, Server, Shield, Bug, Palette, Brain,
  GitBranch, Compass, CheckCircle, BookOpen, Network,
  type LucideIcon,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "À propos" };
}

const ICON_MAP: Record<string, LucideIcon> = {
  Layers, Server, Shield, Bug, Palette, Brain,
  GitBranch, Compass, CheckCircle, BookOpen, Network,
};

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tc = await getTranslations("classes");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 space-y-16">
      {/* Intro */}
      <section className="space-y-4">
        <h1
          className="text-2xl sm:text-3xl font-semibold text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("title")}
        </h1>
        <p className="text-base text-[var(--color-ink-muted)] leading-relaxed">
          {t("intro")}
        </p>
      </section>

      {/* Pourquoi */}
      <section className="space-y-3 border-t border-[var(--color-border)] pt-10">
        <h2
          className="text-lg font-semibold text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("whyTitle")}
        </h2>
        <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">
          {t("whyBody")}
        </p>
      </section>

      {/* Classes */}
      <section className="space-y-5 border-t border-[var(--color-border)] pt-10">
        <div>
          <h2
            className="text-lg font-semibold text-[var(--color-ink)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {tc("title")}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
            {tc("subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(Object.entries(CLASS_MAP) as [string, { label: string; color: string; icon: string }][]).map(([key, info]) => {
            const color = info.color === "prismatic" ? "#a78bfa" : info.color;
            const Icon = ICON_MAP[info.icon] ?? Network;
            return (
              <div
                key={key}
                className="flex items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-1)] px-3.5 py-3"
              >
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md mt-0.5"
                  style={{ backgroundColor: `${color}15` }}
                  aria-hidden
                >
                  <Icon size={14} style={{ color }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">{info.label}</p>
                  <p className="text-xs text-[var(--color-ink-faint)] leading-relaxed mt-0.5">
                    {tc(key as Parameters<typeof tc>[0])}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stack */}
      <section className="space-y-3 border-t border-[var(--color-border)] pt-10">
        <h2
          className="text-lg font-semibold text-[var(--color-ink)]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("stackTitle")}
        </h2>
        <p
          className="text-sm text-[var(--color-ink-muted)] leading-relaxed"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {t("stackBody")}
        </p>
      </section>
    </div>
  );
}
