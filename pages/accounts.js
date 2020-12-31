import React, {useState} from 'react';
import Link from 'next/link';
import db from '../src/firebase/firebase';
import jwt from 'jsonwebtoken';
import {auth} from '../src/firebase/firebase';
import cookie from 'cookie';
import { connect } from 'react-redux';  
import NumberFormat from "react-number-format";

const Accounts = (props) => {
    
    // const [a11Value, seta11] = useState(0)
    console.log(props)



    
        let a11 = [];
        let l22 = [];
        // let omally = a11.concat(l22);
        let jksl = 0;

        props.accounts.map(e => {
            if(e.account_cat === 'Assets'){
                return (
                    a11.push(e)
                )
            } else if(e.account_cat === 'Liabilities'){
                return (
                    l22.push(e)
                )
            }
        })
        a11.map(e => {
            return(
              jksl += e.currentAmount
            )
        })
        l22.map(e => {
            return(
              jksl -= e.currentAmount
            )
        })
        
        

    return(
        <div>
            <h1>Accounts</h1>
            <h3>Net Worth - { jksl}</h3>

            <h2>Assets</h2> 
            {
                a11.map(e => {
                    return(
                        <div>
                            <h2>{e.account_type}</h2>
                            <Link href={`edit/account/${e.id}`}>
                            <a><h4>{e.name}</h4></a>
                            </Link>
                            <p>${e.currentAmount.toLocaleString()}</p>
                           
                        </div>
                    )
                })
            }

            <h2>Liablities</h2> 
            <h3>Credit Card</h3>
            {
                l22.map(e => {
                    if(e.account_type === 'Credit Card')
                    return(
                        <div>
                            <Link href={`edit/account/${e.id}`}>
                            <a><h4>{e.name}</h4></a>
                            </Link>
                            <p>${e.currentAmount.toLocaleString()}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}


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
     const Assets = await db.ref(`users/${decoded}/accounts`)
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
        accounts: [...kist]
      }
    }
  }

const mapStateToProps = (state) => {
  return {
      userState : state.userState.userID
  };
};


export default connect(mapStateToProps)(Accounts);
