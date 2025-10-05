import { useEffect } from 'react';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

const IMG = 'https://image.tmdb.org/t/p/w780';

export interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  // закриття по ESC
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    // блокування скролу фону
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', h);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  const src = movie.poster_path ? `${IMG}${movie.poster_path}` : undefined;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className={css.close} onClick={onClose} aria-label="Close">✕</button>

        {src ? (
          <img className={css.poster} src={src} alt={movie.title} />
        ) : (
          <div className={css.posterPlaceholder} />
        )}

        <div className={css.content}>
          <h2 className={css.title}>{movie.title}</h2>
          <p className={css.overview}>{movie.overview || 'No overview available.'}</p>

          <ul className={css.facts}>
            <li><strong>Release Date:</strong> {movie.release_date || '—'}</li>
            <li><strong>Rating:</strong> {movie.vote_average?.toFixed(1) ?? '—'}/10</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
