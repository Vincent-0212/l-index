# DESIGN — L'Index

> Référence canonique. En cas de doute, ce fichier a raison.

---

## Tokens (Tailwind v4 `@theme` + overrides CSS)

### Dark (défaut)
```css
--color-bg: #17150F; --color-surface: #1F1C15; --color-surface-2: #272318;
--color-surface-3: #2E2A1E; --color-border: #3A3629; --color-border-strong: #4A4636;
--color-text: #ECE7DB; --color-text-muted: #A8A192; --color-text-faint: #6B6356;
--color-accent: #E3A84A; --color-accent-hover: #EDB860; --color-accent-fg: #17150F;
```

### Light (`:root[data-mode="light"]`)
```css
--color-bg: #F4EFE6; --color-surface: #FBF8F2; --color-surface-2: #FFFFFF;
--color-surface-3: #EDE8DE; --color-border: #DDD7CC; --color-border-strong: #C8C0B4;
--color-text: #2A2620; --color-text-muted: #6B6356; --color-text-faint: #9A9286;
--color-accent: #C2660C; --color-accent-hover: #A8570A; --color-accent-fg: #FFFFFF;
```

### Classes
`frontend #F97316 · backend #3B82F6 · security #22C55E · debug #9CA3AF · design #EC4899`
`data #06B6D4 · devops #8B5CF6 · product #FB7185 · quality #A3E635 · docs #D6B98C · orchestration #A78BFA`

### Dans les composants
Utiliser `var(--color-*)` directement ou classes Tailwind `bg-[var(--color-surface)]`.

---

## Composants clés

### AgentCard
Grande carte portrait. `border-top: 3px solid var(--color-class-{class})`. Zone avatar 3:2 avec placeholder User icon. Badge pilule classe. Summary 2 lignes. Link → `/c/agent/{slug}`.

### SkillCard
Compact. Badge "tag" (coins carrés). Ligne triggers font-mono 12px en bas.

### CommandCard
`background: var(--color-surface-2)`. `border-left: 3px solid`. Nom `$ /command` font-mono accent.

### Terminal
Barre titre macOS (3 cercles), prompt `$` accent, copy idle/copied/error.

### CommandPalette
Overlay blur, panel centré top-20, input search, résultats groupés, navigation ↑↓/Enter/Esc.

---

## Motion

| Interaction | Durée | Easing |
|---|---|---|
| Hero enter (stagger) | 400ms total | easeOut |
| Hover carte | 150ms | easeOut |
| Palette open/close | 120ms | easeOut |
| Copy feedback | 1800ms | — |
| Page transitions | 200ms | easeOut |

`prefers-reduced-motion` : désactiver toutes les animations (durées → 0ms ou 1ms).

---

## Accessibilité (non-négociable)

- Contraste AA : 4.5:1 texte, 3:1 UI.
- `focus-visible` : outline `var(--color-accent)` 2px.
- `aria-label` sur boutons icon-only.
- Navigation clavier dans CommandPalette (focus trap).

---

## Ce qui est interdit

❌ Glow coloré sur les cartes  ❌ Animation prismatique  ❌ Stats /10  ❌ Badges de rareté  ❌ Tilt 3D  ❌ Fond radial gradient en boucle  ❌ Icône Github (utiliser ExternalLink)  ❌ `outline: none` sans alternative
