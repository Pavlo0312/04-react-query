import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const token =
  import.meta.env.VITE_TMDB_ACCESS_TOKEN ??
  import.meta.env.VITE_TMDB_API_KEY; // на випадок, якщо ти зберіг токен у цій змінній

const instance = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${token}`,
    accept: "application/json",
  },
  params: {
    language: "en-US",
    include_adult: false,
  },
});

export async function fetchMovies(query: string, page = 1): Promise<MoviesResponse> {
  if (!query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
  const { data } = await instance.get<MoviesResponse>("/search/movie", {
    params: { query, page },
  });
  return data;
}
