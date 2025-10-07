import React, { useEffect } from "react";
import { createPortal } from "react-dom"; // 🔹 портал
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot =
  document.getElementById("modal-root") ||
  (() => {
    const el = document.createElement("div");
    el.id = "modal-root";
    document.body.appendChild(el);
    return el;
  })();

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  // Escape + блокування скролу body
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const src = movie.backdrop_path // 🔹 використовуємо backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://placehold.co/780x439?text=No+Image";

  const modal = (
    <div className={css.backdrop} onClick={handleBackdrop}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.close} onClick={onClose} aria-label="Close">
          ×
        </button>
        <img className={css.image} src={src} alt={movie.title} />
        <div className={css.body}>
          <h2 className={css.title}>{movie.title}</h2>
          <p className={css.text}>{movie.overview}</p>
          <p className={css.meta}>
            <b>Release:</b> {movie.release_date} &nbsp;•&nbsp; <b>Rating:</b>{" "}
            {movie.vote_average}
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, modalRoot);
}
