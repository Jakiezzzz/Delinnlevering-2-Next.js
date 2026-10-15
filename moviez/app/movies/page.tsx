import Image from "next/image";
import Link from "next/link";
import SearchBar from "../components/searchBar";

// Style and Layout Ideas //

// Style a movie carosel on top
// Show popular movies
// Shadows
// Gradients

// have movies float when hovered over
// Nintendo Wii UI style
// Search Bar
// Sort movies by genre on top

type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
};

// Definerer Genre her sammen med film.
// Plannen var og ha det seperat først, men med å ha det samlet slipper man å rendere ting på nytt hele tiden på en seperat side
type Genre = {
  id: number;
  name: string;
};

//Definerer autorisasjon her nå for at den kan bli tatt imot i flere funksjoner
const headers = {
  Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
  accept: "application/json",
};

//Async funksjon som henter sjangere fra tmdb
// Revalidate
async function getGenres(): Promise<Genre[]> {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list",
    {
      headers,
      next: { revalidate: 86400 },
    },
  );
  if (!response.ok)
    throw new Error(`Genres request failed: ${response.status}`);
  const data = await response.json();
  return data.genres;
}

//Async funkjson for å hente populære filmer. (Henter populære filmer siden det hadde vært for my å vise all filmer på en gang)
//Genre er valgfritt og kan kjøres uten genre og bare henter populære filmer.
//Returnerer et film array
async function getPopularMovies(genre?: string): Promise<Movie[]> {
  const url = genre
    ? `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&sort_by=popularity.desc&include_adult=false`
    : "https://api.themoviedb.org/3/movie/popular";

  const response = await fetch(url, { headers, next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`TMDB request failed: ${response.status}`);
  const data = await response.json();
  return data.results;
}

//Selve film oversikt siden som blir eksportert
export default async function Movies({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) {
  const { genre } = await searchParams;
  const [genres, movies] = await Promise.all([
    getGenres(),
    getPopularMovies(genre),
  ]);

  return (
    <>
      <SearchBar />
      <div className="flex flex-wrap gap-2">
        <Link
          href="/movies"
          className={`rounded-full border px-4 py-1 ${!genre ? "bg-black text-white" : ""}`}
        >
          All
        </Link>

        {genres.map((g) => (
          <Link
            key={g.id}
            href={`/movies?genre=${g.id}`}
            className={`rounded-full border px-4 py-1 ${
              genre === String(g.id) ? "bg-black text-white" : ""
            }`}
          >
            {g.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <div key={movie.id}>
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
        ))}
      </div>
    </>
  );
}
