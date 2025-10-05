import { useState, type ChangeEvent, type FormEvent } from "react";
import css from "./SearchBar.module.css";

export interface SearchBarProps {
  initialQuery?: string;
  onSubmit: (value: string) => void;
}

export default function SearchBar({
  initialQuery = "",
  onSubmit,
}: SearchBarProps) {
  const [value, setValue] = useState(initialQuery);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value.trim());
  };
  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search movies">
      <input
        className={css.input}
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={handleChange}
        aria-label="Query"
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
