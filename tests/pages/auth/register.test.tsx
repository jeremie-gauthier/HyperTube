import React from "react";
import Register from "@/pages/auth/register";
import { render } from "@testing-library/react";

test("<Register /> should render correctly", () => {
  const tree = render(<Register />);
  expect(tree).toMatchSnapshot();
});
