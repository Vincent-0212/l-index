"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LangSwitcher } from "./LangSwitcher";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface HeaderProps {
  locale: string;
  messages: {
    nav: { collection: string; about: string; home: string };
  };
}

export function Header({ locale, messages }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  const collectionHref = `/${locale}/collection`;
  const aboutHref = `/${locale}/about`;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "bg-[var(--color-surface-0)]/90 backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        {/* Wordmark */}
        <Link
          href={`/${locale}`}
          className="text-base font-semibold text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2 rounded-sm"
          style={{ fontFamily: "var(--font-display)" }}
        >
          L&apos;Index
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href={collectionHref}
            className={cn(
              "rounded-[var(--radius-sm)] px-3 py-1.5 text-sm transition-colors duration-150",
              "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2",
              isActive(collectionHref)
                ? "text-[var(--color-ink)] bg-[var(--color-surface-2)]"
                : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            )}
          >
            {messages.nav.collection}
          </Link>
          <Link
            href={aboutHref}
            className={cn(
              "rounded-[var(--radius-sm)] px-3 py-1.5 text-sm transition-colors duration-150",
              "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2",
              isActive(aboutHref)
                ? "text-[var(--color-ink)] bg-[var(--color-surface-2)]"
                : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            )}
          >
            {messages.nav.about}
          </Link>
          <div className="ml-2 pl-2 border-l border-[var(--color-border)]">
            <LangSwitcher locale={locale} />
          </div>
        </nav>
      </div>
    </header>
  );
}
