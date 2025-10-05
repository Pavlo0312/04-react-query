import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchBar from "../SearchBar/SearchBar";
import MovieModal from "../MovieModal/MovieModal";

import { fetchMovies } from "../../services/api";
import type { Movie, MoviesResponse } from "../../types/movie";

import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Movie | null>(null);

  const { data, isFetching, isError, error } = useQuery<MoviesResponse>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
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

  const handlePageChange = (item: { selected: number }) => {
    setPage(item.selected + 1);
  };

  return (
    <div className={css.app}>
      <SearchBar onSearch={handleSearch} />

      {isError && (
        <ErrorMessage message={(error as Error)?.message ?? "Error"} />
      )}

      {isFetching ? (
        <Loader />
      ) : (
        <MovieGrid movies={movies} onSelect={(m) => setSelected(m)} />
      )}

      {totalPages > 1 && (
        <ReactPaginate
          containerClassName={css.pagination}
          pageClassName={css.page}
          activeClassName={css.active}
          previousLabel="«"
          nextLabel="»"
          breakLabel="…"
          onPageChange={handlePageChange}
          forcePage={page - 1}
          pageCount={Math.min(totalPages, 500)}
        />
      )}

      {selected && (
        <MovieModal movie={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
