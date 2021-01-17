import React from "react";
import Reset from "@/pages/auth/reset";
import { render } from "@testing-library/react";

test("<Reset /> should render correctly", () => {
  const tree = render(<Reset />);
  expect(tree).toMatchSnapshot();
});
