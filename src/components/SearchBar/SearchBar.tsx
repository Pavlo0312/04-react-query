// src/components/SearchBar/SearchBar.tsx
import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (value: string) => void;
  initialValue?: string;
}

export default function SearchBar({
  onSubmit,
  initialValue = "",
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = String(formData.get("query") || "").trim();
    if (!q) {
      toast.error("Please enter a search term");
      return;
    }
    onSubmit(q);
  };

  return (
    <header className={css.header}>
      <form className={css.form} action="#" onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          placeholder="Search movies..."
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
