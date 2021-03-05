import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import i18n from "@/locales/i18n";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang={i18n.language}>
        <Head>
          <meta httpEquiv="content-language" content="en,es,fr,ja" />
          <meta
            name="description"
            content={`School project that aims to recreate\
              a Netflix-like platform`}
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            // eslint-disable-next-line
            href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
