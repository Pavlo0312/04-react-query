import React from "react";
import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

// 🔹 інтерфейс з правильною назвою MovieGridProps
export interface MovieGridProps {
  items: Movie[];
  onSelect: (movie: Movie) => void; // 🔹 обовʼязковий проп
}

export default function MovieGrid({ items, onSelect }: MovieGridProps) {
  if (items.length === 0) {
    return <p className={css.empty}>No results</p>;
  }

  return (
    <ul className={css.grid}>
      {items.map((m) => (
        <li key={m.id} className={css.card} onClick={() => onSelect(m)}>
          <img
            src={
              m.poster_path
                ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
                : "https://placehold.co/300x450?text=No+Image"
            }
            alt={m.title}
            className={css.poster}
            loading="lazy"
          />
          <div className={css.meta}>
            <h3 className={css.title}>{m.title}</h3>
            <span className={css.rating}>⭐ {m.vote_average}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
