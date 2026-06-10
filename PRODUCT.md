# PRODUCT — L'Index

> Document produit à destination des agents d'implémentation.
> Ne pas confondre avec DIRECTION.md (contrat visuel) ni DESIGN.md (système design).

---

## Problème

Les plugins Claude (agents, skills, commandes) sont puissants mais invisibles : mal documentés,
dispersés, difficiles à découvrir et à installer. Personne ne sait ce qui existe ni quand
l'utiliser.

## Cible

Développeurs francophones (et EN) utilisant Claude au quotidien. Niveau débutant à intermédiaire.
Curiosité pour l'outillage IA. Référence de ton : Micode (accessible, enthousiaste, sans jargon
inutile).

## Solution

Un site-catalogue personnel où chaque plugin est une **carte** : nom, classe (couleur = discipline),
rareté (= profondeur), stats, description complète, et un bloc d'action direct (copier / télécharger
/ GitHub). L'expérience ressemble à la découverte d'un deck de cartes à jouer — on veut toutes les
voir, et on repart avec celles qui correspondent à son workflow.

---

## Features P0 (must-have au lancement)

### F1 — Catalogue filtrable
- Grille de toutes les cartes (agents + skills + commandes + teams).
- Filtres : **type** (agent / skill / commande / team) · **classe** (discipline couleur) · **rareté**.
- Recherche plein-texte sur nom + description.
- État vide géré (message + suggestion).

### F2 — Fiche détail
- Carte héros (grande, avec holo si Epic/Legendary).
- Bloc de contenu structuré : résumé · ce que ça fait · quand l'utiliser · exemple d'usage.
- **Bloc « Récupérer ce plugin »** : commande à copier (avec feedback) + bouton téléchargement +
  lien GitHub.
- Navigation : précédent / suivant dans la même classe ou type.

### F3 — Page d'accueil
- Héros : une carte holo + wordmark + tagline + CTA.
- Preview collection (6 cartes).
- Section concept (3 lignes).
- Section classes (la légende couleur).

### F4 — Bilingue FR/EN
- Sélecteur de langue dans le header.
- Routing `/fr/...` et `/en/...` via `next-intl`.
- Tout le texte UI traduit. Contenu des fiches : FR uniquement pour l'instant (fallback EN = FR).

### F5 — Signature holo
- Carte héros (home) : tilt 3D + foil piloté au pointeur.
- Carte sur fiche détail : même traitement.
- Grille : hover léger (scale + border-glow), pas de tilt complet.
- `prefers-reduced-motion` : tilt et foil désactivés.

---

## Features P1 (pas maintenant, architecture prête)

- Recherche avancée avec tags.
- Page « Teams » (deck d'agents pour un workflow).
- RSS / changelog des nouveaux plugins.
- Système d'authentification pour publier depuis un dashboard (→ Supabase quand prêt).
- Commentaires / votes de la communauté.

---

## Contenu initial (inventé, crédible)

10–12 fiches couvrant les 4 types et au moins 6 classes différentes. Voir `content/`.

**Agents (champions)** — avec stats (Rigueur / Vitesse / Autonomie / Périmètre, chacun /10) :
- Lino — UI/UX Designer · Classe Design/UX · Rareté Épique
- Théo — Backend Architect · Classe Backend · Rareté Rare
- Maya — Security Guard · Classe Sécurité · Rareté Épique
- Sami — Frontend Dev · Classe Frontend · Rareté Commun
- Raf — Code Reviewer · Classe Qualité/Review · Rareté Rare
- Doc — Docs & Research · Classe Docs/Recherche · Rareté Commun
- Orion — Chief Architect · Classe Orchestration · Rareté Légendaire

**Skills (capacités)** :
- `art-direction` · Classe Design/UX · Rareté Épique
- `full-output-enforcement` · Classe Qualité/Review · Rareté Commun
- `interface-craft` · Classe Design/UX · Rareté Rare

**Commandes** :
- `/code-review` · Classe Qualité/Review
- `/run` · Classe Debug/Investigation
- `/clear` · Classe Debug/Investigation (Commun)

---

## Architecture contenu (data layer)

```
content/
  agents/
    agents.ts          # index typé de tous les agents
    lino.mdx           # fiche longue (corps MDX)
    theo.mdx
    ...
  skills/
    skills.ts
    art-direction.mdx
    ...
  commands/
    commands.ts        # liste (pas de MDX, contenu court)
  teams/
    teams.ts           # deck d'agents
lib/
  content.ts           # façade : getAllCards(), getCardBySlug(), etc.
  classes.ts           # taxonomie couleur (source de vérité unique)
  i18n.ts              # helpers intl
```

`lib/content.ts` est une **façade** : retourne des données typées peu importe la source. Aujourd'hui
= import TS. Plus tard = fetch Supabase. L'UI ne change pas.

---

## Routes

```
/[locale]/                     # Home
/[locale]/collection           # Catalogue filtrable (tous types)
/[locale]/c/[type]/[slug]      # Fiche détail (agent | skill | command | team)
/[locale]/about                # Le concept / à propos
```

---

## Critères de succès

1. Un visiteur peut trouver un plugin en < 10 secondes (filtre ou search).
2. La commande d'installation se copie en 1 clic avec un feedback visuel.
3. Le site se charge en < 2s sur une connexion normale (LCP < 2,5s).
4. Aucune erreur TypeScript, aucun warning ESLint au build.
5. Score Lighthouse accessibility ≥ 90.
