// src/services/movieService.ts
import axios from "axios";
import type { MoviesResponse } from "../types/movie";

// .env:
// VITE_TMDB_ACCESS_TOKEN=... (v4 read access token)
// VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
const BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL ?? "https://api.themoviedb.org/3";

const ACCESS =
  import.meta.env.VITE_TMDB_ACCESS_TOKEN ??
  import.meta.env.VITE_TMDB_API_KEY; // fallback, якщо раніше зберігав у цій змінній

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS}`,
    accept: "application/json",
  },
  params: {
    language: "en-US",
    include_adult: false,
  },
});

export const movieService = {
  async search(query: string, page = 1): Promise<MoviesResponse> {
    if (!query.trim()) {
      return { page: 1, results: [], total_pages: 0, total_results: 0 };
    }
    const { data } = await http.get<MoviesResponse>("/search/movie", {
      params: { query, page },
    });
    return data;
  },
};

// Опціонально: хелпер для картинок TMDB
export const getImageUrl = (
  path: string | null,
  size: "w500" | "original" = "w500"
) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : "");

export default movieService;
