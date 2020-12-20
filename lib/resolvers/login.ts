import { FormErrors } from "@/hooks/useForm";
import { TLoginForm } from "@/lib/types/login";

export default function loginResolver(
  values: TLoginForm,
): FormErrors<TLoginForm> {
  const errors: FormErrors<TLoginForm> = {};

  if (values.username.length === 0) {
    errors.username = "common.forms.required";
  }

  if (values.password.length === 0) {
    errors.password = "common.forms.required";
  }

  return errors;
}
