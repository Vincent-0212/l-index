import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getCardBySlug, getAdjacentCards, getAllCards } from "@/lib/content";
import { CLASS_MAP } from "@/lib/classes";
import { CardBase } from "@/components/card/CardBase";
import { CopyBlock } from "@/components/ui/CopyBlock";
import {
  Layers, Server, Shield, Bug, Palette, Brain,
  GitBranch, Compass, CheckCircle, BookOpen, Network,
  ExternalLink, Download, ChevronLeft, ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AgentCard, SkillCard, CommandCard, TeamCard } from "@/lib/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Layers, Server, Shield, Bug, Palette, Brain,
  GitBranch, Compass, CheckCircle, BookOpen, Network,
};

type Props = { params: Promise<{ locale: string; type: string; slug: string }> };

export async function generateStaticParams() {
  const cards = getAllCards();
  const locales = ["fr", "en"];
  return locales.flatMap((locale) =>
    cards.map((c) => ({ locale, type: c.type, slug: c.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, slug } = await params;
  const card = getCardBySlug(type, slug);
  if (!card) return {};
  return { title: card.name, description: card.summary };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ink-faint)]">
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

export default async function DetailPage({ params }: Props) {
  const { locale, type, slug } = await params;
  const card = getCardBySlug(type, slug);
  if (!card) notFound();

  const { prev, next } = getAdjacentCards(card);
  const t = await getTranslations("card");
  const tb = await getTranslations("breadcrumb");

  const classInfo = CLASS_MAP[card.class];
  const classColor = classInfo.color;
  const ClassIcon = ICON_MAP[classInfo.icon] ?? Network;

  const isAgent = card.type === "agent";
  const isSkill = card.type === "skill";
  const isCommand = card.type === "command";
  const isTeam = card.type === "team";

  const agentCard = isAgent ? (card as AgentCard) : null;
  const skillCard = isSkill ? (card as SkillCard) : null;
  const commandCard = isCommand ? (card as CommandCard) : null;
  const teamCard = isTeam ? (card as TeamCard) : null;

  const hasActions =
    (agentCard && (agentCard.install || agentCard.download || agentCard.github)) ||
    (skillCard && (skillCard.install || skillCard.download || skillCard.github));

  const typeLabel =
    isAgent ? "Agent" : isSkill ? "Skill" : isCommand ? "Commande" : "Team";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-1.5 text-xs text-[var(--color-ink-faint)]" aria-label="Fil d'Ariane">
        <Link href={`/${locale}/collection`} className="hover:text-[var(--color-accent)] transition-colors duration-150">
          {tb("collection")}
        </Link>
        <span>/</span>
        <span className="text-[var(--color-ink-muted)]">{card.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
        {/* Left: card */}
        <div>
          <CardBase card={card} locale={locale} standalone />
        </div>

        {/* Right: content */}
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                style={{ backgroundColor: `${classColor}18`, color: classColor }}
              >
                <ClassIcon size={12} aria-hidden />
                {classInfo.label}
              </span>
              <span className="text-xs text-[var(--color-ink-faint)]">{typeLabel}</span>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-semibold text-[var(--color-ink)]"
              style={{ fontFamily: isCommand ? "var(--font-mono)" : "var(--font-display)" }}
            >
              {card.name}
            </h1>
            {isAgent && agentCard && (
              <p className="text-base text-[var(--color-ink-muted)]">{agentCard.role}</p>
            )}
            <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{card.summary}</p>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-6 border-t border-[var(--color-border)] pt-6">
            {isAgent && agentCard && (
              <>
                <Section title={t("whatItDoes")}>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{agentCard.whatItDoes}</p>
                </Section>
                <Section title={t("whenToUse")}>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{agentCard.whenToUse}</p>
                </Section>
                {agentCard.example && (
                  <Section title={t("example")}>
                    <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-1)] p-3.5">
                      <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed italic">
                        &ldquo;{agentCard.example}&rdquo;
                      </p>
                    </div>
                  </Section>
                )}
              </>
            )}

            {isSkill && skillCard && (
              <>
                <Section title={t("triggers")}>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{skillCard.triggers}</p>
                </Section>
                <Section title={t("effect")}>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{skillCard.effect}</p>
                </Section>
              </>
            )}

            {isCommand && commandCard && (
              <>
                <Section title={t("effect")}>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{commandCard.effect}</p>
                </Section>
                <Section title={t("usage")}>
                  <CopyBlock code={commandCard.usage} label="Commande" />
                </Section>
              </>
            )}

            {isTeam && teamCard && (
              <>
                <Section title={t("whatItDoes")}>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{teamCard.theme}</p>
                </Section>
                <Section title={t("whenToUse")}>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{teamCard.whenToUse}</p>
                </Section>
                <Section title={t("members")}>
                  <div className="flex flex-wrap gap-2">
                    {teamCard.memberSlugs.map((memberSlug) => {
                      const member = getCardBySlug("agent", memberSlug);
                      if (!member || member.type !== "agent") return null;
                      const mInfo = CLASS_MAP[member.class];
                      const mColor = mInfo.color;
                      return (
                        <Link
                          key={memberSlug}
                          href={`/${locale}/c/agent/${memberSlug}`}
                          className={cn(
                            "flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border)]",
                            "bg-[var(--color-surface-1)] px-3 py-1.5 text-xs",
                            "hover:border-[var(--color-ink-faint)] transition-colors duration-150",
                            "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                          )}
                        >
                          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: mColor }} aria-hidden />
                          <span className="font-medium text-[var(--color-ink)]">{member.name}</span>
                          <span className="text-[var(--color-ink-faint)]">{member.role}</span>
                        </Link>
                      );
                    })}
                  </div>
                </Section>
              </>
            )}
          </div>

          {/* Actions */}
          {hasActions && (
            <div className="border-t border-[var(--color-border)] pt-6 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-ink-faint)]">
                Récupérer ce plugin
              </p>
              {agentCard?.install && <CopyBlock code={agentCard.install} label="Installation" />}
              {skillCard?.install && <CopyBlock code={skillCard.install} label="Installation" />}
              <div className="flex flex-wrap gap-2">
                {agentCard?.download && (
                  <a
                    href={agentCard.download}
                    download
                    className={cn(
                      "inline-flex items-center gap-2 rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium",
                      "border border-[var(--color-border)] text-[var(--color-ink-muted)]",
                      "hover:text-[var(--color-ink)] hover:border-[var(--color-ink-faint)] transition-all duration-150",
                      "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
                    )}
                  >
                    <Download size={14} aria-hidden />
                    {t("download")}
                  </a>
                )}
                {agentCard?.github && (
                  <a
                    href={agentCard.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium",
                      "border border-[var(--color-border)] text-[var(--color-ink-muted)]",
                      "hover:text-[var(--color-ink)] hover:border-[var(--color-ink-faint)] transition-all duration-150",
                      "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
                    )}
                  >
                    <ExternalLink size={14} aria-hidden />
                    GitHub
                  </a>
                )}
                {skillCard?.download && (
                  <a
                    href={skillCard.download}
                    download
                    className={cn(
                      "inline-flex items-center gap-2 rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium",
                      "border border-[var(--color-border)] text-[var(--color-ink-muted)]",
                      "hover:text-[var(--color-ink)] hover:border-[var(--color-ink-faint)] transition-all duration-150",
                      "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
                    )}
                  >
                    <Download size={14} aria-hidden />
                    {t("download")}
                  </a>
                )}
                {skillCard?.github && (
                  <a
                    href={skillCard.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium",
                      "border border-[var(--color-border)] text-[var(--color-ink-muted)]",
                      "hover:text-[var(--color-ink)] hover:border-[var(--color-ink-faint)] transition-all duration-150",
                      "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
                    )}
                  >
                    <ExternalLink size={14} aria-hidden />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Prev / Next */}
      {(prev || next) && (
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex items-center justify-between gap-4">
          {prev ? (
            <Link
              href={`/${locale}/c/${prev.type}/${prev.slug}`}
              className="flex items-center gap-2 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              <ChevronLeft size={16} aria-hidden />
              <span>{prev.name}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/${locale}/c/${next.type}/${next.slug}`}
              className="flex items-center gap-2 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-accent)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              <span>{next.name}</span>
              <ChevronRight size={16} aria-hidden />
            </Link>
          ) : <div />}
        </div>
      )}
    </div>
  );
}
