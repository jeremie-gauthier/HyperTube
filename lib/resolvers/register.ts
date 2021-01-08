import { FormErrors } from "@/hooks/useForm";
import { TRegisterForm } from "@/lib/types/register";
import { checkEmail, checkPassword } from "./checkers";

export default function loginResolver(
  values: TRegisterForm,
): FormErrors<TRegisterForm> {
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
  ) as FormErrors<TRegisterForm>;

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

function checkUsername({ username }: { username: string }) {
  return username.trim().length === 0
    ? { username: "common.forms.required" }
    : {};
}

function checkLastname({ lastname }: { lastname: string }) {
  return lastname.trim().length === 0
    ? { lastname: "common.forms.required" }
    : {};
}

function checkFirstname({ firstname }: { firstname: string }) {
  return firstname.trim().length === 0
    ? { firstname: "common.forms.required" }
    : {};
}
