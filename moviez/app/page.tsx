import Link from "next/link";

export default function Homepage() {
  return (
    <>
      <h1 className="pb-3">Welcome to Moviez!</h1>
      <p>
        Moviez is a site dedicated for users to Discover and search for movies.
      </p>
      <p>
        Discover currently trending movies by visiting the{" "}
        <Link href="/movies" className="font-extrabold cursor-pointer">
          Movies
        </Link>{" "}
        page!
      </p>
      <p>
        Search by genre or use the search bar on top to look for your desired
        movie!
      </p>
      <p>Click on the movie to get a short overview and release date.</p>
    </>
  );
}
