import { UserActions, UserData } from "./types";

import { SET_LANG } from "./actions";

export const initialState: UserData = {
  id: 0,
  firstname: "",
  lastname: "",
  email: "",
  lang: "en",
};

export default function reducer(
  state: UserData,
  action: UserActions,
): UserData {
  switch (action.type) {
    case SET_LANG:
      return { ...state, lang: action.payload.lang };
    default:
      return state;
  }
}
