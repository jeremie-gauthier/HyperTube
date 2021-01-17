import * as helpers from "@/lib/helpers";
import user from "@/tests/__mocks__/user";

test("getInitials", () => {
  expect(helpers.getInitials(user)).toEqual("AD");
});
