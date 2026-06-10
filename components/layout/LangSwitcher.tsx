"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface LangSwitcherProps {
  locale: string;
}

export function LangSwitcher({ locale }: LangSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(next: string) {
    if (next === locale) return;
    const newPath = pathname.replace(/^\/(fr|en)/, `/${next}`);
    router.push(newPath);
  }

  return (
    <div className="flex items-center gap-0.5 rounded-[var(--radius-sm)] bg-[var(--color-surface-2)] p-0.5" role="group" aria-label="Langue">
      {(["fr", "en"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => switchLocale(lang)}
          aria-pressed={locale === lang}
          className={cn(
            "rounded-[4px] px-2 py-1 text-xs font-medium transition-all duration-150 uppercase cursor-pointer",
            "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-1",
            locale === lang
              ? "bg-[var(--color-surface-0)] text-[var(--color-ink)] shadow-sm"
              : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
          )}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
