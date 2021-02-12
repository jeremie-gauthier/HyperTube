import { FormErrors } from "@/hooks/useForm";
import { ResetForm } from "@/lib/types/reset";
import { checkEmail } from "./checkers";

export default function resetResolver(
  values: ResetForm,
): FormErrors<ResetForm> {
  return checkEmail(values);
}
