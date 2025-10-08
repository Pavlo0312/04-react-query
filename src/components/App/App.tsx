// src/components/App/App.tsx
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { Toaster, toast } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { fetchMovies, type MoviesResponse } from "../../services/movieService";

import type { Movie } from "../../types/movie";
import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selected, setSelected] = useState<Movie | null>(null);

  const { data, isLoading, isError, error, isSuccess } =
    useQuery<MoviesResponse>({
      queryKey: ["movies", query, page],
      queryFn: () => fetchMovies(query, page),
      enabled: query.trim().length > 0,
      placeholderData: (prev) => prev,
      staleTime: 0,
    });

  useEffect(() => {
    if (isSuccess && data && data.total_results === 0) {
      toast("No movies found");
    }
  }, [isSuccess, data]);

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  const handleSubmit = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handleSelect = (movie: Movie) => setSelected(movie);

  const handlePageChange = (evt: { selected: number }) => {
    setPage(evt.selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={css.app}>
      <Toaster position="top-right" />

      {/* Використовуємо ТІЛЬКИ onSubmit */}
      <SearchBar onSubmit={handleSubmit} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage message={(error as Error)?.message} />}

      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}

      {totalPages > 1 && (
        <div className={css.paginationWrap}>
          <ReactPaginate
            pageCount={totalPages}
            forcePage={page - 1}
            onPageChange={handlePageChange}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            previousLabel="‹"
            nextLabel="›"
            breakLabel="…"
            containerClassName={css.pagination}
            activeClassName={css.active}
            disabledClassName={css.disabled}
          />
        </div>
      )}

      {selected && (
        <MovieModal movie={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
