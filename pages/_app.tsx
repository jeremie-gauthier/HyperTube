import React from "react";
import { AppLayoutProps } from "next/app";
import "@/locales/i18n";
import "@/styles/tailwind.scss";
import StoreProvider from "state/store";

function MyApp({ Component, pageProps }: AppLayoutProps) {
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
