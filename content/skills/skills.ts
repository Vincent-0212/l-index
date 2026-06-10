import type { SkillCard } from "@/lib/types";

export const skills: SkillCard[] = [
  {
    type: "skill",
    slug: "art-direction",
    name: "art-direction",
    class: "design",
    summary:
      "Direction artistique pour sites ambitieux. Produit un DIRECTION.md complet avant toute ligne de code, posant le concept, les références, les garde-fous et les tokens design.",
    triggers:
      "Avant tout build frontend d'envergure : landing, portfolio, redesign, vitrine. Déclenché par 'direction artistique', 'DA', ou mention d'un projet visuel ambitieux.",
    effect:
      "Force une phase de réflexion créative avant l'exécution. Produit un contrat visuel (concept, références, anti-patterns, système typographie + couleurs + motion) que l'implémentation doit respecter à la lettre.",
    install: `# Dans ton fichier CLAUDE.md ou projet\n# Active ce skill en ajoutant dans les instructions :\n# 'Applique le skill art-direction avant tout projet visuel.'`,
    github: "https://github.com/you/claude-index/blob/main/skills/art-direction.md",
  },
  {
    type: "skill",
    slug: "full-output-enforcement",
    name: "full-output-enforcement",
    class: "quality",
    summary:
      "Force le code complet dans chaque réponse : zéro placeholder, zéro TODO, zéro `// ...`. Si c'est livré, c'est fini.",
    triggers:
      "Toujours actif sur tout code livré. Aucun déclencheur spécifique requis — il s'applique en permanence dès que du code est produit.",
    effect:
      "Supprime les placeholders, les stubs incomplets et les commentaires de type 'à compléter'. Chaque fonction est implémentée, chaque composant est complet, chaque fichier est prêt pour la production.",
    install: `# Dans ton CLAUDE.md :\n# 'full-output-enforcement est TOUJOURS actif : zéro placeholder, zéro // ..., zéro TODO.'`,
    github:
      "https://github.com/you/claude-index/blob/main/skills/full-output-enforcement.md",
  },
  {
    type: "skill",
    slug: "interface-craft",
    name: "interface-craft",
    class: "design",
    summary:
      "Micro-polish UI systématique : 16 principes d'interface, animation selon les 12 principes, focus states visibles, morphing icons, états cohérents.",
    triggers:
      "Dès que de l'UI est produit. Cumulable avec tout style design actif (design-taste-frontend, advanced-app-design, 3d-web-experience).",
    effect:
      "Ajoute une couche de polish à chaque composant : hover states, focus rings visibles, transitions calibrées (120–200ms), icônes cohérentes, contrastes AA, et micro-interactions qui renforcent le feedback sans surcharger.",
    install: `# Dans ton CLAUDE.md :\n# 'interface-craft est actif dès que de l'UI est produit.'`,
    github:
      "https://github.com/you/claude-index/blob/main/skills/interface-craft.md",
  },
];
