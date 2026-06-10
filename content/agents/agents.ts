import type { AgentCard } from "@/lib/types";

export const agents: AgentCard[] = [
  {
    type: "agent",
    slug: "lino",
    name: "Lino",
    role: "UI/UX Designer",
    class: "design",
    summary:
      "Lino audite l'expérience utilisateur de ton app avec un œil de designer senior. Il repère ce qui freine, ce qui déroute, et ce qui pourrait simplement être beau.",
    whatItDoes:
      "Produit un audit UX complet : hiérarchie visuelle, cohérence des composants, fluidité des parcours, accessibilité de base. Il classe ses recommandations par priorité et explique le raisonnement derrière chaque point.",
    whenToUse:
      "Avant un lancement, après un refactor UI, ou quand tu sens que quelque chose cloche mais tu ne sais pas quoi.",
    example:
      "Analyse l'UX de ma page d'accueil et identifie les 5 points de friction prioritaires.",
    install: `# Ajoute Lino dans ton projet Claude\ncurl -O https://raw.githubusercontent.com/you/claude-index/main/agents/lino.md\n# Puis place le fichier dans ~/.claude/agents/`,
    github: "https://github.com/you/claude-index/blob/main/agents/lino.md",
  },
  {
    type: "agent",
    slug: "theo",
    name: "Théo",
    role: "Backend Architect",
    class: "backend",
    summary:
      "Théo conçoit des architectures backend solides sur Supabase et Rust. Il pense migrations, RLS et scalabilité avant même d'écrire une ligne.",
    whatItDoes:
      "Schémas Postgres propres, politiques RLS watertight, Edge Functions bien typées, APIs REST/RPC cohérentes, migrations sans danger. Il documente ses choix pour que tu comprennes pourquoi, pas juste quoi.",
    whenToUse:
      "Quand tu crées une nouvelle table, quand tu ouvres une API publique, ou quand tu touches à l'auth.",
    example:
      "Conçois le schéma Postgres et les politiques RLS pour un système de commentaires multi-tenant.",
    install: `curl -O https://raw.githubusercontent.com/you/claude-index/main/agents/theo.md\n# Place le fichier dans ~/.claude/agents/`,
    github: "https://github.com/you/claude-index/blob/main/agents/theo.md",
  },
  {
    type: "agent",
    slug: "maya",
    name: "Maya",
    role: "Security Guard",
    class: "security",
    summary:
      "Maya traque les failles avant qu'elles deviennent des incidents. Auth, inputs, secrets, RLS : rien ne lui échappe.",
    whatItDoes:
      "Audit de sécurité complet : exposition des routes, politiques RLS manquantes ou trop permissives, inputs non sanitizés, secrets en dur, headers HTTP manquants, dépendances vulnérables. Elle produit un rapport priorisé avec les corrections.",
    whenToUse:
      "Avant un push important, quand tu touches à l'auth ou aux politiques RLS, ou après un refactor sensible.",
    example:
      "Audite mes politiques RLS sur la table `profiles` et identifie les vecteurs d'escalade de privilèges.",
    install: `curl -O https://raw.githubusercontent.com/you/claude-index/main/agents/maya.md\n# Place le fichier dans ~/.claude/agents/`,
    github: "https://github.com/you/claude-index/blob/main/agents/maya.md",
  },
  {
    type: "agent",
    slug: "sami",
    name: "Sami",
    role: "Frontend Dev",
    class: "frontend",
    summary:
      "Sami code des composants React/Next.js propres et performants. Tailwind v4, Motion, TypeScript — il connaît la stack par cœur.",
    whatItDoes:
      "Composants React isolés, layouts responsive avec CSS Grid, animations avec Motion, intégration Tailwind v4 avec tokens custom. Il respecte les conventions RSC/Client et n'installe rien sans expliquer.",
    whenToUse:
      "Pour tout composant UI : formulaires, cards, navigation, modals, animations. Il est rapide sur l'exécution évidente.",
    example:
      "Crée un composant Card responsive avec un hover effect et un état focus accessible.",
    install: `curl -O https://raw.githubusercontent.com/you/claude-index/main/agents/sami.md\n# Place le fichier dans ~/.claude/agents/`,
    github: "https://github.com/you/claude-index/blob/main/agents/sami.md",
  },
  {
    type: "agent",
    slug: "raf",
    name: "Raf",
    role: "Code Reviewer",
    class: "quality",
    summary:
      "Raf relit le code avec un regard chirurgical. Il trouve les bugs latents, les abstractions mal choisies, et les opportunités de simplification.",
    whatItDoes:
      "Revue de code structurée : bugs potentiels, types insuffisants, logique dupliquée, complexité inutile, nommage approximatif, et suggestions concrètes de refactoring. Il classe par sévérité.",
    whenToUse:
      "Après avoir écrit une feature non triviale, avant de merger, ou quand tu as le sentiment que le code fonctionne mais manque de clarté.",
    example:
      "Relis ce composant React et identifie les risques de re-render inutile et les props mal typées.",
    install: `curl -O https://raw.githubusercontent.com/you/claude-index/main/agents/raf.md\n# Place le fichier dans ~/.claude/agents/`,
    github: "https://github.com/you/claude-index/blob/main/agents/raf.md",
  },
  {
    type: "agent",
    slug: "doc",
    name: "Doc",
    role: "Docs & Research",
    class: "docs",
    summary:
      "Doc récupère la documentation à jour des libs et frameworks que tu utilises, avant que tu codes de mémoire.",
    whatItDoes:
      "Résolution d'ID de librairie, requêtes docs via Context7, comparaison de versions, extraction des breaking changes, et synthèse des patterns recommandés pour ton usage précis.",
    whenToUse:
      "Dès qu'une librairie ou un framework est en jeu — même ceux que tu crois connaître. Les docs changent plus vite que la mémoire.",
    example:
      "Trouve la documentation de next-intl pour le routing App Router et montre-moi comment configurer les locales.",
    install: `curl -O https://raw.githubusercontent.com/you/claude-index/main/agents/doc.md\n# Place le fichier dans ~/.claude/agents/`,
    github: "https://github.com/you/claude-index/blob/main/agents/doc.md",
  },
  {
    type: "agent",
    slug: "orion",
    name: "Orion",
    role: "Chief Architect",
    class: "orchestration",
    summary:
      "Orion orchestre des projets complexes en coordonnant plusieurs agents spécialisés. Il voit l'ensemble du système quand les autres voient leur composant.",
    whatItDoes:
      "Décomposition de features complexes en tâches délégables, séquençage des agents dans le bon ordre, détection des dépendances inter-agents, arbitrage des décisions d'architecture, et vision d'ensemble du système.",
    whenToUse:
      "Sur des projets impliquant plusieurs domaines simultanément (frontend + backend + sécurité + docs), ou quand une feature touche à l'architecture globale.",
    example:
      "Orchestre la mise en place d'un système d'authentification complet : schéma Supabase, RLS, composants UI, tests.",
    install: `curl -O https://raw.githubusercontent.com/you/claude-index/main/agents/orion.md\n# Place le fichier dans ~/.claude/agents/`,
    github: "https://github.com/you/claude-index/blob/main/agents/orion.md",
  },
];
