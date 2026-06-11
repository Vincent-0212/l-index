import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: { default: "L'Index — Plugins Claude", template: "%s | L'Index" },
  description: "Catalogue personnel de plugins Claude : agents, skills et commandes, organisés par discipline.",
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('theme-mode');if(!m)m=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-mode',m);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-[100dvh] flex-col bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <Header
              locale={locale}
              messages={{
                nav: {
                  agents: messages.nav.agents as string,
                  skills: messages.nav.skills as string,
                  commands: messages.nav.commands as string,
                  about: messages.nav.about as string,
                  home: messages.nav.home as string,
                },
              }}
            />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
