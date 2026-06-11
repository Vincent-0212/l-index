import Link from "next/link";

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const navLinks = [
    { href: `/${locale}/agents`, label: "Agents" },
    { href: `/${locale}/skills`, label: "Skills" },
    { href: `/${locale}/commands`, label: "Commandes" },
    { href: `/${locale}/about`, label: "À propos" },
  ];

  return (
    <footer
      className="mt-auto"
      style={{
        borderTop: "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
        paddingTop: "48px",
        paddingBottom: "32px",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-1.5">
            <span
              className="text-[15px] font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
              }}
            >
              L&apos;Index
            </span>
            <p
              className="text-[13px]"
              style={{ color: "var(--color-text-faint)" }}
            >
              Catalogue de plugins Claude
            </p>
          </div>

          {/* Nav links */}
          <nav
            className="flex items-center gap-6"
            aria-label="Liens de pied de page"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] transition-colors duration-150 rounded-[var(--radius-sm)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-1"
                style={{ color: "var(--color-text-faint)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-muted)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-faint)")
                }
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div
          className="mt-10 pt-6 text-[12px]"
          style={{
            borderTop: "1px solid var(--color-border)",
            color: "var(--color-text-faint)",
          }}
        >
          © {new Date().getFullYear()} L&apos;Index
        </div>
      </div>
    </footer>
  );
}
