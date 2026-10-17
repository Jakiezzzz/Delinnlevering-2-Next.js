export type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
};

export type Genre = {
  id: number;
  name: string;
};
