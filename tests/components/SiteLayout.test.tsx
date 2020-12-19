import React from "react";
import SiteLayout from "@/components/Layouts/SiteLayout";
import renderer from "react-test-renderer";

test("<SiteLayout /> should render correctly", () => {
  const tree = renderer
    .create(
      <SiteLayout>
        <div />
      </SiteLayout>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
