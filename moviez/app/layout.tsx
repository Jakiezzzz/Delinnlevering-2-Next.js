import "./globals.css";
import Footer from "./components/footer";
import Header from "./components/header";

export const metadata = {
  title: "MOVIEZ",
  author: "Jakob Torgau",
  description: "A movie database built with Next.js",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
