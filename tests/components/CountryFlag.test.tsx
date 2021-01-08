import React from "react";
import CountryFlag, { LangSettings } from "@/components/CountryFlag";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";

test("<CountryFlag /> should render the French Flag", () => {
  const tree = renderer.create(<CountryFlag lang="fr" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("<CountryFlag /> should render null", () => {
  const tree = renderer.create(<CountryFlag lang="wrong_value" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("<LangSettings /> should render the list of languages when clicked", () => {
  const screen = render(<LangSettings />);
  fireEvent.click(screen.getByTestId("lang-flag-clickable"));
  expect(screen).toMatchSnapshot();
});
