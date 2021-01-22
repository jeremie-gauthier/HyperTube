import { User } from "@/types/user";
import isEmpty from "@ramda/isempty";

export default function checkEmail({ email }: Pick<User, "email">) {
  if (isEmpty(email)) {
    return { email: "common.forms.required" };
  }

  const emailRegex = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z0-9.]{2,}$/;
  if (emailRegex.test(email) === false) {
    return { email: "common.forms.email_format" };
  }
  return {};
}
