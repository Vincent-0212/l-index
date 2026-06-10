# DESIGN — L'Index

> Système design à destination des agents d'implémentation.
> Référence canonique pour toute décision UI. En cas de doute, ce fichier a raison.

---

## Tokens de base (Tailwind v4 `@theme`)

```css
@theme {
  /* Surfaces */
  --color-surface-0: #0E0E11;
  --color-surface-1: #141418;
  --color-surface-2: #1C1C22;
  --color-border: #2A2A35;

  /* Encre */
  --color-ink: #ECECEE;
  --color-ink-muted: #888894;
  --color-ink-faint: #4A4A58;

  /* Accent */
  --color-accent: #F5A623;
  --color-accent-dim: rgba(245, 166, 35, 0.15);

  /* Classes — couleur principale */
  --color-class-frontend: #F5A623;
  --color-class-backend: #3B82F6;
  --color-class-security: #22C55E;
  --color-class-debug: #9CA3AF;
  --color-class-design: #EC4899;
  --color-class-data: #06B6D4;
  --color-class-devops: #8B5CF6;
  --color-class-product: #FB7185;
  --color-class-quality: #A3E635;
  --color-class-docs: #D6B98C;

  /* Typographie */
  --font-display: 'Clash Display', sans-serif;
  --font-body: 'Satoshi', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Échelle type (modular ×1.25) */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.25rem;    /* 20px */
  --text-xl: 1.563rem;   /* 25px */
  --text-2xl: 1.953rem;  /* 31px */
  --text-3xl: 2.441rem;  /* 39px */
  --text-4xl: 3.052rem;  /* 49px */
  --text-5xl: 3.815rem;  /* 61px */

  /* Spacing */
  --radius-card: 12px;
  --radius-sm: 6px;
  --radius-lg: 16px;

  /* Ombres */
  --shadow-card: 0 2px 12px rgba(0,0,0,0.4);
  --shadow-card-hover: 0 8px 32px rgba(0,0,0,0.6);
  --shadow-glow-accent: 0 0 20px rgba(245, 166, 35, 0.25);
}
```

---

## Composants

### Card (base)

```
┌─────────────────────────────┐  ratio 5:7
│  [badge type]  [badge rareté]│  ← header strip (couleur de classe)
│                              │
│       [avatar/icône]         │
│                              │
│    Nom (Clash Display)       │
│    Rôle (Satoshi muted)      │
│                              │
│  [stat 1] [stat 2] [stat 3]  │  ← agents uniquement
│                              │
│    ─────────────────────     │
│    Résumé court (2 lignes)   │
│                              │
│    [bouton primaire →]       │
└─────────────────────────────┘
```

