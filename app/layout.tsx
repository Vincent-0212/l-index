import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "L'Index — Plugins Claude",
    template: "%s | L'Index",
  },
  description:
    "Catalogue de plugins Claude : agents, skills et commandes, organisés par discipline.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}
