import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Label from "@/components/Label";
import { FlexRow } from "@/components/Flex";
import { useTranslation } from "react-i18next";
import UpArrow from "../../public/icons/up-arrow.svg";
import styles from "./Label.module.scss";

export enum SortBy {
  RATINGS = "ratings",
  TITLES = "titles",
  VIEWS = "views",
  YEARS = "years",
}

export enum Order {
  ASCENDING = "asc",
  DESCENDING = "desc",
}

const getReverseOrder = (order: Order) =>
  order === Order.ASCENDING ? Order.DESCENDING : Order.ASCENDING;

export default function SortOptions({
  selectedSort,
}: {
  selectedSort: SortBy | null;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const SortOptionsList = Object.values(SortBy);
  const isCurrentSort = (sort: SortBy) => sort === selectedSort;
  const pathname = router.asPath.split("?")[0];
  const getLink = (sort: SortBy) =>
    `${pathname}?sort=${sort}&order=${
      isCurrentSort(sort)
        ? getReverseOrder((router.query.order ?? Order.DESCENDING) as Order)
        : Order.ASCENDING
    }`;

  return (
    <FlexRow className={styles.labelsList}>
      {SortOptionsList.map((sort, idx) => (
        <Link
          // eslint-disable-next-line react/no-array-index-key
          key={`${sort}-${idx}`}
          href={getLink(sort)}
          shallow
        >
          <a href={getLink(sort)}>
            <Label
              text={t(`models.movie.sort.${sort}`)}
              isActive={isCurrentSort(sort)}
              Icon={
                isCurrentSort(sort) ? (
                  <UpArrow
                    className={
                      router.query.order === Order.DESCENDING
                        ? "transform rotate-180"
                        : ""
                    }
                  />
                ) : null
              }
            />
          </a>
        </Link>
      ))}
    </FlexRow>
  );
}
