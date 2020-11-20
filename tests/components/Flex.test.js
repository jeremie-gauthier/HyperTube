import React from "react";
import { render, screen } from "@testing-library/react";
import { FlexCol, FlexRow } from "@/components/Flex";

describe("Flex", () => {
  test("FlexCol renders correctly", () => {
    render(<FlexCol />);

    const flexCol = screen.getByTestId("flex-col");
    expect(flexCol.classList.contains("flex-col")).toBe(true);
    expect(flexCol.classList.contains("flex-row")).toBe(false);
  });

  test("FlexRow renders correctly", () => {
    render(<FlexRow />);

    const flexRow = screen.getByTestId("flex-row");
    expect(flexRow.classList.contains("flex-row")).toBe(true);
    expect(flexRow.classList.contains("flex-col")).toBe(false);
  });
});
