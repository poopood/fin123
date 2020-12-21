import Link from 'next/link';
import db from '../src/firebase/firebase';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken'; 
import cookie from 'cookie';
import moment from 'moment';
import Transactions from '../src/components/Transactions';


const TransactionsPage = (props) => {
    return(
        <div>
            <p>Hello from Transactions Page</p>
            <Transactions TList={props.transactions}/>
        </div>
    )
}

export const getServerSideProps = async(context) => {
     // auth.onAuthStateChanged(function(user) {
  //   if (user) {
  //     localStorage.setItem('User', JSON.stringify(user.uid));
  //   } else {
  //     // No user is signed in.
  //   }
  // });
  let decoded = 'dGZZ2xH3toXlfGU2W2F5iifEkMJ3'
  if(context.req.headers.cookie){
    const parsedCookies = cookie.parse(context.req.headers.cookie)
    decoded = jwt.decode(parsedCookies.userId, { header: true })
  }
  
  
  // console.log(parsedCookies.userId,'ucook')
  
 
  let kist = [];
   const dbdb = await db.ref(`users/${decoded}/transactions`)
  .once('value')
      .then((snapshot) => snapshot.val())
      .then((val) => {
        Object.keys(val).map((key) => {
          kist.push({
            id: key,
            ...val[key]
          })
        }
        
        );

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })

  
  return {
    props : {
      transactions: [...kist]
    }
  }
}


// export default TransactionsPage;
const mapStateToProps = (state) => {
    return {
       
    };
  };
  
  
  export default connect(mapStateToProps)(TransactionsPage);