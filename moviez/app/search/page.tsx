import { searchMovies } from "@/types/tmdb";
import MovieCard from "../components/movieCard";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = { title: "MOVIEZ - Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const movies = q ? await searchMovies(q) : [];

  return (
    <>
      <h1 className="font-extrabold">
        {q ? <>Search results for &quot;{q}&quot;</> : "Search for a movie"}
      </h1>
      <Link
        href="/movies"
        className="glass-pill inline-block rounded-full px-5 py-2 font-bold transition-transform hover:-translate-y-0.5"
      >
        ← Go back
      </Link>
      <div className="mt-6">
        {q && movies.length === 0 && (
          <p className="font-bold text-ink-soft">No results found.</p>
        )}

        <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}
