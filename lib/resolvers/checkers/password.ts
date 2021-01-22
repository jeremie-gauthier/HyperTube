import { User } from "@/types/user";
import isEmpty from "@ramda/isempty";

export default function checkPassword({ password }: Pick<User, "password">) {
  if (isEmpty(password)) {
    return { password: "common.forms.required" };
  }

  const pwdRegex = [/[a-z]/, /[A-Z]/, /\d/, /[\W_]/];
  if (
    password.length < 8 ||
    !pwdRegex.every((pattern) => pattern.test(password))
  ) {
    return { password: "common.forms.invalid_pwd" };
  }
  return {};
}
