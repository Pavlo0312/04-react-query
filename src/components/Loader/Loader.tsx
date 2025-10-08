import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.wrap} role="status" aria-live="polite">
      <div className={css.spinner} />
      <span className="visually-hidden">Loading…</span>
    </div>
  );
}
