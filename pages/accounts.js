import Link from 'next/link';
import db from '../src/firebase/firebase';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { connect } from 'react-redux';  


const Accounts = (props) => {
        let assetAccounts = [];
        let liabilityAccounts = [];
        let netWorth = 0;

        props.accounts.map(e => {
            if(e.account_cat === 'Assets'){
                return (
                    assetAccounts.push(e)
                )
            } else if(e.account_cat === 'Liabilities'){
                return (
                    liabilityAccounts.push(e)
                )
            }
        })
        assetAccounts.map(e => {
            return(
                netWorth += e.currentAmount
            )
        })
        liabilityAccounts.map(e => {
            return(
                netWorth -= e.currentAmount
            )
        })
        
        

    return(
        <div>
            <h1>Accounts</h1>
            <h3>Net Worth - { netWorth}</h3>

            <h2>Assets</h2> 
            {
                assetAccounts.map(e => {
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
                liabilityAccounts.map(e => {
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

    let decoded = 'dGZZ2xH3toXlfGU2W2F5iifEkMJ3'
    if(context.req.headers.cookie){
      const parsedCookies = cookie.parse(context.req.headers.cookie)
      decoded = jwt.decode(parsedCookies.userId, { header: true })
    }
    

   
    let userAccounts = [];
     const dereqAssets = await db.ref(`users/${decoded}/accounts`)
    .once('value')
        .then((snapshot) => snapshot.val())
        .then((val) => {
          Object.keys(val).map((key) => {
            userAccounts.push({
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
        accounts: [...userAccounts]
      }
    }
  }

const mapStateToProps = () => {
  return {
  
  };
};


export default connect(mapStateToProps)(Accounts);
