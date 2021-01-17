import React from "react";
import Register from "@/pages/auth/register";
import { fireEvent, render } from "@testing-library/react";

test("<Register /> should render correctly", () => {
  const tree = render(<Register />);
  fireEvent.focus(tree.getByPlaceholderText(/models.user.password\*/));
  expect(tree).toMatchSnapshot();
  fireEvent.blur(tree.getByPlaceholderText(""));
  expect(tree).toMatchSnapshot();
});
