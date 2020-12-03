import { UserData, UserActions } from "./users/types";
import { MovieData, MovieActions } from "./movies/types";

export type StoreContextActions = UserActions | MovieActions;

export type StoreProviderProps = {
  children: React.ReactNode;
};

export type RootState = {
  user: UserData;
  movie: MovieData;
};

export type RootReducer = (
  state: RootState,
  action: StoreContextActions,
) => RootState;

export type RootContext = {
  state: RootState;
  dispatch: React.Dispatch<StoreContextActions>;
  isTabletOrMobile: boolean;
};
