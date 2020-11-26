import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@/tests/__mocks__/matchMedia";
import Navbar from "@/components/Navbar";
import i18n from "@/locales/i18n";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<Navbar />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe("Navbar", () => {
  const mockChangeLanguage = jest.spyOn(i18n, "changeLanguage");

  test("links", () => {
    render(<Navbar />);

    const nextLink = screen.getByText(/Home/i) as HTMLLinkElement;
    expect(nextLink.href).toEqual("http://localhost/");
  });

  test("display user menu", () => {
    render(<Navbar />);
    expect(screen.queryByText(/Account/i)).not.toBeInTheDocument();
    userEvent.hover(screen.getByText(/AD/i));

    const accountLink = screen.getByText(/Account/i) as HTMLLinkElement;
    expect(accountLink).toBeInTheDocument();
    expect(accountLink.href).toEqual("http://localhost/account");

    const logoutLink = screen.getByText(/Logout/i) as HTMLLinkElement;
    expect(logoutLink).toBeInTheDocument();
    expect(logoutLink.href).toEqual("http://localhost/logout");
  });

  test("change language", () => {
    render(<Navbar />);

    expect(screen.queryByText(/English/i)).not.toBeInTheDocument();
    userEvent.hover(screen.getByTestId("lang-flag"));
    expect(screen.getByText(/English/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/French/i));
    expect(mockChangeLanguage).toHaveBeenCalledWith("fr");
  });
});
