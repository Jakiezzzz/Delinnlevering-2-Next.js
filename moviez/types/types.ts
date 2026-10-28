import { ReactNode } from "react";

export type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path?: string | null;
};

// Children er for å ha text på toppen av carousel container
export type MovieCarouselProps = {
  movies: Movie[];
  children?: ReactNode;
};

export type Genre = {
  id: number;
  name: string;
};

export type MoviePage = {
  results: Movie[];
  page: number;
  total_pages: number;
};

export type PaginationProps = {
  page: number;
  totalPages: number;
  genre?: string;
};
