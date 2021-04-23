/* eslint-disable max-lines-per-function */
import React from "react";
import { useRouter } from "next/router";
import { Order, SortBy } from "@/components/Label/SortOptions";
import { Movie } from "@/types/movie";
import usePrevious from "./usePrevious";

export default function useMovieSort(movies: Movie[]) {
  const { query } = useRouter();
  const prevMovies = usePrevious(movies);
  const prevSort = usePrevious(query.sort);
  const prevOrder = usePrevious(query.order);
  const [sortedMovies, setSortedMovies] = React.useState(movies);

  React.useEffect(() => {
    const sortOnQueryChange = () => {
      const movieSort = (predicate: (a: Movie, b: Movie) => number) =>
        immutableSort(
          predicate,
          (query.order as Order) ?? Order.ASCENDING,
          movies,
        );

      switch (query.sort) {
        case SortBy.RATINGS:
          return movieSort(
            (a, b) => parseFloat(a.rating ?? "0") - parseFloat(b.rating ?? "0"),
          );
        case SortBy.TITLES:
          return movieSort((a, b) => a.title.localeCompare(b.title));
        case SortBy.VIEWS:
          return movieSort(
            (a, b) => (a.nbDownloads ?? 0) - (b.nbDownloads ?? 0),
          );
        case SortBy.YEARS:
          return movieSort(
            (a, b) => parseInt(a.year ?? "0", 10) - parseInt(b.year ?? "0", 10),
          );
        default:
          return movies;
      }
    };

    console.log(query.sort);
    if (
      !deepCmp(movies, prevMovies ?? []) ||
      prevSort !== query.sort ||
      prevOrder !== query.order
    ) {
      console.log(query.sort, ">>> OK");
      const sortingList = sortOnQueryChange();
      console.log(sortingList);
      setSortedMovies(sortingList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies, query.sort, query.order]);

  return sortedMovies;
}

const immutableSort = (
  predicate: (a: Movie, b: Movie) => number,
  order: Order,
  movies: Movie[],
) =>
  order === Order.ASCENDING
    ? [...movies].sort(predicate)
    : [...movies].sort(predicate).reverse();

const deepCmp = (a: Movie[], b: Movie[]) =>
  a.length === b?.length && JSON.stringify(a) === JSON.stringify(b);
