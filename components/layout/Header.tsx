"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { LangSwitcher } from "./LangSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { CommandPalette } from "@/components/search/CommandPalette";
import { cn } from "@/lib/utils";

interface HeaderProps {
  locale: string;
  messages: {
    nav: { agents: string; skills: string; commands: string; about: string; home: string };
  };
}

export function Header({ locale, messages }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll listener — border appears after 16px scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Open CommandPalette on Cmd+K / Ctrl+K
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  const navLinks = [
    { href: `/${locale}/agents`, label: messages.nav.agents },
    { href: `/${locale}/skills`, label: messages.nav.skills },
    { href: `/${locale}/commands`, label: messages.nav.commands },
    { href: `/${locale}/about`, label: messages.nav.about },
  ];

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200"
        )}
        style={{
          height: "52px",
          backgroundColor: scrolled
            ? "rgba(var(--color-bg-rgb, 23, 21, 15), 0.92)"
            : "var(--color-bg)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--color-border)"
            : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Wordmark */}
          <Link
            href={`/${locale}`}
            className="shrink-0 text-[16px] font-bold transition-colors duration-150 rounded-[var(--radius-sm)]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text)")
            }
          >
            L&apos;Index
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative rounded-[var(--radius-sm)] px-3 py-1.5 text-[13px] transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
                )}
                style={{
                  color: isActive(href)
                    ? "var(--color-text)"
                    : "var(--color-text-muted)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(href))
                    e.currentTarget.style.color = "var(--color-text)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(href))
                    e.currentTarget.style.color = "var(--color-text-muted)";
                }}
              >
                {label}
                {/* Active underline */}
                {isActive(href) && (
                  <span
                    className="absolute bottom-0.5 left-3 right-3 h-px"
                    style={{ backgroundColor: "var(--color-accent)" }}
                    aria-hidden
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-1.5">
            {/* ⌘K search button */}
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Ouvrir la recherche (⌘K)"
              className={cn(
                "hidden sm:flex items-center gap-2 border border-[var(--color-border)]",
                "rounded-[var(--radius-sm)] px-2.5 py-1.5 text-[13px] transition-all duration-150 cursor-pointer",
                "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-1"
              )}
              style={{
                backgroundColor: "var(--color-surface-2)",
                color: "var(--color-text-muted)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-text)";
                e.currentTarget.style.borderColor = "var(--color-border-strong)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-muted)";
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            >
              <Search size={13} strokeWidth={1.75} aria-hidden />
              <span className="hidden lg:inline">Rechercher</span>
              <kbd
                className="hidden lg:inline rounded px-1 text-[10px]"
                style={{
                  backgroundColor: "var(--color-surface-3)",
                  color: "var(--color-text-faint)",
                  border: "1px solid var(--color-border)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                ⌘K
              </kbd>
            </button>

            {/* Search icon only on small screens */}
            <button
              onClick={() => setPaletteOpen(true)}
              aria-label="Rechercher"
              className={cn(
                "flex sm:hidden items-center justify-center w-8 h-8 rounded-[var(--radius-sm)]",
                "transition-colors duration-150 cursor-pointer",
                "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              )}
              style={{ color: "var(--color-text-muted)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-text)";
                e.currentTarget.style.backgroundColor = "var(--color-surface-2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-muted)";
                e.currentTarget.style.backgroundColor = "";
              }}
            >
              <Search size={15} strokeWidth={1.75} aria-hidden />
            </button>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Lang switcher — desktop */}
            <div
              className="hidden sm:block ml-1 pl-1.5 border-l"
              style={{ borderColor: "var(--color-border)" }}
            >
              <LangSwitcher locale={locale} />
            </div>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
              className={cn(
                "flex md:hidden items-center justify-center w-8 h-8 rounded-[var(--radius-sm)]",
                "transition-colors duration-150 cursor-pointer",
                "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              )}
              style={{ color: "var(--color-text-muted)" }}
              onMouseEnter={(e) => {
                (e.currentTarget.style.color = "var(--color-text)"),
                  (e.currentTarget.style.backgroundColor =
                    "var(--color-surface-2)");
              }}
              onMouseLeave={(e) => {
                (e.currentTarget.style.color = "var(--color-text-muted)"),
                  (e.currentTarget.style.backgroundColor = "");
              }}
            >
              {mobileOpen ? (
                <X size={16} strokeWidth={1.75} aria-hidden />
              ) : (
                <Menu size={16} strokeWidth={1.75} aria-hidden />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <nav
            className="md:hidden border-t border-[var(--color-border)] px-4 py-3 flex flex-col gap-1"
            style={{ backgroundColor: "var(--color-surface)" }}
            aria-label="Menu mobile"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                )}
                style={{
                  color: isActive(href)
                    ? "var(--color-text)"
                    : "var(--color-text-muted)",
                  backgroundColor: isActive(href)
                    ? "var(--color-surface-2)"
                    : "transparent",
                }}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 mt-1 border-t border-[var(--color-border)] flex items-center gap-2">
              <LangSwitcher locale={locale} />
            </div>
          </nav>
        )}
      </header>

      {/* CommandPalette — mounted outside header to avoid z-index issues */}
      {paletteOpen && (
        <CommandPalette locale={locale} onClose={() => setPaletteOpen(false)} />
      )}
    </>
  );
}
