import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "MOVIEZ - Movies" };

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
  return (
    <>
      <Link
        href="/movies"
        className="glass-pill inline-block rounded-full px-5 py-2 font-bold transition-transform hover:-translate-y-0.5"
      >
        ← Go back
      </Link>

      <article className="glass-bar mt-6 flex flex-col gap-8 rounded-3xl p-6 sm:flex-row">
        {movie.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} poster`}
            width={500}
            height={750}
            preload
            className="h-auto w-full rounded-2xl shadow-lg shadow-black/30 sm:w-72"
          />
        )}
        <div>
          <h1 className="text-3xl font-extrabold">{movie.title}</h1>
          <p className="mt-1 font-bold text-ink-soft">
            Release date:{" "}
            <time dateTime={movie.release_date}>{movie.release_date}</time>
          </p>
          <p className="mt-5 max-w-prose leading-relaxed">{movie.overview}</p>
        </div>
      </article>
    </>
  );
}
