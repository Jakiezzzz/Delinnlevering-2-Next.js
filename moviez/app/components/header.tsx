import Link from "next/link";

export default function Header() {
  return (
    <nav>
      <header>
        <Link href="/">Home</Link>
        <Link href="/movies">Movies</Link>
        <Link href="/about">About</Link>
      </header>
    </nav>
  );
}
