// src/components/App/App.tsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import movieService from "../../services/movieService"; // у ньому є method `search`
import type { Movie, MoviesResponse } from "../../types/movie";

import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Movie | null>(null);

  const { data, isFetching, isError } = useQuery<MoviesResponse>({
    queryKey: ["movies", query, page],
    queryFn: () => movieService.search(query, page), // <- тут!
    enabled: query.trim().length > 0,
    placeholderData: (prev) => prev,
    staleTime: 0,
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handlePageChange = (e: { selected: number }) => {
    setPage(e.selected + 1);
  };

  return (
    <div className={css.container}>
      <p className={css.brand}>Powered by TMDB</p>

      {/* SearchBar без value — лише колбек */}
      <SearchBar onSearch={handleSearch} />

      {isError && (
        <ErrorMessage message="Не вдалося завантажити фільми. Спробуйте ще раз." />
      )}

      {isFetching && <Loader />}

      {!isFetching && query.trim() !== "" && movies.length === 0 && (
        <ErrorMessage message="Нічого не знайдено." />
      )}

      {/* movies замість items */}
      <MovieGrid movies={movies} onSelect={setSelected} />

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
