import { useState, FormEvent } from "react";
import css from "./SearchBar.module.css";

export interface SearchBarProps {
  onSearch: (value: string) => void;
  initialValue?: string;
}

export default function SearchBar({
  onSearch,
  initialValue = "",
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        placeholder="Search movies…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
