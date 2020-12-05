import React from "react";
import Layout from "@/components/Layouts/SiteLayout";
import renderer from "react-test-renderer";

test("<Layout /> should render correctly", () => {
  const tree = renderer
    .create(
      <Layout>
        <div />
      </Layout>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
