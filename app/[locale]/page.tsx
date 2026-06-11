import Link from "next/link";
import { getCardsByType, GLOBAL_INSTALL } from "@/lib/content";
import { ClassLegend } from "@/components/catalog/ClassLegend";
import { AgentCard } from "@/components/card/AgentCard";
import { SkillCard } from "@/components/card/SkillCard";
import { CommandCard } from "@/components/card/CommandCard";
import { HeroMotion } from "@/components/landing/HeroMotion";
import type {
  AgentCard as AgentCardType,
  SkillCard as SkillCardType,
  CommandCard as CommandCardType,
} from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

const CLASS_DESCRIPTIONS: Record<string, string> = {
  frontend: "Composants, layout, animations — tout ce qui est visible.",
  backend: "APIs, bases de données, Edge Functions, migrations.",
  security: "Auth, RLS, inputs, secrets — avant que ça devienne un incident.",
  debug: "Investigation, logs, reproductions, corrections.",
  design: "UX, direction artistique, micro-polish, accessibilité.",
  data: "IA, analyse, pipelines de données, embeddings.",
  devops: "CI/CD, containers, infrastructure, déploiement.",
  product: "Stratégie, roadmap, user stories, positionnement.",
  quality: "Revue de code, tests, standards, zéro placeholder.",
  docs: "Documentation à jour, recherche de libs, guides.",
  orchestration: "Coordination multi-agents, vision système globale.",
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  const agents = getCardsByType("agent") as AgentCardType[];
  const skills = getCardsByType("skill") as SkillCardType[];
  const commands = getCardsByType("command") as CommandCardType[];

  const previewAgents = agents.slice(0, 3);
  const previewSkills = skills.slice(0, 2);
  const previewCommands = commands.slice(0, 2);

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[100dvh] px-4"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <HeroMotion locale={locale} installCommand={GLOBAL_INSTALL} />
      </section>

      {/* ── Aperçu des 3 familles ── */}
      <section className="px-4 py-20 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl">
          <p
            className="text-center text-sm mb-12"
            style={{ color: "var(--color-text-muted)" }}
          >
            Une équipe de spécialistes, des outils qui font la différence.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne Agents */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  Agents
                </span>
                <span
                  className="text-[11px] font-medium px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "var(--color-surface-3)",
                    color: "var(--color-text-faint)",
                  }}
                >
                  {agents.length}
                </span>
              </div>
              {previewAgents.map((agent) => (
                <AgentCard key={agent.slug} agent={agent} locale={locale} />
              ))}
              <Link
                href={`/${locale}/agents`}
                className="mt-1 text-[13px] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                style={{ color: "var(--color-accent)" }}
              >
                Voir les {agents.length} agents →
              </Link>
            </div>

            {/* Colonne Skills */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  Skills
                </span>
                <span
                  className="text-[11px] font-medium px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "var(--color-surface-3)",
                    color: "var(--color-text-faint)",
                  }}
                >
                  {skills.length}
                </span>
              </div>
              {previewSkills.map((skill) => (
                <SkillCard key={skill.slug} skill={skill} locale={locale} />
              ))}
              <Link
                href={`/${locale}/skills`}
                className="mt-1 text-[13px] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                style={{ color: "var(--color-accent)" }}
              >
                Voir les {skills.length} skills →
              </Link>
            </div>

            {/* Colonne Commandes */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  Commandes
                </span>
                <span
                  className="text-[11px] font-medium px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "var(--color-surface-3)",
                    color: "var(--color-text-faint)",
                  }}
                >
                  {commands.length}
                </span>
              </div>
              {previewCommands.map((command) => (
                <CommandCard
                  key={command.slug}
                  command={command}
                  locale={locale}
                />
              ))}
              <Link
                href={`/${locale}/commands`}
                className="mt-1 text-[13px] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                style={{ color: "var(--color-accent)" }}
              >
                Voir les {commands.length} commandes →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Concept ── */}
      <section className="px-4 py-20 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            L&apos;Index est un catalogue personnel de plugins Claude Code.
            Chaque plugin est documenté, classé par discipline, et installable
            en une commande. Fini de chercher ce qui existe.
          </p>
        </div>
      </section>

      {/* ── ClassLegend ── */}
      <section className="px-4 py-20 border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 space-y-1">
            <h2
              className="text-base font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              Les disciplines
            </h2>
            <p
              className="text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Chaque couleur est une expertise. Chaque expertise a ses
              spécialistes.
            </p>
          </div>
          <div
            className="overflow-hidden border border-[var(--color-border)]"
            style={{
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <ClassLegend descriptions={CLASS_DESCRIPTIONS} />
          </div>
        </div>
      </section>
    </div>
  );
}
