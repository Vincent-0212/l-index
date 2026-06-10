import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
    <html lang={locale} className="h-full">
      <body className="flex min-h-full flex-col bg-[var(--color-surface-0)] text-[var(--color-ink)] antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header
            locale={locale}
            messages={{
              nav: {
                collection: messages.nav.collection as string,
                about: messages.nav.about as string,
                home: messages.nav.home as string,
              },
            }}
          />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
