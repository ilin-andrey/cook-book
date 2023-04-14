import { Inter } from "@next/font/google";

import { Content } from "~/components/Content";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const navigation = [
  { name: "Home", href: "/" },
  { name: "Dishes", href: "/dishes" },
  { name: "Ingredients", href: "/ingredients" },
  { name: "Recipes", href: "/recipes" },
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
          <Header items={navigation} />
          <Content>{children}</Content>
          <Footer />
        </div>
      </body>
    </html>
  );
}
