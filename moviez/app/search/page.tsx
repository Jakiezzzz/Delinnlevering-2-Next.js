type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
};

async function searchMovies(query: string): Promise<Movie[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
}

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

        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.title} ({movie.release_date?.slice(0, 4)})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
