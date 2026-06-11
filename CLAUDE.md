# L'Index — contexte projet

## Ce que c'est
Site personnel qui publie les plugins Claude de Vincent (agents, skills, commandes, teams).
Chaque plugin est une fiche : identité visuelle, spécialité, lore léger, bloc d'action (copier / télécharger / GitHub).
Les agents sont personnifiés (nom humain + rôle, ex. « Lino — UI/UX Designer »).
Une taxonomie couleur par discipline structure tout (frontend = or, backend = bleu, etc.).

## Stack
- Next.js 16 App Router + TypeScript strict
- Tailwind v4 (`@theme` CSS custom properties dans `globals.css`)
- Motion (`motion/react`) pour les animations
- next-intl v4 — bilingue FR/EN, routing `/fr/...` et `/en/...`
- Fonts self-hosted : Clash Display Variable + Satoshi Variable (woff2 dans `public/fonts/`)
- Lucide React pour les icônes de classe
- `clsx` + `tailwind-merge` via `cn()` dans `lib/utils.ts`

## Structure clé
```
app/[locale]/          — pages (home, collection, detail /c/[type]/[slug], about)
components/card/       — CardBase, CardHolo, CardMini, StatBar
components/catalog/    — FilterRail, ClassLegend
components/layout/     — Header, Footer, LangSwitcher
components/ui/         — Button, CopyBlock, RarityBadge, Tag
content/               — agents.ts, skills.ts, commands.ts, teams.ts (données en dur)
lib/                   — types.ts, classes.ts, content.ts (façade), utils.ts
i18n/                  — routing.ts, request.ts, dictionaries/fr.ts + en.ts
proxy.ts               — middleware next-intl (NE PAS recréer middleware.ts)
```

## Modèle de données
Type discriminé `PluginCard = AgentCard | SkillCard | CommandCard | TeamCard` dans `lib/types.ts`.
`lib/classes.ts` = source de vérité pour les couleurs de discipline (CLASS_MAP).
`lib/content.ts` = façade (données TS aujourd'hui, Supabase plus tard sans toucher l'UI).

## Thème dark
Tokens dans `app/globals.css` :
- surfaces : `#0e0e11` / `#141418` / `#1c1c22`
- encre : `#ececee` / `#888894`
- accent : `#f5a623` (orange-or)

## Attention — pièges déjà rencontrés
- `middleware.ts` et `proxy.ts` ne doivent pas coexister — Next.js 16 utilise `proxy.ts` uniquement.
- `lucide-react` v1.17.0 : l'icône `Github` n'existe pas, utiliser `ExternalLink`.
- `en.ts` ne doit PAS porter l'annotation `const en: Messages` (conflit de types littéraux avec `fr.ts`).
- Les fonts sont chargées via `@font-face` dans globals.css, pas via `next/font/local`.

## État actuel
Site fonctionnel techniquement (build propre, 40 pages statiques) mais l'UI ne satisfait pas.
La prochaine session = **refonte visuelle complète**. Le contenu et la structure de données restent.
Repo GitHub : https://github.com/Vincent-0212/l-index (branche `main`)

@AGENTS.md
