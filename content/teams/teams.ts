import type { TeamCard } from "@/lib/types";

export const teams: TeamCard[] = [
  {
    type: "team",
    slug: "security-squad",
    name: "Security Squad",
    class: "security",
    summary:
      "Le duo de choc avant tout push sensible. Maya audite la sécurité, Raf relit le code — rien ne passe sans double vérification.",
    memberSlugs: ["maya", "raf"],
    theme: "Avant un push critique ou une ouverture d'API publique.",
    whenToUse:
      "Quand tu touches à l'auth, aux politiques RLS, aux inputs utilisateur, ou quand tu t'apprêtes à pousser en production une feature avec des implications sécurité.",
  },
  {
    type: "team",
    slug: "full-stack-duo",
    name: "Full Stack Duo",
    class: "backend",
    summary:
      "Sami construit l'interface, Théo pose les fondations backend. La stack complète dans un enchaînement fluide.",
    memberSlugs: ["sami", "theo"],
    theme: "Feature complète front + back en une session.",
    whenToUse:
      "Pour une feature qui touche à la fois l'UI et la base de données — formulaire + API, authentification + page profil, dashboard + requêtes complexes.",
  },
];
