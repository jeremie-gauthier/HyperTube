import { FormErrors } from "@/hooks/useForm";
import { TLoginForm } from "@/lib/types/login";
import { checkPassword, checkUsername } from "./checkers";

export default function loginResolver(
  values: TLoginForm,
): FormErrors<TLoginForm> {
  const checksRegister = [checkUsername, checkPassword];

  const errors = checksRegister.reduce(
    (err, fn) => ({ ...err, ...fn(values) }),
    {},
  ) as FormErrors<TLoginForm>;

  return errors;
}
