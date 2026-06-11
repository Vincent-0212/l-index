"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Terminal } from "@/components/ui/Terminal";

interface HeroMotionProps {
  locale: string;
  installCommand: string;
}

export function HeroMotion({ locale, installCommand }: HeroMotionProps) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl w-full mx-auto">
      {/* Titre */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h1
          className="font-bold leading-tight"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          Tes spécialistes Claude.
          <br />
          <span style={{ color: "var(--color-accent)" }}>Prêts à bosser.</span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-center text-base sm:text-lg leading-relaxed max-w-lg"
        style={{ color: "var(--color-text-muted)" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      >
        7 agents, 3 skills, 3 commandes —{" "}
        conçus pour s&apos;intégrer dans ton workflow Claude Code.
      </motion.p>

      {/* Terminal */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
      >
        <Terminal
          command={installCommand}
          label="install"
        />
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.28 }}
      >
        <Link
          href={`/${locale}/agents`}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-accent-fg)",
            borderRadius: "var(--radius-sm)",
            padding: "10px 20px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
              "var(--color-accent-hover)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
              "var(--color-accent)";
          }}
        >
          Explorer les agents
          <ArrowRight size={15} strokeWidth={2} aria-hidden />
        </Link>
      </motion.div>
    </div>
  );
}
