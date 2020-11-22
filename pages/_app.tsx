import { AppProps } from "next/app";
import Layout from "@/components/Layout";
import "@/locales/i18n";
import "@/styles/tailwind.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
