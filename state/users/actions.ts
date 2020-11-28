import { TLang } from "@/locales/i18n";
import { ActionSetLang } from "./types";

export const SET_LANG = "SET_LANG";
export const setLang = (lang: TLang): ActionSetLang => ({
  type: SET_LANG,
  payload: {
    lang,
  },
});
