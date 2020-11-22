import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@/tests/__mocks__/matchMedia";
import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  test("renders correctly", () => {
    render(<Navbar />);

    expect(screen.getByText(/HYPERTUBE/i)).toBeInTheDocument();
    expect(screen.getByTestId("link-home")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/AD/i)).toBeInTheDocument();
    expect(screen.getByTestId("lang-flag")).toBeInTheDocument();
  });

  test("display user menu", () => {
    render(<Navbar />);
    expect(screen.queryByText(/Account/i)).not.toBeInTheDocument();
    userEvent.hover(screen.getByText(/AD/i));
    expect(screen.getByText(/Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test("links", () => {
    render(<Navbar />);

    const nextLink = screen.getByTestId("link-home");
    expect(nextLink.href).toEqual("http://localhost/");
  });
});
