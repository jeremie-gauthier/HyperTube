import React from "react";
import combineReducers from "react-combine-reducers";
import { useMediaQuery } from "react-responsive";
import { StoreProviderProps, RootReducer, RootContext } from "./types";
import userReducer, { initialState as userInitialState } from "./users/reducer";
import movieReducer, {
  initialState as movieInitialState,
} from "./movies/reducer";

const [rootReducer, initialState] = combineReducers<RootReducer>({
  user: [userReducer, userInitialState],
  movie: [movieReducer, movieInitialState],
});

export const StoreContext = React.createContext<RootContext>({
  state: initialState,
  dispatch: () => null,
  isTabletOrMobile: false,
});

export default function StoreProvider({
  children,
}: StoreProviderProps): JSX.Element {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const store = React.useMemo(() => ({ state, dispatch, isTabletOrMobile }), [
    state,
    isTabletOrMobile,
  ]);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
