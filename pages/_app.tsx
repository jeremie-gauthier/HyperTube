import React from "react";
import { AppLayoutProps } from "next/app";
import "@/locales/i18n";
import "@/styles/tailwind.scss";
import StoreProvider from "state/store";
import Head from "next/head";
import { useTranslation } from "react-i18next";

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.Layout ?? React.Fragment;
  const Title = Component.Title ?? "Hypertube";
  const { t } = useTranslation();

  return (
    <StoreProvider>
      <Head>
        <title>{t(Title)}</title>
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
