import Link from "next/link";
import SearchBar from "../components/searchBar";
import MovieCard from "../components/movieCard";
import Pagination from "../components/pagination";

// tmdb fetch og dems funksjoner har nå blitt lagt til en egen ts fil, på denne måten må man ikke kjøre fetch hele tiden.
import { getPopularMovies, getGenres } from "@/types/tmdb";
import { Metadata } from "next";

export const metadata: Metadata = { title: "MOVIEZ - Movies" };

//Selve film oversikt siden som blir eksportert
export default async function Movies({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string; page?: string }>;
}) {
  const { genre, page } = await searchParams;
  const requestedPage = Number.parseInt(page ?? "1", 10) || 1;

  const [genres, { results: movies, page: currentPage, total_pages }] =
    await Promise.all([getGenres(), getPopularMovies(genre, requestedPage)]);

  return (
    <>
      <h1 className="pb-3">Explore our Movies</h1>
      <SearchBar />
      <div className="mt-5 flex flex-wrap gap-2.5">
        <Link
          href="/movies"
          aria-current={!genre ? "page" : undefined}
          className={`rounded-full px-4 py-1.5 font-bold transition-transform hover:-translate-y-0.5 ${!genre ? "glass-pill-active" : "glass-pill"}`}
        >
          Popular
        </Link>

        {genres.map((g) => {
          const isActive = genre === String(g.id);
          return (
            <Link
              key={g.id}
              href={`/movies?genre=${g.id}`}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-full px-4 py-1.5 font-bold transition-transform hover:-translate-y-0.5 ${genre === String(g.id) ? "glass-pill-active" : "glass-pill"}`}
            >
              {g.name}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <Pagination page={currentPage} totalPages={total_pages} genre={genre} />
    </>
  );
}
