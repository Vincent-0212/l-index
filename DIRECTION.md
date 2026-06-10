# DIRECTION — L'Index

> Contrat de build. L'implémentation suit ce fichier à la lettre.
> Approuvé avant toute ligne de code.

---

## Concept

**Chaque outil Claude est une carte de spécialiste qu'on prend en main avant de l'enrôler** — classe colorée, rareté, stats RPG, et un foil holographique qui ne se révèle qu'au toucher — parce qu'un bon outil, on a envie de le collectionner, et la couleur-classe donne une lecture instantanée du rôle avant même de lire le nom.

> *Balatro / Marvel Snap pour le sentiment tactile · Linear / Figma pour le niveau de finition.*

---

## Audience & intention

- **Audience** : développeurs francophones (et internationaux, EN disponible) qui utilisent Claude au quotidien — niveau débutant à intermédiaire, ton Micode, curiosité pour l'outillage IA.
- **Le sentiment unique à laisser** : *le jeu* — l'envie de collectionner, de fureter, de "recruter" des agents dans son propre setup.
- **Action principale / succès** : copier la commande d'installation ou télécharger un plugin depuis sa fiche détail. Succès = le visiteur repart avec un plugin en main.

---

## Pivot de référence

- **Voler chez Balatro / Marvel Snap** : le sentiment de tenir une carte, l'identité forte par classe de couleur, le feedback « juice » au clic. L'objet qui a de la présence.
- **Voler chez Linear / Figma** : la retenue, la densité d'information propre, le dark UI soigné, la cohérence typographique sans surcharge.
- **Éviter** : ambiance casino, faces de carte surchargées (icône + titre + 4 paragraphes + 2 boutons = trop), effets empilés (tilt + glow + shake + son = premium slop).

---

## Parcours

- **Arrivée (100vh)** : une seule carte holographique flottante qui s'incline lentement avec le curseur. À côté : wordmark `L'Index` + une ligne (`Tes outils Claude. Comme tu ne les avais jamais vus.`) + CTA `Ouvrir la collection →`. Un objet dans l'espace, pas un mur.
- **Révélation au scroll** : la carte héros recule doucement, la collection apparaît staggered (une seule fois, 400–600 ms). Pas de trigger-on-scroll sur chaque section.
- **Tension & respiration** :
  - Héros = grand vide, un objet centré — respiration maximale.
  - Collection = grille dense — tension, diversité, couleur.
  - Fiche détail = respiration à nouveau — carte héros grande à gauche, contenu à droite, puis bloc Récupérer au bas.
- **Résolution** : bloc « Récupérer ce plugin » — commande à copier / télécharger / GitHub. C'est ici que tout mène.

---

## Sections (home)

| # | Section | Intention (un seul job) | Dominant | Subordonné |
|---|---|---|---|---|
| 1 | Héros | Planter l'identité + l'objet | Carte holo au centre | Wordmark + tagline + CTA |
| 2 | La collection (preview) | Donner envie d'explorer | Grille de 6 cartes (2 rangées) | Label de filtre rapide + lien « Voir tout » |
| 3 | Le concept | Expliquer en 3 lignes ce qu'est L'Index | Le texte (gros, centré) | Icônes de classe en sous-titre |
| 4 | Classes (la légende) | Montrer la taxonomie couleur | Bandes de couleur nommées | Description courte de chaque classe |
| 5 | Footer | Navigation + crédits | Liens utiles | Couleur d'accent, pas de décor |

---

## Système

### Typographie

- **Display** : `Clash Display` (Fontshare, self-host `next/font/local`) — caractère géométrique, jamais Inter. Porte l'identité du projet : technique mais joueur.
- **Texte** : `Satoshi` (Fontshare, self-host `next/font/local`) — lisible, moderne, sans dureté.
- **Mono** : `JetBrains Mono` (Google Fonts via `next/font/google`) — pour les blocs de commande.
- **Échelle** : base 16px, modular scale ×1.25. Steps utilisés : 12 / 14 / 16 / 20 / 25 / 31 / 39 / 49px.

### Couleurs

| Rôle | Valeur |
|---|---|
| Surface 0 (fond app) | `#0E0E11` |
| Surface 1 (cartes, panneaux) | `#141418` |
| Surface 2 (hover, surélevé) | `#1C1C22` |
| Bordure | `#2A2A35` |
| Encre principale | `#ECECEE` |
| Encre secondaire | `#888894` |
| **Accent or** | `#F5A623` |

