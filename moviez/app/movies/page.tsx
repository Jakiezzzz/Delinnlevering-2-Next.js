import Image from "next/image";

type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
};

async function getPopularMovies(): Promise<Movie[]> {
  const response = await fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
}

export default async function Movies() {
  const movies = await getPopularMovies();

  return (
    <>
      <div className="">Test</div>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                width={200}
                height={300}
                loading="eager"
              />
            ) : (
              <div />
            )}
            <p>
              {movie.title} ({movie.release_date?.slice(0, 4)})
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
