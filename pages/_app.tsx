import React from "react";
import "@/locales/i18n";
import "@/styles/tailwind.scss";
import StoreProvider from "state/store";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { NextComponentType } from "next";
import { ToastContainer } from "@/components/Toast";

type AppLayoutProps = AppProps & {
  Component: NextComponentType & {
    Layout?: (page: React.ReactNode) => JSX.Element;
    Title?: string;
  };
};

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
        <ToastContainer limit={1} autoClose={2500} />
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
