export default function checkPassword({ password }: { password: string }) {
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
  return {};
}
