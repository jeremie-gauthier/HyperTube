import resolver from "@/lib/resolvers/login";

describe("loginResolver", () => {
  const formValues = {
    username: "HomerSimpsons",
    password: "@dumbH0m3R",
    remember: true,
  };

  test("successful", () => {
    expect(resolver(formValues)).toEqual({});
  });

  test("username error", () => {
    expect(resolver({ ...formValues, username: "" })).toEqual({
      username: "common.forms.required",
    });
  });

  test("password error", () => {
    expect(resolver({ ...formValues, password: "" })).toEqual({
      password: "common.forms.required",
    });
    expect(resolver({ ...formValues, password: "too_simple" })).toEqual({
      password: "common.forms.invalid_pwd",
    });
  });

  test("all errors", () => {
    expect(resolver({ ...formValues, username: "", password: "" })).toEqual({
      username: "common.forms.required",
      password: "common.forms.required",
    });
  });
});
