import { UserForm } from "@/types/user";

type RegisterFormFields =
  | "username"
  | "firstname"
  | "lastname"
  | "email"
  | "password"
  | "cpassword";

export type RegisterForm = Pick<UserForm, RegisterFormFields>;
