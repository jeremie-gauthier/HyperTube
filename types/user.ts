import { Document } from "mongoose";
import { TLangs } from "@/locales/i18n";

export type User = Document & {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  picture: number;
  language: TLangs;
};

export type UserForm = User & {
  cpassword: string;
  remember: boolean;
};
