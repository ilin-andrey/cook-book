import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Content } from "~/components/Content";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { ROUTES } from "~/core/routes";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const NAVIGATION = [
  { name: "Home", href: ROUTES.ROOT },
  { name: "Dishes", href: ROUTES.DISHES },
  { name: "Ingredients", href: ROUTES.INGREDIENTS },
  { name: "Recipes", href: ROUTES.RECIPES },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="flex flex-col min-h-screen">
          <Header items={NAVIGATION} />
          <Content>{children}</Content>
          <Footer />
        </div>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Cook Book",
  description: "Cook Book",
  icons: "/favicon.ico",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
} 