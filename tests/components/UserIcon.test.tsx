import React from "react";
import { render, screen } from "@testing-library/react";
import UserIcon from "@/components/UserIcon";
import userMock from "@/tests/__mocks__/user";

test("renders correctly", () => {
  const { container } = render(<UserIcon user={userMock} />);
  expect(container).toMatchSnapshot();
});

test("expect the initials to be visible", () => {
  render(<UserIcon user={userMock} />);

  expect(screen.getByText(/AD/i)).toBeInTheDocument();
});
