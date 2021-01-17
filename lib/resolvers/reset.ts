import { FormErrors } from "@/hooks/useForm";
import { TResetForm } from "@/lib/types/reset";
import { checkEmail } from "./checkers";

export default function resetResolver(
  values: TResetForm,
): FormErrors<TResetForm> {
  return checkEmail(values);
}
