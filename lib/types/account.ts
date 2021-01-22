// import { UserForm } from "@/types/user";

import { TLangs } from "@/locales/i18n";

// type AccountFormFields = "username" | "firstname" | "lastname" | "language"

export type AccountForm = {
  username: string;
  lastname: string;
  firstname: string;
  language: TLangs;
};
