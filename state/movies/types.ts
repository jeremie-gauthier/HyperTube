export type MovieActions = ActionSetSearchInput | ActionSetSelectedCategory;

export type MovieData = {
  searchInput: string;
  selectedCategory: string | null;
};

export type ActionSetSearchInput = {
  type: "SET_SEARCH_INPUT";
  payload: {
    searchInput: string;
  };
};

export type ActionSetSelectedCategory = {
  type: "SET_SELECTED_CATEGORY";
  payload: {
    selectedCategory: string | null;
  };
};
