import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/types/types";
import TiltCard from "./tiltCard";

export default function movieCard({ movie }: { movie: Movie }) {
  return (
    <>
      <TiltCard>
        <Link
          href={`/movies/${movie.id}`}
          className="glass-tile block rounded-3xl p-2.5 transform-3d focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-aqua"
        >
          <div className="relative translate-z-6 overflow-hidden rounded-2xl shadow-lg shadow-black/30">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                width={500}
                height={750}
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
                className="h-auto w-full"
              />
            ) : (
              <div className="grid aspect-2/3 place-items-center bg-linear-to-br from-slate-200 to-slate-400 text-sm font-bold text-white">
                No poster
              </div>
            )}
            <div className="glare absolute inset-0 group-data-[live=true]:opacity-100" />
          </div>

          <div className="glass-panel mt-2.5 translate-z-12 rounded-2xl px-3.5 py-2">
            <p className="truncate font-extrabold text-ink">{movie.title}</p>
            <p className="text-sm font-bold text-ink-soft">
              {movie.release_date?.slice(0, 4)}
            </p>
          </div>
        </Link>
      </TiltCard>
    </>
  );
}
