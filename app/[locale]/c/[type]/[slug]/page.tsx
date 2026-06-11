import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCardBySlug,
  getAdjacentCards,
  getVisibleCards,
} from "@/lib/content";
import { CLASS_MAP, getClassIcon } from "@/lib/classes";
import { AgentCard } from "@/components/card/AgentCard";
import { SkillCard } from "@/components/card/SkillCard";
import { CommandCard } from "@/components/card/CommandCard";
import { Terminal } from "@/components/ui/Terminal";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  AgentCard as AgentCardType,
  SkillCard as SkillCardType,
  CommandCard as CommandCardType,
} from "@/lib/types";

type Props = {
  params: Promise<{ locale: string; type: string; slug: string }>;
};

export async function generateStaticParams() {
  // getVisibleCards() exclut les teams
  const cards = getVisibleCards();
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

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3
        className="text-[11px] font-semibold uppercase tracking-widest"
        style={{ color: "var(--color-text-faint)" }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

export default async function DetailPage({ params }: Props) {
  const { locale, type, slug } = await params;

  if (type === "team") notFound();

  const card = getCardBySlug(type, slug);
  if (!card) notFound();
  if (card.type === "team") notFound();

  const { prev, next } = getAdjacentCards(card);

  const classInfo = CLASS_MAP[card.class];
  const classColor = classInfo?.color ?? "var(--color-text-faint)";
  const ClassIcon = getClassIcon(card.class);

  const isAgent = card.type === "agent";
  const isSkill = card.type === "skill";
  const isCommand = card.type === "command";

  const agentCard = isAgent ? (card as AgentCardType) : null;
  const skillCard = isSkill ? (card as SkillCardType) : null;
  const commandCard = isCommand ? (card as CommandCardType) : null;

  const typeLabel = isAgent ? "Agent" : isSkill ? "Skill" : "Commande";
  const backHref = isAgent
    ? `/${locale}/agents`
    : isSkill
    ? `/${locale}/skills`
    : `/${locale}/commands`;
  const backLabel = isAgent
    ? "← Retour aux agents"
    : isSkill
    ? "← Retour aux skills"
    : "← Retour aux commandes";

  // Champs d'action selon le type (CommandCard n'a pas install ni download)
  const installCommand = agentCard?.install ?? skillCard?.install ?? null;
  const downloadUrl = agentCard?.download ?? skillCard?.download ?? null;
  const githubUrl =
    agentCard?.github ?? skillCard?.github ?? commandCard?.github ?? null;

  const hasActionPanel = !!(installCommand || downloadUrl || githubUrl);

  // Tags — uniquement sur agent et skill (CommandCard n'a pas tags dans le type)
  const tags =
    agentCard?.tags ?? skillCard?.tags ?? commandCard?.tags ?? null;
  const hasTags = tags && tags.length > 0;

  const agentSectionTitle = agentCard
    ? `Ce que fait ${agentCard.name}`
    : "Ce que ça fait";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Retour */}
      <nav className="mb-8" aria-label="Navigation">
        <Link
          href={backHref}
          className="text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          style={{ color: "var(--color-text-muted)" }}
        >
          {backLabel}
        </Link>
      </nav>

      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
        {/* Gauche : card en mode présentoir (non cliquable) */}
        <div className="lg:sticky lg:top-[72px] lg:self-start">
          {isAgent && agentCard && (
            <div className="pointer-events-none select-none" aria-hidden>
              <AgentCard agent={agentCard} locale={locale} />
            </div>
          )}
          {isSkill && skillCard && (
            <div className="pointer-events-none select-none" aria-hidden>
              <SkillCard skill={skillCard} locale={locale} />
            </div>
          )}
          {isCommand && commandCard && (
            <div className="pointer-events-none select-none" aria-hidden>
              <CommandCard command={commandCard} locale={locale} />
            </div>
          )}
        </div>

        {/* Droite : contenu */}
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                style={{
                  backgroundColor: `color-mix(in srgb, ${classColor} 12%, var(--color-surface-2))`,
                  color: classColor,
                }}
              >
                <ClassIcon size={12} strokeWidth={1.75} aria-hidden />
                {classInfo?.label ?? card.class}
              </span>
              <span
                className="text-xs"
                style={{ color: "var(--color-text-faint)" }}
              >
                {typeLabel}
              </span>
            </div>

            <h1
              className="text-2xl sm:text-3xl font-semibold leading-tight"
              style={{
                color: "var(--color-text)",
                fontFamily: isCommand
                  ? "var(--font-mono)"
                  : "var(--font-display)",
              }}
            >
              {card.name}
            </h1>

            {isAgent && agentCard && (
              <p
                className="text-base"
                style={{ color: "var(--color-text-muted)" }}
              >
                {agentCard.role}
              </p>
            )}

            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {card.summary}
            </p>

            {hasTags && (
              <div className="flex flex-wrap gap-2 mt-1">
                {tags!.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs border border-[var(--color-border)]"
                    style={{
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: "var(--color-surface-2)",
                      color: "var(--color-text-faint)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sections selon le type */}
          <div
            className="flex flex-col gap-6 border-t pt-6"
            style={{ borderColor: "var(--color-border)" }}
          >
            {isAgent && agentCard && (
              <>
                <SectionBlock title={agentSectionTitle}>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {agentCard.whatItDoes}
                  </p>
                </SectionBlock>
                <SectionBlock title="Quand l'utiliser">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {agentCard.whenToUse}
                  </p>
                </SectionBlock>
                {agentCard.example && (
                  <SectionBlock title="Exemple d'usage">
                    <div
                      className="border border-[var(--color-border)] p-4"
                      style={{
                        borderRadius: "var(--radius-sm)",
                        backgroundColor: "var(--color-surface-2)",
                      }}
                    >
                      <p
                        className="text-[13px] leading-relaxed italic"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        &ldquo;{agentCard.example}&rdquo;
                      </p>
                    </div>
                  </SectionBlock>
                )}
              </>
            )}

            {isSkill && skillCard && (
              <>
                <SectionBlock title="Se déclenche sur">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {skillCard.triggers}
                  </p>
                </SectionBlock>
                <SectionBlock title="Effet">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {skillCard.effect}
                  </p>
                </SectionBlock>
              </>
            )}

            {isCommand && commandCard && (
              <>
                <SectionBlock title="Usage">
                  <div
                    className="border border-[var(--color-border)] px-4 py-3"
                    style={{
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: "var(--color-surface-2)",
                    }}
                  >
                    <code
                      className="text-[13px]"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-accent)",
                      }}
                    >
                      {commandCard.usage}
                    </code>
                  </div>
                </SectionBlock>
                <SectionBlock title="Effet">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {commandCard.effect}
                  </p>
                </SectionBlock>
              </>
            )}
          </div>

          {/* Panneau d'action */}
          {hasActionPanel && (
            <div
              className="border-t pt-6 space-y-4"
              style={{ borderColor: "var(--color-border)" }}
            >
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-text)" }}
              >
                Récupérer ce plugin
              </p>

              {installCommand && (
                <Terminal command={installCommand} label="install" />
              )}

              {(downloadUrl || githubUrl) && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {downloadUrl && (
                    <a
                      href={downloadUrl}
                      download
                      className={cn(
                        "inline-flex items-center gap-2 text-sm font-medium transition-all duration-150",
                        "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-accent-fg)]",
                        "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
                      )}
                      style={{
                        borderRadius: "var(--radius-sm)",
                        padding: "8px 16px",
                      }}
                    >
                      <Download size={14} strokeWidth={1.75} aria-hidden />
                      Télécharger
                    </a>
                  )}
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 text-sm transition-colors duration-150",
                        "border border-[var(--color-border)] hover:border-[var(--color-border-strong)]",
                        "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                        "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
                      )}
                      style={{
                        borderRadius: "var(--radius-sm)",
                        padding: "8px 16px",
                      }}
                    >
                      <ExternalLink size={14} strokeWidth={1.75} aria-hidden />
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Prev / Next — même type uniquement */}
      {(prev || next) && (
        <div
          className="mt-12 pt-8 border-t flex items-center justify-between gap-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          {prev ? (
            <Link
              href={`/${locale}/c/${prev.type}/${prev.slug}`}
              className="flex items-center gap-2 text-sm transition-colors duration-150 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              <ChevronLeft size={16} strokeWidth={1.75} aria-hidden />
              <span>{prev.name}</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/${locale}/c/${next.type}/${next.slug}`}
              className="flex items-center gap-2 text-sm transition-colors duration-150 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              <span>{next.name}</span>
              <ChevronRight size={16} strokeWidth={1.75} aria-hidden />
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
}
