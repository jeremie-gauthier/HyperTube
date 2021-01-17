import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/pages";

describe("Home", () => {
  test("renders correctly", () => {
    render(<Home />);

    expect(screen.getByText(/Next.js!/i)).toBeInTheDocument();
  });
});
