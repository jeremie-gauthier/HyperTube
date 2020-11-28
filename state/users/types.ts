import { TLang } from "@/locales/i18n";
import { TUser } from "@/data/models/User";

export type UserActions = ActionSetLang;

export type UserData = TUser & {
  lang: TLang;
};

export type ActionSetLang = {
  type: "SET_LANG";
  payload: {
    lang: TLang;
  };
};