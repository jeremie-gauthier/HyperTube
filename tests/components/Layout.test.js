import React from "react";
import Layout from "@/components/Layout";
import renderer from "react-test-renderer";

test("<Layout /> should render correctly", () => {
  const tree = renderer.create(<Layout />).toJSON();
  expect(tree).toMatchSnapshot();
});
