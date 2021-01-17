export default function checkEmail({ email }: { email: string }) {
  const emailRegex = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z0-9.]{2,}$/;

  if (email.length === 0) {
    return { email: "common.forms.required" };
  }
  if (emailRegex.test(email) === false) {
    return { email: "common.forms.email_format" };
  }
  return {};
}
