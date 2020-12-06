import { FormErrors } from "@/hooks/useForm";
import { TFormValues } from "@/lib/types/login";

export default function loginResolver(
  values: TFormValues,
): FormErrors<TFormValues> {
  const errors: FormErrors<TFormValues> = {};

  if (values.username.length === 0) {
    errors.username = "common.forms.required";
  }

  if (values.password.length === 0) {
    errors.password = "common.forms.required";
  }

  return errors;
}
