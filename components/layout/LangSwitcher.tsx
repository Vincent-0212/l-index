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
    <div
      className="flex items-center gap-0.5 p-0.5"
      style={{
        backgroundColor: "var(--color-surface-2)",
        borderRadius: "var(--radius-sm)",
      }}
      role="group"
      aria-label="Langue"
    >
      {(["fr", "en"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => switchLocale(lang)}
          aria-pressed={locale === lang}
          className={cn(
            "rounded-[4px] px-2 py-1 text-xs font-medium transition-all duration-150 uppercase cursor-pointer",
            "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-1"
          )}
          style={
            locale === lang
              ? {
                  backgroundColor: "var(--color-surface-3)",
                  color: "var(--color-text)",
                  boxShadow: "var(--shadow-1)",
                }
              : {
                  color: "var(--color-text-muted)",
                }
          }
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
