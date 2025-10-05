import React from "react";
import type { Movie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieGrid.module.css";

type Props = {
  movies: Movie[];
  onSelect?: (movie: Movie) => void;
};

export default function MovieGrid({ movies, onSelect }: Props) {
  if (!movies || movies.length === 0) {
    return <p className={css.empty}>No results</p>;
  }

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <MovieCard movie={movie} onClick={() => onSelect?.(movie)} />
        </li>
      ))}
    </ul>
  );
}
