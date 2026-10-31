// Film carousel som vises på homepagen

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { MovieCarouselProps } from "@/types/types";

// Tid mellom bilder
const INTERVAL = 5000;

export default function MovieCarousel({
  movies,
  children,
}: MovieCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = movies.length;

  useEffect(() => {
    if (count < 2) return;
    // Returnerer om brukere har redusert motion på
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearInterval(timer);
  }, [count]);

  // Hvis det er ingen filmer returner ingenting
  if (count === 0) return null;

  return (
    <section
      aria-roledescription="Movie Carousel"
      aria-label="Featured Films"
      className="glass-tile mx-auto max-w-4xl rounded-3xl p-2.5 "
    >
      <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg shadow-black/30 lg:aspect-21/9">
        {movies.map((movie, i) => (
          <Image
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            fill
            priority={i === 0}
            aria-hidden={i !== index}
            sizes="(min-width: 896px) 872px, 100vw"
            className={`object-cover transition-opacity duration-1000 motion-reduce:transition-none ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {children && (
          <div className="absolute inset-0 grid place-items-center bg-linear-to-t from-blue-500/60 to-blue-500/20 p-4 text-center text-white drop-shadow-lg">
            <div className="max-w-xl">{children}</div>
          </div>
        )}
      </div>
    </section>
  );
}
