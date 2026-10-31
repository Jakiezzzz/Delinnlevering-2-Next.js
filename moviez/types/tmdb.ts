import { type Movie, type Genre, type MoviePage } from "../types/types";

//Definerer autorisasjon her for at den kan bli tatt imot i flere funksjoner
const headers = {
  Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
  accept: "application/json",
};

//Antall sider TMDB skal hente. Kan lett endres her med consten
const TMDB_MAX_PAGES = 500;

//Async funksjon som henter sjangere fra tmdb
//Revalidate
export async function getGenres(): Promise<Genre[]> {
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

//Async funksjon for å søke på filmer
export async function searchMovies(query: string): Promise<Movie[]> {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false`,
    { headers },
  );

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
}

//Async funkjson for å hente populære filmer.

// Henter en side med filmer fra TMDB.
// Uten sjanger hentes de mest populære filmene. Med sjanger hentes filmer
// i den sjangeren, sortert etter popularitet.
// Svaret caches i én time, og sidetallet holdes mellom 1 og 500.
export async function getPopularMovies(
  genre?: string,
  page = 1,
): Promise<MoviePage> {
  //Denne consten forhindrer at en side over 500 ikke crasher requesten.
  //TMDB kan bare hente 500 sider med filmer
  const safePage = Math.min(Math.max(1, page), TMDB_MAX_PAGES);

  const url = new URL(
    genre
      ? "https://api.themoviedb.org/3/discover/movie"
      : "https://api.themoviedb.org/3/movie/popular",
  );
  if (genre) {
    url.searchParams.set("with_genres", genre);
    url.searchParams.set("sort_by", "popularity.desc");
    url.searchParams.set("include_adult", "false");
  }
  url.searchParams.set("page", String(safePage));

  const response = await fetch(url, { headers, next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`TMDB request failed: ${response.status}`);
  const data = await response.json();

  return {
    results: data.results,
    page: data.page,
    total_pages: Math.min(data.total_pages, TMDB_MAX_PAGES),
  };
}

// Henter populære filmer til karusellen på forsiden
export async function getFeaturedMovies(count = 8): Promise<Movie[]> {
  const { results } = await getPopularMovies();
  return results.filter((movie) => movie.backdrop_path).slice(0, count);
}
