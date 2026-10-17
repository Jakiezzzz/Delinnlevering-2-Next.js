import { searchMovies } from "@/types/tmdb";
import MovieCard from "../components/movieCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const movies = q ? await searchMovies(q) : [];

  return (
    <>
      <h1>Search Results for "{q}"</h1>
      <div>
        {q && movies.length === 0 && <p>No results...</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
}
