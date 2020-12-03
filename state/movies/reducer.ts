import { MovieActions, MovieData } from "./types";

import { SET_SEARCH_INPUT } from "./actions";

export const initialState: MovieData = {
  id: 0,
  name: "",
  synopsis: "",
  searchInput: "",
};

export default function reducer(
  state: MovieData,
  action: MovieActions,
): MovieData {
  switch (action.type) {
    case SET_SEARCH_INPUT:
      return { ...state, searchInput: action.payload.searchInput };
    default:
      return state;
  }
}
