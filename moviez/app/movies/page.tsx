// Style and Layout Ideas //

// Style a movie carosel on top

// have movies float when hovered over

import Link from "next/link";
import SearchBar from "../components/searchBar";
import MovieCard from "../components/movieCard";

// tmdb fetch og dems funksjoner har nå blitt lagt til en egen ts fil, på denne måten må man ikke kjøre fetch hele tiden.
import { getPopularMovies } from "@/types/tmdb";
import { getGenres } from "@/types/tmdb";

//Selve film oversikt siden som blir eksportert
export default async function Movies({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) {
  const { genre } = await searchParams;
  const [genres, movies] = await Promise.all([
    getGenres(),
    getPopularMovies(genre),
  ]);

  return (
    <>
      <SearchBar />
      <div className="mt-5 flex flex-wrap gap-2.5">
        <Link
          href="/movies"
          className={`rounded-full px-4 py-1.5 font-bold transition-transform hover:-translate-y-0.5 ${!genre ? "glass-pill-active" : "glass-pill"}`}
        >
          All
        </Link>

        {genres.map((g) => (
          <Link
            key={g.id}
            href={`/movies?genre=${g.id}`}
            className={`rounded-full px-4 py-1.5 font-bold transition-transform hover:-translate-y-0.5 ${genre === String(g.id) ? "glass-pill-active" : "glass-pill"}`}
          >
            {g.name}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
