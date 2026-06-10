export const CLASS_MAP = {
  frontend: { label: "Frontend", color: "#F5A623", icon: "Layers" },
  backend: { label: "Backend", color: "#3B82F6", icon: "Server" },
  security: { label: "Sécurité", color: "#22C55E", icon: "Shield" },
  debug: { label: "Debug", color: "#9CA3AF", icon: "Bug" },
  design: { label: "Design/UX", color: "#EC4899", icon: "Palette" },
  data: { label: "Data/IA", color: "#06B6D4", icon: "Brain" },
  devops: { label: "DevOps", color: "#8B5CF6", icon: "GitBranch" },
  product: { label: "Produit", color: "#FB7185", icon: "Compass" },
  quality: { label: "Qualité", color: "#A3E635", icon: "CheckCircle" },
  docs: { label: "Docs", color: "#D6B98C", icon: "BookOpen" },
  orchestration: { label: "Orchestration", color: "prismatic", icon: "Network" },
} as const;

export type ClassName = keyof typeof CLASS_MAP;
