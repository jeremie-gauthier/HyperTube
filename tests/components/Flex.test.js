import React from "react";
import { FlexCol, FlexRow } from "@/components/Flex";
import renderer from "react-test-renderer";

test("<FlexCol /> should render correctly", () => {
  const tree = renderer.create(<FlexCol />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("<FlexRow /> should render correctly", () => {
  const tree = renderer.create(<FlexRow />).toJSON();
  expect(tree).toMatchSnapshot();
});
