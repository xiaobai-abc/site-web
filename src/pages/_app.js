import "@/styles/globals.css";
import DefaultLayout from "../layout/default";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store";

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);
  return (
    <>
      <Head>
        <title>小白abc</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </>
  );
}
