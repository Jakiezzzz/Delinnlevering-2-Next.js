import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "MOVIEZ - About us" };

export default function AboutPage() {
  return (
    <>
      <h1>About us</h1>
      <p>
        Moviez is made for people who want to discover and find movies easily,
        while also providing a unique style reminiscent of the Nintendo Wii and
        Playstation Vita home Menu.
      </p>
      <p>The site is created by Jakob Torgau</p>
      <p>
        Moviez uses the TMDB API (The Movie Database) to get all of it’s movies
        displayed on the website.
      </p>

      <h2>Sources:</h2>
      <h3>TMDB for the API and for the movie carousel inspiration:</h3>
      <Link
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://www.themoviedb.org
      </Link>
      <h3>CLAUDE AI for troubleshooting and styling directions:</h3>
      <Link href="https://claude.ai/" target="_blank" rel="noopener noreferrer">
        https://claude.ai/
      </Link>
    </>
  );
}
