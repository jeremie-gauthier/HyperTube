import { FormErrors } from "@/hooks/useForm";
import { TRegisterForm } from "@/lib/types/register";

export default function loginResolver(
  values: TRegisterForm,
): FormErrors<TRegisterForm> {
  const checksRegister = [
    checkUsername,
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

function checkUsername({ username }: { username: string }) {
  return username.trim().length === 0
    ? { username: "common.forms.required" }
    : {};
}

function checkPassword({
  password,
  cpassword,
}: {
  password: string;
  cpassword: string;
}) {
  const pwdRegex = [/[a-z]/, /[A-Z]/, /\d/, /[\W_]/];

  if (password.length === 0) {
    return { password: "common.forms.required" };
  }
  if (
    password.length < 8 ||
    !pwdRegex.every((pattern) => pattern.test(password))
  ) {
    return { password: "common.forms.invalid_pwd" };
  }
  if (password !== cpassword) {
    return {
      password: "common.forms.diff_pwd",
      cpassword: "common.forms.diff_pwd",
    };
  }
  return {};
}

function checkEmail({ email }: { email: string }) {
  const emailRegex = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (email.length === 0) {
    return { email: "common.forms.required" };
  }
  if (emailRegex.test(email) === false) {
    return { email: "common.forms.email_format" };
  }
  return {};
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
