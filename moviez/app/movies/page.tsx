// Style and Layout Ideas //

// Style a movie carosel on top
// Show popular movies
// Shadows
// Gradients

// have movies float when hovered over
// Nintendo Wii UI style
// Search Bar
// Sort movies by genre on top

import Image from "next/image";
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
      <div className="flex flex-wrap gap-2">
        <Link
          href="/movies"
          className={`rounded-full border px-4 py-1 ${!genre ? "bg-black text-white" : ""}`}
        >
          All
        </Link>

        {genres.map((g) => (
          <Link
            key={g.id}
            href={`/movies?genre=${g.id}`}
            className={`rounded-full border px-4 py-1 ${
              genre === String(g.id) ? "bg-black text-white" : ""
            }`}
          >
            {g.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
