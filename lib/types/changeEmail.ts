import { UserForm } from "@/types/user";

type ChangeEmailFormFields = "password" | "email";

export type ChangeEmailForm = Pick<UserForm, ChangeEmailFormFields>;
