import type { CommandCard } from "@/lib/types";

export const commands: CommandCard[] = [
  {
    type: "command",
    slug: "code-review",
    name: "/code-review",
    class: "quality",
    summary:
      "Déclenche une revue de code structurée sur le diff courant ou le fichier actif.",
    usage: "/code-review",
    effect:
      "Lance un audit du code présent dans le contexte : bugs potentiels, types insuffisants, complexité injustifiée, nommage flou, opportunités de simplification. Classe les problèmes par sévérité (critique / mineur / suggestion). Ne modifie rien sans ton accord.",
  },
  {
    type: "command",
    slug: "run",
    name: "/run",
    class: "debug",
    summary:
      "Lance l'application et observe son comportement pour vérifier un changement ou déboguer un problème.",
    usage: "/run",
    effect:
      "Exécute le serveur de dev (ou la commande de build appropriée), capture les erreurs dans la console, et rapporte ce qui se passe. Utile pour valider qu'un fix fonctionne sans avoir à basculer manuellement sur le terminal.",
  },
  {
    type: "command",
    slug: "clear",
    name: "/clear",
    class: "debug",
    summary:
      "Vide le contexte de la conversation pour repartir proprement entre deux tâches sans rapport.",
    usage: "/clear",
    effect:
      "Réinitialise la fenêtre de contexte. Évite la contamination de contexte entre deux features distinctes — un problème fréquent qui dégrade la qualité des réponses quand le contexte s'accumule. À utiliser entre chaque tâche sans rapport direct.",
  },
];
