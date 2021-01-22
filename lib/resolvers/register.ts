import { FormErrors } from "@/hooks/useForm";
import { RegisterForm } from "@/lib/types/register";
import isEmpty from "@ramda/isempty";
import { checkEmail, checkPassword, checkUsername } from "./checkers";

export default function loginResolver(
  values: RegisterForm,
): FormErrors<RegisterForm> {
  const checksRegister = [
    checkUsername,
    checkBothPassword,
    checkPassword,
    checkEmail,
    checkLastname,
    checkFirstname,
  ];

  const errors = checksRegister.reduce(
    (err, fn) => ({ ...err, ...fn(values) }),
    {},
  ) as FormErrors<RegisterForm>;

  return errors;
}

function checkBothPassword({
  password,
  cpassword,
}: {
  password: string;
  cpassword: string;
}) {
  return password === cpassword
    ? {}
    : {
        password: "common.forms.diff_pwd",
        cpassword: "common.forms.diff_pwd",
      };
}

function checkLastname({ lastname }: { lastname: string }) {
  return isEmpty(lastname.trim()) ? { lastname: "common.forms.required" } : {};
}

function checkFirstname({ firstname }: { firstname: string }) {
  return isEmpty(firstname.trim())
    ? { firstname: "common.forms.required" }
    : {};
}
