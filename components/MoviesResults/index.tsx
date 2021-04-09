import styles from "./MoviesResults.module.scss";

type MoviesResultsProps = {
  text: string;
};

export default function MoviesResults({ text }: MoviesResultsProps) {
  return <p className={styles.feedbackResults}>{text}</p>;
}
