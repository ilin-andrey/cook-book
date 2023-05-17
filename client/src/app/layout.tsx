import { Inter } from "@next/font/google";

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
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
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
