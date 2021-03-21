import {wrapper} from '../src/store/configureStore';
import '../styles/globals.scss';
// import "react-datepicker/dist/react-datepicker.css";
import 'react-dates/lib/css/_datepicker.css';
// import initAuth from '../src/utils/initAuth';
import { PageTransition } from 'next-page-transitions';

// console.log(auth, 'huth');
// initAuth();



function MyApp({ Component, pageProps }) {
  
  return(
  <PageTransition timeout={150} classNames="page-transition">
   <Component {...pageProps} />
  </PageTransition>
  )
}

export default wrapper.withRedux(MyApp);

