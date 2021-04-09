import { MovieActions, MovieData } from "./types";

import { SET_SEARCH_INPUT, SET_SELECTED_CATEGORY } from "./actions";

export const initialState: MovieData = {
  searchInput: "",
  selectedCategory: null,
};

export default function reducer(
  state: MovieData,
  action: MovieActions,
): MovieData {
  switch (action.type) {
    case SET_SEARCH_INPUT:
      return { ...state, searchInput: action.payload.searchInput };
    case SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.payload.selectedCategory };
    default:
      return state;
  }
}
