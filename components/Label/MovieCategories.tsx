import { MovieCategory } from "@/types/movie";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Label from ".";
import { FlexRow } from "../Flex";
import styles from "./Label.module.scss";

export default function MovieCategories({
  selectedCategory,
}: {
  selectedCategory: MovieCategory | null;
}) {
  const { t } = useTranslation();
  const MovieCategoriesList = Object.values(MovieCategory);
  const isCurrentCategory = (category: MovieCategory) =>
    category === selectedCategory;
  const getLink = (category: MovieCategory) =>
    isCurrentCategory(category) ? `/movies` : `/movies/categories/${category}`;

  return (
    <FlexRow className={styles.labelsList}>
      {MovieCategoriesList.map((category, idx) => (
        <Link
          // eslint-disable-next-line react/no-array-index-key
          key={`${category}-${idx}`}
          href={getLink(category)}
        >
          <a href={getLink(category)}>
            <Label
              text={t(`models.movie.category.${category}`)}
              isActive={isCurrentCategory(category)}
            />
          </a>
        </Link>
      ))}
    </FlexRow>
  );
}
