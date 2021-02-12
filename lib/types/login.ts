import { UserForm } from "@/types/user";

type LoginFormFields = "username" | "password" | "remember";

export type LoginForm = Pick<UserForm, LoginFormFields>;
