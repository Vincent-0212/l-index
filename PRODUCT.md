# PRODUCT — L'Index

---

## Problème

Les plugins Claude Code (agents, skills, commandes) sont puissants mais dispersés, mal documentés, et difficiles à découvrir et installer.

## Cible

Développeurs utilisant Claude Code au quotidien, débutant à intermédiaire.

## Solution

Un catalogue personnel : chaque plugin = une fiche avec nom, discipline (couleur), description complète, commande d'install, et lien GitHub.

---

## Features P0 (implémentées)

- **3 listes filtrables** : `/agents`, `/skills`, `/commands` — filtre par discipline + recherche plein-texte (nom, tags, description)
- **Fiche détail** : contenu structuré, tags, panneau d'action (Terminal + Télécharger + GitHub), prev/next
- **Landing money-shot** : hero + aperçu des 3 familles + concept + disciplines
- **⌘K palette** : recherche globale instantanée
- **Dark/Light toggle** : anti-flash localStorage
- **Bilingue FR/EN** : `next-intl`, routing `/fr/...` et `/en/...`

## Features P1

- Recherche par tags avancée (filter multi-tags)
- Page Teams (deck d'agents pour un workflow)
- RSS / changelog
- Auth + dashboard de publication (→ Supabase)
- Commentaires / votes communauté

---

## Routes

```
/[locale]/                     → Landing
/[locale]/agents               → Liste agents (filtrée)
/[locale]/skills               → Liste skills (filtrée)
/[locale]/commands             → Liste commandes (filtrée)
/[locale]/c/[type]/[slug]      → Fiche détail
/[locale]/about                → Le projet
```

---

## Architecture

- `content/agents/`, `content/skills/`, `content/commands/`, `content/teams/` → données TS statiques
- `lib/content.ts` → façade (`getAllCards`, `getVisibleCards`, `filterCards`, …) — migration Supabase possible sans toucher l'UI
- `lib/classes.ts` → source de vérité couleurs + icônes Lucide (`CLASS_MAP`, `ICON_MAP`, `getClassIcon`)
- Teams : données conservées, UI masquée

---

## Contenu actuel

7 agents · 3 skills · 3 commandes
