import { type Movie, type Genre } from "../types/types";

//Definerer autorisasjon her for at den kan bli tatt imot i flere funksjoner
const headers = {
  Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
  accept: "application/json",
};

//Async funksjon som henter sjangere fra tmdb
// Revalidate
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

//Async funkjson for å hente populære filmer. (Henter populære filmer siden det hadde vært for my å vise all filmer på en gang)
//Genre er valgfritt og kan kjøres uten genre og bare henter populære filmer.
//Returnerer et film array
export async function getPopularMovies(genre?: string): Promise<Movie[]> {
  const url = genre
    ? `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&sort_by=popularity.desc&include_adult=false`
    : "https://api.themoviedb.org/3/movie/popular";

  const response = await fetch(url, { headers, next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`TMDB request failed: ${response.status}`);
  const data = await response.json();
  return data.results;
}
