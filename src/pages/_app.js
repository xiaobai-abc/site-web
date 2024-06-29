import "@/styles/globals.css";
import LayoutDefault from "../layout/default";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store";
import "@/styles/theme/index.css";
import "@/styles/custom.css";
import "@/styles/animation.css";

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const Layout = Component.Layout ?? LayoutDefault;
  // Component.Layout ?? ((page) => page);
  return (
    <>
      <Head>
        <title>小白abc</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* {getLayout(<Component {...pageProps} />)} */}
      </Provider>
    </>
  );
}
