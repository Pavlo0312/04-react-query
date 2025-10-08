import css from "./ErrorMessage.module.css";

type Props = {
  message?: string;
};

export default function ErrorMessage({ message }: Props) {
  return (
    <div className={css.error} role="alert">
      {message ?? "Something went wrong. Please try again."}
    </div>
  );
}
