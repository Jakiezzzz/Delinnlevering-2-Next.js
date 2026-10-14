import Link from "next/link";

// Style and Layout Ideas
// Style a movie carosel on top
// Show popular movies

// have movies float when hovered over

type MovieProps = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetails({ params }: MovieProps) {
  const { id } = await params;
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  const movie = await response.json();
  console.log("Movie Details:", movie);
  return (
    <div>
      <Link href="/movies">Go Back</Link>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} poster`}
        width={200}
        height={300}
      />
      <h1>Movie Details for {movie.title}</h1>
      <p>Release Date: {movie.release_date}</p>
      <p>{movie.overview}</p>
    </div>
  );
}
