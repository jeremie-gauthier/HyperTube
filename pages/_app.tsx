import { AppProps } from "next/app";
import Layout from "@/components/Layout";
import "@/locales/i18n";
import "@/styles/tailwind.scss";
import StoreProvider from "state/store";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
