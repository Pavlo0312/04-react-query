import type { Movie } from "../../types/movie";
import css from "./MovieCard.module.css";

type Props = {
  item: Movie;
  onSelect: (m: Movie) => void;
};

export default function MovieCard({ item, onSelect }: Props) {
  const img = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : "";

  return (
    <article className={css.card} onClick={() => onSelect(item)}>
      <div className={css.poster}>
        {img ? (
          <img src={img} alt={item.title} loading="lazy" />
        ) : (
          /* порожній плейсхолдер — лишаємо сіре тло */
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              color: "#778",
            }}>
            No Image
          </span>
        )}
        <div className={css.titleBar}>{item.title}</div>
      </div>

      <div className={css.body}>
        <div className={css.meta}>
          <span>{item.release_date?.slice(0, 4) || "—"}</span>
          <span className={css.rating}>
            <span className={css.star}>★</span>
            {item.vote_average?.toFixed(1) ?? "—"}
          </span>
        </div>
      </div>
    </article>
  );
}
