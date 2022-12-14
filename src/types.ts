export interface IMovie {
  adult: boolean, 
  backdrop_path: string, 
  genre_ids: Array<number>, 
  genres: Array<IGenre>
  id: number,
  original_language: string,
  original_title: string,
  overview?: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
  tagline?: string;
  credits: {
    cast: [any],
    crew: [any]
  }
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IPagination {
	total: number;
	results: number;
};