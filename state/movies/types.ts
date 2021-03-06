export type MovieActions = ActionSetSearchInput;

export type MovieData = {
  searchInput: string;
};

export type ActionSetSearchInput = {
  type: "SET_SEARCH_INPUT";
  payload: {
    searchInput: string;
  };
};
