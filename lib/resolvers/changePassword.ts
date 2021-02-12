import { FormErrors } from "@/hooks/useForm";
import { ChangePasswordForm } from "@/lib/types/changePassword";
import isEmpty from "@ramda/isempty";
import { checkPassword, checkCmpPassword } from "./checkers";

export default function changePasswordResolver(
  values: ChangePasswordForm,
): FormErrors<ChangePasswordForm> {
  const checksRegister = [checkOldPassword, checkCmpPassword, checkPassword];

  const errors = checksRegister.reduce(
    (err, fn) => ({ ...err, ...fn(values) }),
    {},
  ) as FormErrors<ChangePasswordForm>;

  return errors;
}

function checkOldPassword({
  oldPassword,
}: Pick<ChangePasswordForm, "oldPassword">) {
  return isEmpty(oldPassword) ? { oldPassword: "common.forms.required" } : {};
}
