import { MovieCategory } from "@/types/movie";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Label from ".";
import { FlexRow } from "../Flex";
import styles from "./Label.module.scss";

export default function MovieCategories({
  selectedCategory,
}: {
  selectedCategory: string | null;
}) {
  const { t } = useTranslation();
  const MovieCategoriesList = Object.values(MovieCategory);

  return (
    <FlexRow className={styles.labelsList}>
      {MovieCategoriesList.map((category, idx) => (
        <Link
          // eslint-disable-next-line react/no-array-index-key
          key={`${category}-${idx}`}
          href={`/movies/categories/${category}`}
        >
          <a href={`/movies/categories/${category}`}>
            <Label
              text={t(`models.movie.category.${category}`)}
              isActive={category === selectedCategory}
            />
          </a>
        </Link>
      ))}
    </FlexRow>
  );
}