**Couleurs de classe** (signal uniquement — bordure, lueur, badge — jamais portées seules, toujours doublon couleur + icône + label) :

| Classe | Couleur | Hex |
|---|---|---|
| Frontend | Or / Ambre | `#F5A623` |
| Backend | Bleu électrique | `#3B82F6` |
| Sécurité | Vert émeraude | `#22C55E` |
| Debug / Investigation | Gris ardoise | `#9CA3AF` |
| Design / UX | Magenta | `#EC4899` |
| Data / IA | Cyan | `#06B6D4` |
| DevOps / Infra | Violet | `#8B5CF6` |
| Produit / Stratégie | Corail | `#FB7185` |
| Qualité / Review | Lime | `#A3E635` |
| Docs / Recherche | Sable | `#D6B98C` |
| Orchestration | Prismatique | (réservé Légendaire) |

### Rareté

*Curatoriale, pas aléatoire — reflète la profondeur et la portée réelle du plugin.*

| Rareté | Traitement visuel |
|---|---|
| Commun | Mat, bordure standard |
| Rare | Liseré métallique subtil |
| Épique | Foil holographique au tilt (CSS) |
| Légendaire | Holo prismatique animé en boucle |

### Grille & espace

- 12 colonnes, gouttières 24px.
- Cartes en ratio carte à jouer **5:7** (width:height).
- Grille collection : 2 / 3 / 4 colonnes responsive (mobile → tablette → desktop).
- Whitespace actif : le héros a 40vh de vide autour de la carte. Ça coûte rien, ça crée tout.

### Motion

- **Tilt temps réel** : `useRef` + `mousemove` → transform rotate3d + perspective. Limité à ±15°.
- **Foil holo** : `conic-gradient` masqué par `mix-blend-mode: overlay` + opacité pilotée par la position curseur.
- **Reveal staggered** : une seule fois à l'entrée dans la viewport (`IntersectionObserver`). 400–600 ms, `stagger 60ms` entre cartes.
- **Transitions de page** : ease calme (`easeOut`, 200 ms).
- **Micro-interactions** : 120–200 ms (hover, copy feedback).
- **Durées** : rien en dessous de 100 ms (invisible), rien au-dessus de 700 ms sans raison narrative.
- `prefers-reduced-motion` : tilt et foil désactivés, fondus à 0 ms → 1 ms (perçu immédiat).

### LA SIGNATURE (une seule)

**Le tilt 3D + foil holographique piloté au pointeur** — sur la carte héros (home, 100vh) et sur la carte principale de la fiche détail uniquement. Les cartes de la grille ont une version légère (scale + border-glow, pas de tilt complet) pour la performance et l'anti-surcharge.

---

## Garde-fous

- **Cut list** : curseur custom ✗ · fond mesh animé ✗ · parallax sur chaque section ✗ · son ✗ · flip 3D sur survol de grille ✗ · holo sur toutes les cartes ✗ · plusieurs signatures concurrentes ✗.
- **Règle de consistance** : un seul système typographique end-to-end. Si une section semble "différente", c'est un bug, pas de la créativité.
- **Voix du contenu** : malin, accessible, jamais gadget. Tutoiement. Phrases courtes. Pas de lorem dans le build final.
- **a11y & perf** : contraste AA minimum partout · `prefers-reduced-motion` respecté · navigation clavier (focus visibles, pas de focus hidden) · budget initial < 1,5 Mo · holo en CSS pur (zero lib 3D) · images lazy.

---

## Handoff

- **Style exclusif actif** : `design-taste-frontend`
- **Disciplines cumulées** : `interface-craft` + `impeccable` + `full-output-enforcement`
- **Stack** : Next.js App Router + TypeScript + Tailwind v4 (`@theme`) + Motion (`motion/react`) + `next-intl` + `@next/mdx` + `lucide-react` + `clsx` + `tailwind-merge`
- **Vérification** : ouvrir dans Chrome, contrôler l'arrivée (tilt fonctionne au mouvement souris), scroller (rhythm OK), filtrer la collection (type + classe + rareté + search), ouvrir une fiche (bloc Récupérer fonctionnel, copy feedback), basculer FR/EN, tester clavier, tester reduced-motion.
