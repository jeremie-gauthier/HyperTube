import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "@/components/Layout";

describe("Layout", () => {
  test("Layout renders correctly", () => {
    render(<Layout />);

    const layout = screen.getByTestId("layout-div");
    expect(layout.classList.contains("h-screen")).toBe(true);
    expect(layout).toBeInTheDocument();

    expect(screen.getByTestId("navbar-div")).toBeInTheDocument();
  });
});
