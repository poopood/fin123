import {wrapper} from '../src/store/configureStore';
import '../styles/globals.scss';
// import "react-datepicker/dist/react-datepicker.css";
import 'react-dates/lib/css/_datepicker.css';
import 'react-pure-modal/dist/react-pure-modal.min.css';
// import initAuth from '../src/utils/initAuth';
// import { PageTransition } from 'next-page-transitions';
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react"
// import { ChakraProvider } from "@chakra-ui/react"

// import withAuth from '../src/utils/withAuth';
// import {AuthProvider} from "../src/utils/useAuth";

// console.log(auth, 'huth');
// initAuth();
// <PageTransition timeout={150} classNames="page-transition">
  // </PageTransition>

function MyApp({ Component, pageProps }) {
  
  return(
    <>
      <Head>
        <title>Finnikky</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
      </Head>
    <ChakraProvider  resetCSS={false}>
      <Component {...pageProps} />
      </ChakraProvider>

    </>
  )
}

export default wrapper.withRedux(MyApp);

