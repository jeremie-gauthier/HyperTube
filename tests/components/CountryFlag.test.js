import React from "react";
import { render, screen } from "@testing-library/react";
import CountryFlag from "@/components/CountryFlag";

describe("CountryFlag", () => {
  test("should not be in the DOM", () => {
    render(<CountryFlag data-testid="test" />);
    expect(screen.queryByTestId("test")).not.toBeInTheDocument();
  });

  test("should be in the DOM", () => {
    render(<CountryFlag lang="fr" data-testid="test" />);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
