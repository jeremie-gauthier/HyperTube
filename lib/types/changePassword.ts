import { UserForm } from "@/types/user";

type PwdKeys = "password" | "cpassword";

export type ChangePasswordForm = Pick<UserForm, PwdKeys> & {
  oldPassword: string;
};
