import type { ClassName } from "./classes";

export type AgentCard = {
  type: "agent";
  slug: string;
  name: string;
  role: string;
  class: ClassName;
  avatar?: string;
  summary: string;
  whatItDoes: string;
  whenToUse: string;
  example: string;
  install?: string;
  download?: string;
  github?: string;
};

export type SkillCard = {
  type: "skill";
  slug: string;
  name: string;
  class: ClassName;
  summary: string;
  triggers: string;
  effect: string;
  install?: string;
  download?: string;
  github?: string;
};

export type CommandCard = {
  type: "command";
  slug: string;
  name: string;
  class: ClassName;
  summary: string;
  usage: string;
  effect: string;
};

export type TeamCard = {
  type: "team";
  slug: string;
  name: string;
  class: ClassName;
  summary: string;
  memberSlugs: string[];
  theme: string;
  whenToUse: string;
};

export type PluginCard = AgentCard | SkillCard | CommandCard | TeamCard;
