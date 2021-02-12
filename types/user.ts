import { Document } from "mongoose";
import { Languages } from "@/locales/i18n";

export type User = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  picture: number;
  language: Languages;
};

export type MongoUser = Document & User;

export type UserForm = User & {
  cpassword: string;
  remember: boolean;
};
