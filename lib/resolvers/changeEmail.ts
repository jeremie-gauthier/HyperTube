import { FormErrors } from "@/hooks/useForm";
import { ChangeEmailForm } from "@/lib/types/changeEmail";
import { checkPassword, checkEmail } from "./checkers";

export default function changePasswordResolver(
  values: ChangeEmailForm,
): FormErrors<ChangeEmailForm> {
  const checksRegister = [checkPassword, checkEmail];

  const errors = checksRegister.reduce(
    (err, fn) => ({ ...err, ...fn(values) }),
    {},
  ) as FormErrors<ChangeEmailForm>;

  return errors;
}
