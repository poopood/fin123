import React,{useEffect} from 'react';
// import MyApp from '../src/components/MyApp';
import Link from 'next/link';
// import AddTransactionForm from '../src/components/AddTransactionForm'
// import MyApp from '../src/components/MyApp';
import Transactions from '../src/components/Transactions';
import { connect } from 'react-redux';
// import { AddTransaction } from '../src/actions/TransactionsActions';
// import '../src/firebase/firebase';  
import db from '../src/firebase/firebase';
import {auth} from '../src/firebase/firebase';
import  Router from 'next/router';
import Cookies from 'js-cookie';
import {LogoutUser} from '../src/actions/UserActions';
import jwt from 'jsonwebtoken'; 
import cookie from 'cookie';
import moment from 'moment';


const Index = (props) => {
  console.log(props, 'props')
  let currentMonth = moment(new Date()).format('MMMM');
    let currentYear= moment(new Date()).format('Y');
    console.log(currentMonth, 'currentMonth');
    console.log(currentYear, 'currentYear');
  // console.log(Date.now(), 'datae')
  const TList = props.transactions;
  // const uState = props.userState;
  //   auth.onAuthStateChanged(function(user) {
  //   if (user) {
  //     localStorage.setItem('User', JSON.stringify(user.uid));
  //   } else {
  //     // No user is signed in.
  //   }
  // });

    // useEffect(
    //     () => {

    //     }
    //         );
  return (
    <div>
        <h2>Hi</h2>

        
        <Link href="/add-transaction">
          <a>Add Transaction</a>
        </Link>
        <br/>
        <Link href="/add-account">
          <a>Add Account</a>
        </Link>
        <br/>
        <Link href="/accounts">
          <a>Accounts</a>
        </Link>
        <br/>
        <Link href="/login">
          <a>Log In</a>
        </Link>
        <br/><br/>
        <Link href="/transactions">
          <a>Transactions</a>
        </Link>
        <br/>
        <br/>
        <Link href={`/budget/${currentYear}/${currentMonth}`}>
          <a>Budgeting</a>
        </Link>
        <button onClick={LogoutUser}>Log Out</button>
        
    </div>
  )
}

// Index.getInitialProps = async () => {
   
//   const ucook = Cookies.get('userId');
  
//   const decoded = jwt.decode(ucook, { header: true })

//   const dbdb = await db.ref(`users/${decoded}/transactions`)
//   .once('value')
//       .then((snapshot) => {
//       const val = snapshot.val();
//       return val;
//   })
//       .catch((e) => {
//       console.log('error fetching data', e)
//   })
//   return dbdb || {};
// }

export const getServerSideProps = async (context) => {
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




const mapStateToProps = (state) => {
  return {
      userState : state.userState.userID
  };
};


export default connect(mapStateToProps)(Index);

// export default Index;