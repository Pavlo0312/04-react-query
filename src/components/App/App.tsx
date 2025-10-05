import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import SearchBar from "../SearchBar/SearchBar";
import MovieCard from "../MovieCard/MovieCard";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/api";
import type { Movie, MoviesResponse } from "../../types/movie";
import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Movie | null>(null);

  const { data, isFetching, isError, error, isPlaceholderData } =
    useQuery<MoviesResponse>({
      queryKey: ["movies", query, page],
      queryFn: () => fetchMovies({ query, page }),
      enabled: query.trim().length > 0,
      placeholderData: (prev) => prev,
      staleTime: 0,
    });

  const totalPages = data?.total_pages ?? 0;
  const results = data?.results ?? [];

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
    setSelected(null);
  };

  return (
    <div className={css.wrapper}>
      <p className={css.badge}>Powered by TMDB</p>
      <SearchBar onSubmit={handleSearch} />

      {isError && (
        <p role="alert" className={css.state}>
          {(error as Error)?.message || "Something went wrong"}
        </p>
      )}

      {!query && <p className={css.state}>Enter a query to search movies.</p>}

      {query && isFetching && isPlaceholderData && (
        <p className={css.state}>Loading…</p>
      )}

      {query && !isFetching && results.length === 0 && (
        <p className={css.state}>No results found.</p>
      )}

      {results.length > 0 && (
        <ul className={css.grid}>
          {results.map((m: Movie) => (
            <li key={m.id}>
              <MovieCard movie={m} onClick={setSelected} />
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {selected && (
        <MovieModal movie={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
