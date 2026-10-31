import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";

import { Nunito } from "next/font/google";

// Font for hele siden
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

// Importerer Metadata for riktig bruk av Metadata i Next
export const metadata: Metadata = {
  title: "MOVIEZ",
  authors: [{ name: "Jakob Torgau" }],
  description: "A movie database built with Next.js",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} font-sans antialiased`}>
        <Header />
        <main className="mx-auto max-w-6xl px-5 pt-4 pb-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
