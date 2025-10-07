// src/services/movieService.ts
import axios from "axios";
import type { Movie } from "../types/movie";

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    accept: "application/json",
  },
  params: {
    language: "en-US",
    include_adult: false,
  },
});

export async function searchMovies(
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
