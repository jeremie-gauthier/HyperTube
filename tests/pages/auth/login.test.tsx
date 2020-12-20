import React from "react";
import Login from "@/pages/auth/login";
import renderer from "react-test-renderer";

test("<Login /> should render correctly", () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});
