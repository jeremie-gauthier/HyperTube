import * as helpers from "@/lib/helpers";
import user from "@/tests/__mocks__/user";

test("requiredField", () => {
  expect(helpers.requiredField("hello")).toEqual("hello*");
});
