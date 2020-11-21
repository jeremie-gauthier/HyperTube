import * as helpers from "@/lib/helpers";
import user from "@/tests/__mocks__/user";

describe("helpers", () => {
  test("getInitials", () => {
    expect(helpers.getInitials(user)).toEqual("AD");
  });
});
