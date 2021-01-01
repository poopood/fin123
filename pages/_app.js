import {wrapper} from '../src/store/configureStore';
import '../styles/globals.css';
import 'react-dates/lib/css/_datepicker.css';


function MyApp({ Component, pageProps }) {
  
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);

