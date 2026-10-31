import Link from "next/link";
import { getFeaturedMovies } from "@/types/tmdb";
import MovieCarousel from "./components/movieCarousel";

export default async function Homepage() {
  const featured = await getFeaturedMovies();
  return (
    <>
      <MovieCarousel movies={featured}>
        <h1 className="pt-3 pb-3">Welcome to Moviez!</h1>
        <p>A site dedicated for users to Discover and search for movies.</p>
      </MovieCarousel>

      <div className="text-center pt-3 text-xl">
        <p>
          Discover currently trending movies by visiting the{" "}
          <Link href="/movies" className="font-extrabold">
            Movies
          </Link>{" "}
          page!
        </p>
        <p>
          Search by genre or use the search bar on top to look for your desired
          movie!
        </p>
        <p>Click on the movie to get a short overview and release date.</p>
      </div>
    </>
  );
}
