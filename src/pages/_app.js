import "@/styles/globals.css";
import LayoutDefault from "../layout/default";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store";
import "@/styles/theme/index.css";
import "@/styles/custom.css";
import "@/styles/animation.css";
import { useEffect } from "react";
import { CursorStyle } from "@/utils/cur";
import { loadlive2d } from "@/utils/live2d";

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const Layout = Component.Layout ?? LayoutDefault;
  // Component.Layout ?? ((page) => page);

  useEffect(() => {
    CursorStyle();
    loadlive2d()
  }, []);

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
      {/* <Script src="https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"></Script> */}
    </>
  );
}
