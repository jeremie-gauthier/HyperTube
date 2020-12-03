import { ActionSetLang } from "./types";

export const SET_LANG = "SET_LANG";
export const setLang = (lang: string): ActionSetLang => ({
  type: SET_LANG,
  payload: {
    lang,
  },
});
