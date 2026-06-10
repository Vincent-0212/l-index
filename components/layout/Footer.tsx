import Link from "next/link";

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] py-8 px-4">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-ink-faint)]">
        <p>
          <span style={{ fontFamily: "var(--font-display)" }} className="text-[var(--color-ink-muted)]">
            L&apos;Index
          </span>
          {" "}· Catalogue de plugins Claude
        </p>
        <nav className="flex items-center gap-4">
          <Link
            href={`/${locale}/collection`}
            className="hover:text-[var(--color-ink-muted)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-1 rounded-sm"
          >
            Collection
          </Link>
          <Link
            href={`/${locale}/about`}
            className="hover:text-[var(--color-ink-muted)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-1 rounded-sm"
          >
            À propos
          </Link>
        </nav>
      </div>
    </footer>
  );
}
