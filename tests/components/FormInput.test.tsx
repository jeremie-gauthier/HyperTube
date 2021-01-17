import React from "react";
import FormInput from "@/components/FormInput";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";

test("<FormInput /> should render correctly without error", () => {
  const tree = renderer
    .create(<FormInput value="" name="test" placeholder="test" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("<FormInput /> should render correctly with error", () => {
  const tree = renderer
    .create(
      <FormInput
        value=""
        name="test"
        placeholder="test"
        error="something wrong, I can feel it"
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe("<FormInput /> should render correctly when focused", () => {
  test("with focus callbacks", () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const screen = render(
      <FormInput
        value=""
        name="test"
        placeholder="test"
        onChange={() => null}
        onFocus={onFocus}
        onBlur={onBlur}
      />,
      {},
    );
    const input = screen.getByPlaceholderText("test");
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test("without focus callbacks", () => {
    const screen = render(
      <FormInput
        value=""
        name="test"
        placeholder="test"
        onChange={() => null}
      />,
      {},
    );
    const input = screen.getByPlaceholderText("test");
    fireEvent.focus(input);
    expect(screen.asFragment()).toMatchSnapshot();
    fireEvent.blur(input);
    expect(screen.asFragment()).toMatchSnapshot();
  });
});
