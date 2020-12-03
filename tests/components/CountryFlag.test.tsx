import React from "react";
import CountryFlag from "@/components/CountryFlag";
import renderer from "react-test-renderer";

test("<CountryFlag /> should render the French Flag", () => {
  const tree = renderer.create(<CountryFlag lang="fr" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("<CountryFlag /> should render null", () => {
  const tree = renderer.create(<CountryFlag lang="wrong_value" />).toJSON();
  expect(tree).toMatchSnapshot();
});
