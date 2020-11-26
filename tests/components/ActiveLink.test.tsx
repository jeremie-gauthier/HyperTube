import React from "react";
import ActiveLink from "@/components/ActiveLink";
import renderer from "react-test-renderer";

describe("ActiveLink", () => {
  test("<ActiveLink /> should render correctly when active", () => {
    const tree = renderer
      .create(<ActiveLink href="/">Home</ActiveLink>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("<ActiveLink /> should render correctly when inactive", () => {
    const tree = renderer
      .create(<ActiveLink href="/movies">Home</ActiveLink>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
