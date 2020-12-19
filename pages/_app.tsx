import React from "react";
import { AppProps } from "next/app";
import "@/locales/i18n";
import "@/styles/tailwind.scss";
import StoreProvider from "state/store";

type PageWithLayout = {
  Layout: (props: { children: React.ReactNode }) => JSX.Element;
};

function MyApp({ Component, pageProps }: AppProps<PageWithLayout>) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
