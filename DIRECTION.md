# DIRECTION — L'Index

> Contrat de build. L'implémentation suit ce fichier.

---

## Concept

**L'Index est un catalogue de plugins Claude Code** — agents, skills, commandes — documentés, classés par discipline, et installables. L'expérience ressemble à la découverte d'une équipe de spécialistes qu'on recrute dans son workflow.

> *Figma / Discord pour le registre app · Linear pour la retenue · framework docs pour la densité d'info.*

---

## Audience

Développeurs utilisant Claude Code au quotidien (débutant → intermédiaire). Ton : direct, sans jargon inutile. Tutoiement.

---

## Parcours

1. **Landing** : hero "Tes spécialistes Claude. Prêts à bosser." + Terminal d'install + aperçu des 3 familles.
2. **Listes** : `/agents`, `/skills`, `/commands` — grilles filtrables par discipline.
3. **Détail** : fiche complète avec panneau d'action (Terminal + Télécharger + GitHub), tags discrets, prev/next.

---

## DA — thème `sand`

| Surface | Dark | Light |
|---|---|---|
| Fond app | `#17150F` | `#F4EFE6` |
| Surface | `#1F1C15` | `#FBF8F2` |
| Surface élevée | `#272318` | `#FFFFFF` |
| Bordure | `#3A3629` | `#DDD7CC` |
| Texte | `#ECE7DB` | `#2A2620` |
| Texte muted | `#A8A192` | `#6B6356` |
| **Accent ambre** | `#E3A84A` | `#C2660C` |

---

## 3 types de cards — visuellement distincts

| Type | Différenciation |
|---|---|
| **Agent** | Grande carte portrait, espace image, border-top couleur classe |
| **Skill** | Compact, badge "tag", ligne triggers en mono |
| **Command** | Fond `surface-2`, border-LEFT couleur classe, nom `$ /command` en mono accent |

---

## Composants signature

- **Terminal** : barre macOS (3 cercles déco), prompt `$` ambre, copie avec feedback.
- **CommandPalette ⌘K** : recherche instantanée sur nom + tags, navigation clavier, groupé par type.
- **ThemeToggle** : dark/light via `data-mode` sur `<html>`, anti-flash localStorage.

---

## Système typographique

- **Display + Body** : Satoshi Variable (self-hosted woff2)
- **Mono** : JetBrains Mono + stack système
- Scale modular ×1.25, base 16px

---

## Garde-fous

- Zéro glow néon, zéro animation prismatique, zéro stats RPG, zéro rareté, zéro tilt holographique.
- Un seul accent : l'ambre. Les couleurs de classe = signal de discipline, jamais portées seules.
- Teams : données conservées, masquées de toute l'UI.
- `proxy.ts` = middleware next-intl. Ne jamais recréer `middleware.ts`.
