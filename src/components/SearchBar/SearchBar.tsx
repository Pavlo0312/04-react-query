import { toast } from "react-hot-toast";
import css from "./SearchBar.module.css";

export interface SearchBarProps {
  /** Повертаємо значення пошуку в батьківський компонент */
  onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  // Вимога рев'ю: використовуємо form action з FormData
  const handleAction = (formData: FormData) => {
    const raw = (formData.get("query") as string | null) ?? "";
    const value = raw.trim();

    if (!value) {
      toast.error("Enter a search query");
      return;
    }

    onSubmit(value);
  };

  return (
    <header className={css.header}>
      {/* важливо: action саме функція */}
      <form className={css.form} action={handleAction}>
        <input
          className={css.input}
          type="text"
          name="query" /* <- обов’язкове ім’я для FormData */
          placeholder="Search movies..."
          autoComplete="off"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
