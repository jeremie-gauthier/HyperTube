import React from "react";
import AuthLayout from "@/components/Layouts/AuthLayout";
import renderer from "react-test-renderer";

test("<AuthLayout /> should render correctly", () => {
  const tree = renderer
    .create(
      <AuthLayout>
        <div />
      </AuthLayout>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
