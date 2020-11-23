import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@/tests/__mocks__/matchMedia";
import Navbar from "@/components/Navbar";
import i18n from "@/locales/i18n";

describe("Navbar", () => {
  const mockChangeLanguage = jest
    .spyOn(i18n, "changeLanguage")
    .mockImplementation((lang) => lang);

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

    const accountLink = screen.getByText(/Account/i);
    expect(accountLink).toBeInTheDocument();
    expect(accountLink.href).toEqual("http://localhost/account");

    const logoutLink = screen.getByText(/Logout/i);
    expect(logoutLink).toBeInTheDocument();
    expect(logoutLink.href).toEqual("http://localhost/logout");
  });

  test("links", () => {
    render(<Navbar />);

    const nextLink = screen.getByTestId("link-home");
    expect(nextLink.href).toEqual("http://localhost/");
  });

  test("change language", () => {
    render(<Navbar />);

    expect(screen.queryByText(/English/i)).not.toBeInTheDocument();
    userEvent.hover(screen.getByTestId("lang-flag"));
    expect(screen.getByText(/English/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/French/i));
    expect(mockChangeLanguage).toHaveReturnedWith("fr");
  });
});
