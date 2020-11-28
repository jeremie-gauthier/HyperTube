import { TMovie } from "@/data/models/Movie";

export type MovieActions = ActionSetSearchInput;

export type MovieData = TMovie & {
  searchInput: string;
};

export type ActionSetSearchInput = {
  type: "SET_SEARCH_INPUT";
  payload: {
    searchInput: string;
  };
};
