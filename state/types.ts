import { MovieData, MovieActions } from "./movies/types";

export type StoreContextActions = MovieActions;

export type StoreProviderProps = {
  children: React.ReactNode;
};

export type RootState = {
  movie: MovieData;
};

export type RootReducer = (
  state: RootState,
  action: StoreContextActions,
) => RootState;

export type RootContext = {
  state: RootState;
  dispatch: React.Dispatch<StoreContextActions>;
};
