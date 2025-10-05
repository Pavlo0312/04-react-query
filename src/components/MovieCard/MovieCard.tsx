import css from './MovieCard.module.css';
import type { Movie } from '../../types/movie';

export interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}
const IMG = 'https://image.tmdb.org/t/p/w342';

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const src = movie.poster_path ? `${IMG}${movie.poster_path}` : undefined;

  const handleClick = () => {
    onClick?.(movie);
  };

  return (
    <article
      className={css.card}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      {src ? (
        <img className={css.poster} src={src} alt={movie.title} />
      ) : (
        <div className={css.placeholder} aria-label="No poster" />
      )}
      <div className={css.meta}>
        <h3 className={css.title}>{movie.title}</h3>
        <p className={css.sub}>
          <span>{movie.release_date?.slice(0, 4) || '—'}</span>
          <span>•</span>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
        </p>
      </div>
    </article>
  );
}
