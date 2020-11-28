import React from "react";
import ActiveLink from "@/components/ActiveLink";
import renderer from "react-test-renderer";

describe("ActiveLink", () => {
  test("<ActiveLink /> should render correctly", () => {
    const tree = renderer
      .create(<ActiveLink href="/">Home</ActiveLink>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
