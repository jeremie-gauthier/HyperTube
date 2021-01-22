import { FormErrors } from "@/hooks/useForm";
import { LoginForm } from "@/lib/types/login";
import { checkPassword, checkUsername } from "./checkers";

export default function loginResolver(
  values: LoginForm,
): FormErrors<LoginForm> {
  const checksRegister = [checkUsername, checkPassword];

  const errors = checksRegister.reduce(
    (err, fn) => ({ ...err, ...fn(values) }),
    {},
  ) as FormErrors<LoginForm>;

  return errors;
}
