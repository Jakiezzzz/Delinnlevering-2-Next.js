import Link from "next/link";

export default function Header() {
  return (
    <header className="mx-auto max-w-6xl px-5 pt-5">
      <nav className="glass-bar flex flex-wrap items-center gap-3 rounded-full px-6 py-3.5">
        <Link href="/" className="text-2xl font-extrabold">
          Home
        </Link>
        <Link
          href="/movies"
          className="glass-pill rounded-full px-4 py-1.5 font-bold transition-transform hover:-translate-y-0.5"
        >
          Movies
        </Link>
        <Link
          href="/about"
          className="glass-pill rounded-full px-4 py-1.5 font-bold transition-transform hover:-translate-y-0.5"
        >
          About
        </Link>
      </nav>
    </header>
  );
}
