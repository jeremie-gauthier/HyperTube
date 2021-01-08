import resolver from "@/lib/resolvers/register";

const formValues = {
  username: "H0bbit",
  password: "IH@veTheR1ng!",
  cpassword: "IH@veTheR1ng!",
  firstname: "Frodo",
  lastname: "Baggins",
  email: "Frodo.Baggins@student.42.fr",
};

test("valid register form", () => {
  expect(resolver(formValues)).toEqual({});
});

test("username error", () => {
  expect(resolver({ ...formValues, username: "" })).toEqual({
    username: "common.forms.required",
  });
  expect(resolver({ ...formValues, username: "\t\n   " })).toEqual({
    username: "common.forms.required",
  });
});

test("firstname error", () => {
  expect(resolver({ ...formValues, firstname: "" })).toEqual({
    firstname: "common.forms.required",
  });
  expect(resolver({ ...formValues, firstname: "\r\v  " })).toEqual({
    firstname: "common.forms.required",
  });
});

test("email error", () => {
  expect(resolver({ ...formValues, email: "" })).toEqual({
    email: "common.forms.required",
  });
  expect(resolver({ ...formValues, email: "frodo@shire.l" })).toEqual({
    email: "common.forms.email_format",
  });
});

test("lastname error", () => {
  expect(resolver({ ...formValues, lastname: "" })).toEqual({
    lastname: "common.forms.required",
  });
  expect(resolver({ ...formValues, lastname: "    \t   " })).toEqual({
    lastname: "common.forms.required",
  });
});

test("password error", () => {
  expect(resolver({ ...formValues, password: "" })).toEqual({
    password: "common.forms.required",
  });
  expect(resolver({ ...formValues, password: "A7@1234" })).toEqual({
    password: "common.forms.invalid_pwd",
  });
});

test("passwords doesn't match", () => {
  expect(resolver({ ...formValues, cpassword: "" })).toEqual({
    password: "common.forms.diff_pwd",
    cpassword: "common.forms.diff_pwd",
  });
});

test("multiple errors", () => {
  expect(resolver({ ...formValues, username: "", password: "" })).toEqual({
    username: "common.forms.required",
    password: "common.forms.required",
  });
});
