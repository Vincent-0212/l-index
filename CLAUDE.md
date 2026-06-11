# L'Index — contexte projet

## Ce que c'est

Site catalogue de plugins Claude Code (agents, skills, commandes) de Vincent.
Chaque plugin = une fiche : discipline colorée, description complète, commande d'install, lien GitHub.
Les agents sont personnifiés (nom humain + rôle, ex. « Lino — UI/UX Designer »).

## Vision

Présenter L'Index comme un environnement complet de spécialistes Claude à enrôler dans son workflow.
La landing vend l'ensemble. Les 3 listes (`/agents`, `/skills`, `/commands`) permettent de découvrir et filtrer.
Les fiches permettent de copier ou télécharger en 1 clic.

## Stack

- Next.js 16 App Router + TypeScript strict
- Tailwind v4 (`@theme` dans `globals.css`) — tokens sémantiques `--color-*`
- Motion (`motion/react`) pour les animations
- next-intl v4 — bilingue FR/EN, routing `/fr/...` et `/en/...`
- Fonts self-hosted : Satoshi Variable (woff2 dans `public/fonts/`)
- Lucide React v1.17.0 — PAS d'icône `Github`, utiliser `ExternalLink`
- `clsx` + `tailwind-merge` via `cn()` dans `lib/utils.ts`

## Structure clé

```
app/[locale]/          — pages (home, agents, skills, commands, c/[type]/[slug], about)
components/card/       — AgentCard, SkillCard, CommandCard (3 designs distincts)
components/catalog/    — FilterRail, ClassLegend
components/landing/    — HeroMotion (animations landing)
components/layout/     — Header, Footer, LangSwitcher, ThemeProvider, ThemeToggle
components/search/     — CommandPalette (⌘K global)
components/ui/         — Terminal (copie avec feedback macOS-style)
content/               — agents.ts, skills.ts, commands.ts, teams.ts (données en dur)
lib/                   — types.ts, classes.ts, content.ts (façade), utils.ts
i18n/                  — routing.ts, request.ts, dictionaries/fr.ts + en.ts
proxy.ts               — middleware next-intl (NE PAS recréer middleware.ts)
```

## Modèle de données

Type discriminé `PluginCard = AgentCard | SkillCard | CommandCard | TeamCard` dans `lib/types.ts`.
`lib/classes.ts` = source de vérité pour les couleurs de discipline (CLASS_MAP) et les icônes Lucide (ICON_MAP, getClassIcon).
`lib/content.ts` = façade (données TS aujourd'hui, Supabase plus tard sans toucher l'UI).
Chaque card peut avoir `tags?: string[]` (affiché sur les fiches détail, indexé par la recherche).

## Thème

Tokens sémantiques `--color-bg/surface/text/accent` dans `globals.css`.
Dark (défaut) : neutres bruns-noirs chauds, accent ambre `#E3A84A`.
Light (`data-mode="light"` sur `<html>`) : papier sable, accent `#C2660C`.
Toggle dans le Header, anti-flash via script inline avant hydration.

## Teams

Données conservées dans `content/teams/teams.ts`. **Entièrement masquées de l'UI** (nav, listes, palette, `generateStaticParams`).

## Attention — pièges connus

- `middleware.ts` et `proxy.ts` ne doivent pas coexister — Next.js 16 utilise `proxy.ts` uniquement.
- `lucide-react` v1.17.0 : l'icône `Github` n'existe pas, utiliser `ExternalLink`.
- `en.ts` ne doit PAS porter l'annotation `const en: Messages` (conflit de types littéraux avec `fr.ts`).
- Les fonts sont chargées via `@font-face` dans `globals.css`, pas via `next/font/local`.
- Dans le `@theme` Tailwind v4 : valeurs statiques (dark par défaut). Le light override est dans `:root[data-mode="light"]` en CSS normal.
- Les tokens dynamiques dans les composants : `bg-[var(--color-surface)]`, pas `bg-surface`.

@RTK.md
