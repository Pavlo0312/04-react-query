import { instance } from "./api";
import type { Movie } from "../types/movie";

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(
  query: string,
  page: number
): Promise<MoviesResponse> {
  if (!query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }

  const { data } = await instance.get<MoviesResponse>("/search/movie", {
    params: { query, page },
  });

  return data;
}
