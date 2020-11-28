import { ActionSetSearchInput } from "./types";

export const SET_SEARCH_INPUT = "SET_SEARCH_INPUT";
export const setSearchInput = (searchInput: string): ActionSetSearchInput => ({
  type: SET_SEARCH_INPUT,
  payload: {
    searchInput,
  },
});