- Fond : `surface-1` (#141418)
- Bordure : `border` (#2A2A35), épaisseur 1px
- Border-top : couleur de classe, épaisseur 2px
- Radius : `radius-card` (12px)
- Hover : `surface-2` + `shadow-card-hover` + scale(1.02) · 150ms ease-out

### CardHolo (signature)

Extends Card. En plus :
- `transform-style: preserve-3d` + `perspective: 1000px`
- `mousemove` → `rotateX(${-y * 15}deg) rotateY(${x * 15}deg)`
- Overlay foil : `conic-gradient(...)` animé, `mix-blend-mode: overlay`, opacité 0→0.6 selon distance curseur du centre
- `@media (prefers-reduced-motion: reduce)` : transform fixe, overlay opacité 0

### CardMini (grille)

Version réduite : no stats, résumé tronqué 1 ligne, hover = scale(1.03) + lueur couleur-classe.

### FilterRail

Sidebar ou rail horizontal de filtres :
- Groupe « Type » : radio pills (Agent / Skill / Commande / Team)
- Groupe « Classe » : checkboxes avec dot coloré + label
- Groupe « Rareté » : checkboxes (Commun / Rare / Épique / Légendaire)
- Reset : lien texte « Effacer les filtres »

### CopyBlock

```
┌──────────────────────────────────────────────────┐
│ $ npx claude-plugin install lino                 │ [Copier]
└──────────────────────────────────────────────────┘
```
- Fond : `surface-0`, border `border`, radius `radius-sm`, font mono
- `[Copier]` : bouton accent → après copie → `✓ Copié !` (2s), puis reset
- Focus visible sur le bouton

### StatBlock (agents)

4 stats en ligne : Rigueur · Vitesse · Autonomie · Périmètre. Valeur /10.
Barre de progression courte (couleur de classe). Pas de label verbeux.

### RarityBadge

Pill compact : `COMMUN` / `RARE` / `ÉPIQUE` / `LÉGENDAIRE`. Couleur de fond selon rareté :
- Commun : `surface-2` + encre muted
- Rare : liseré métallique (dégradé linéaire argent)
- Épique : fond violet sombre + texte lumineux
- Légendaire : fond dégradé prismatique, animation subtile

### ClassLegend (home section 4)

Bandes horizontales colorées, une par classe, avec icône + nom + description courte (1 ligne).
Sur hover : la bande prend toute sa couleur (opacity 1). Les autres s'estompent légèrement.

### Header

```
[L'Index]  ·  Collection  À propos      [FR|EN]
```
- Fond : `surface-0` + `backdrop-blur` léger au scroll
- Wordmark en Clash Display, accent or
- Nav liens en Satoshi sm, `ink-muted` au repos, `ink` au survol
- LangSwitcher : pill FR / EN, actif en accent

### Button

Variantes : `primary` (fond accent or, texte dark) · `ghost` (transparent, bordure, texte ink) · `dim` (surface-2).
Radius `radius-sm`. Padding `12px 20px`. Hover : brightness(1.1). Focus : outline accent 2px offset 2px.

---

## Motion

Toutes les animations utilisent `motion/react` (Framer Motion) sauf le tilt holo (CSS natif + JS vanilla).

| Interaction | Duration | Easing | Notes |
|---|---|---|---|
| Hover carte (grille) | 150ms | easeOut | scale + glow |
| Tilt holo (temps réel) | — | CSS transition 80ms | mousemove |
| Reveal stagger (collection) | 400–600ms total | spring stiffness:300 damping:30 | une seule fois |
| Transition de page | 200ms | easeOut | opacity + translateY(8px) |
| Copy feedback | 1800ms total | — | état texte |
| Rareté Légendaire | loop 4s | linear | holo prismatique |

`prefers-reduced-motion` :
- Tilt holo → désactivé (transform fixe)
- Stagger → désactivé (apparition instantanée)
- Transitions de page → 0ms

---

## Accessibilité (non-négociable)

- Contraste minimum AA : ratio 4.5:1 pour le texte, 3:1 pour les composants UI.
- `color` n'est **jamais** le seul vecteur d'information : toujours `couleur + icône + label`.
- Toutes les cartes sont accessibles au clavier (`tabIndex`, `Enter`/`Space` = click).
- Focus styles visibles : outline accent 2px, offset 2px.
- Images : `alt` descriptif, jamais vide (sauf déco pure avec `role="presentation"`).
- `aria-label` sur les boutons icon-only (CopyBlock, LangSwitcher).
- Aucun `outline: none` sans alternative focus visible.

---

## Performance

- Budget initial (JS + CSS + fonts) : < 1,5 Mo en gzip.
- Holo en CSS pur + JS vanilla (pas de lib 3D : no Three.js, no R3F).
- Images : `next/image` partout, `lazy` par défaut, `eager` sur la carte héros uniquement.
- Fonts : self-host Clash Display + Satoshi via `next/font/local`. JetBrains Mono via `next/font/google`. Pas de chargement asynchrone tiers.
- `<link rel="preload">` sur Clash Display.

---

## États à gérer (pas d'oubli)

| Composant | États requis |
|---|---|
| CardMini (grille) | repos · survol · focus · sélectionné |
| CopyBlock | normal · copié (2s) · erreur |
| FilterRail | aucun filtre · filtre(s) actif(s) · reset |
| Catalogue | chargé · vide (aucun résultat) |
| LangSwitcher | fr actif · en actif |
| CardHolo | repos (léger tilt auto) · holo actif (cursor inside) · reduced-motion |

---

## Ce qui est interdit (anti-slop)

- ❌ Inter comme police principale
- ❌ Fond mesh/gradient animé en boucle
- ❌ Curseur custom
- ❌ Parallax sur chaque section scroll
- ❌ Tilt complet sur toutes les cartes de la grille
- ❌ Holo sur toutes les cartes (uniquement héros + fiche)
- ❌ Plusieurs signatures concurrentes
- ❌ Sections avec un style visuel différent des autres
- ❌ Texte lorem ou placeholder dans le build final
- ❌ `outline: none` sans alternative
