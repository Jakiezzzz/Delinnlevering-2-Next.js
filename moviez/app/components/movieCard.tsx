import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/types/types";

export default function movieCard({ movie }: { movie: Movie }) {
  return (
    <div>
      <Link href={`/movies/${movie.id}`}>
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
      </Link>
    </div>
  );
}
