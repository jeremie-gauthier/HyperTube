import React from "react";
import Login from "@/pages/auth/login";
import { render } from "@testing-library/react";

test("<Login /> should render correctly", () => {
  const tree = render(<Login />);
  expect(tree).toMatchSnapshot();
});
