import React from "react";
import combineReducers from "react-combine-reducers";
import { StoreProviderProps, RootReducer, RootContext } from "./types";
import movieReducer, {
  initialState as movieInitialState,
} from "./movies/reducer";

const [rootReducer, initialState] = combineReducers<RootReducer>({
  movie: [movieReducer, movieInitialState],
});

export const StoreContext = React.createContext<RootContext>({
  state: initialState,
  dispatch: () => null,
});

export default function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = React.useReducer(rootReducer, initialState);
  const store = React.useMemo(() => ({ state, dispatch }), [state]);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
