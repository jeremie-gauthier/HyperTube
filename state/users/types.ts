import { TUser } from "@/data/models/User";

export type UserActions = ActionSetLang;

export type UserData = TUser & {
  lang: string;
};

export type ActionSetLang = {
  type: "SET_LANG";
  payload: {
    lang: string;
  };
};
