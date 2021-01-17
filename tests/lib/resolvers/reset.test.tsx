import resolver from "@/lib/resolvers/reset";

describe("resetResolver", () => {
  const formValues = {
    email: "hulk@avengers.com",
  };

  test("successful", () => {
    expect(resolver(formValues)).toEqual({});
  });

  test("email error", () => {
    expect(resolver({ ...formValues, email: "" })).toEqual({
      email: "common.forms.required",
    });
    expect(resolver({ ...formValues, email: "HuLk@shire.l" })).toEqual({
      email: "common.forms.email_format",
    });
  });
});
