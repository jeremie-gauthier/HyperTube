import React from "react";
import Checkbox from "@/components/Checkbox";
import renderer from "react-test-renderer";

test("<Checkbox /> should render correctly", () => {
  const tree = renderer.create(<Checkbox label="oui" name="yesno" />).toJSON();
  expect(tree).toMatchSnapshot();
});
