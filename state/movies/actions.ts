import { ActionSetSearchInput, ActionSetSelectedCategory } from "./types";

export const SET_SEARCH_INPUT = "SET_SEARCH_INPUT";
export const setSearchInput = (searchInput: string): ActionSetSearchInput => ({
  type: SET_SEARCH_INPUT,
  payload: {
    searchInput,
  },
});

export const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";
export const setSelectedCategory = (
  selectedCategory: string | null,
): ActionSetSelectedCategory => ({
  type: SET_SELECTED_CATEGORY,
  payload: {
    selectedCategory,
  },
});
