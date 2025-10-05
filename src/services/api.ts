import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN as string;
// якщо раптом захочеш вернутись до v3:
const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    // Використовуємо v4 Bearer, якщо токен є
    ...(ACCESS_TOKEN
      ? { Authorization: `Bearer ${ACCESS_TOKEN}`, accept: "application/json" }
      : {}),
  },
  params: {
    // Якщо ACCESS_TOKEN не задано — fallback на v3 api_key
    ...(ACCESS_TOKEN ? {} : { api_key: API_KEY }),
    language: "en-US",
    include_adult: false,
  },
});

export interface FetchMoviesParams {
  query: string;
  page: number;
}

export async function fetchMovies({ query, page }: FetchMoviesParams) {
  if (!query.trim()) {
    const empty: MoviesResponse = {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
    return empty;
  }

  const { data } = await instance.get<MoviesResponse>("/search/movie", {
    params: { query, page },
  });

  return data;
}
