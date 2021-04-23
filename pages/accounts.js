import Link from 'next/link';
import db from '../src/firebase/firebase';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { connect } from 'react-redux';  
import Navigation from '../src/components/Navigation';
import {AiFillEdit} from 'react-icons/ai';
import withAuth from '../src/utils/withAuth';

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
        <Navigation />
        <div id="page-accounts">
            <h1>Personal Financial Statement as of <br /><span>31/03/2021</span></h1>
            

            <h2 className="bs-assets">Assets</h2> 
            <h4 className="asset-header">Savings </h4>
            {
                assetAccounts.map(e => {
                     if(e.account_type === 'Savings')
                    return(
                        <div>
                            
                            <Link href={`edit/account/${e.id}`}>
                            <a><h4 className="account-name">{e.name} 
                            <span className="fade-icon">
                            <AiFillEdit />
                            </span>
                            </h4>
                            </a>
                            </Link>
                            <p className="account-balance">${e.currentAmount.toLocaleString()}</p>
                           
                        </div>
                    )
                })
            }

            <h4 className="asset-header" >Chequing </h4>
             {
                assetAccounts.map(e => {
                     if(e.account_type === 'Chequing')
                    return(
                        <div>
                            
                            <Link href={`edit/account/${e.id}`}>
                            <a><h4 className="account-name">{e.name}
                            <span className="fade-icon">
                            <AiFillEdit /> </span>
                            </h4></a>
                            </Link>
                            <p className="account-balance">${e.currentAmount.toLocaleString()}</p>
                           
                        </div>
                    )
                })
            }
            <h4 className="asset-header" >Wallet </h4>
             {
                assetAccounts.map(e => {
                     if(e.account_type === 'Wallet')
                    return(
                        <div>
                            
                            <Link href={`edit/account/${e.id}`}>
                            <a><h4 className="account-name">{e.name}
                            <span className="fade-icon">
                            <AiFillEdit /> </span>
                            </h4></a>
                            </Link>
                            <p className="account-balance">${e.currentAmount.toLocaleString()}</p>
                           
                        </div>
                    )
                })
            }
            <h4 className="asset-header" >Receivables </h4>
             {
                assetAccounts.map(e => {
                     if(e.account_type === 'Receivables')
                    return(
                        <div>
                            
                            <Link href={`edit/account/${e.id}`}>
                            <a><h4 className="account-name">{e.name}
                            <span className="fade-icon">
                            <AiFillEdit /> </span></h4></a>
                            </Link>
                            <p className="account-balance">$ {e.currentAmount.toLocaleString()}</p>
                           
                        </div>
                    )
                })
            }









            <h2 className="bs-liabilities">Liablities</h2> 
            <p className="asset-header">Credit Card</p>
            {
                liabilityAccounts.map(e => {
                    if(e.account_type === 'Credit Card')
                    return(
                        <div>
                            <Link href={`edit/account/${e.id}`}>
                            <a><p className="account-name">{e.name}
                            <span className="fade-icon">
                             <AiFillEdit /></span></p></a>
                            </Link>
                            <p className="account-balance ab-l">${e.currentAmount.toLocaleString()}</p>
                        </div>
                    )
                })
            }

            <p className="asset-header">Loans</p>
            {
                liabilityAccounts.map(e => {
                    if(e.account_type === 'Loans')
                    return(
                        <div>
                            <Link href={`edit/account/${e.id}`}>
                            <a><p className="account-name">{e.name}
                            <span className="fade-icon">
                            <AiFillEdit /></span></p></a>
                            </Link>
                            <p className="account-balance ab-l">${e.currentAmount.toLocaleString()}</p>
                        </div>
                    )
                })
            }
            <p className="asset-header">Mortgages</p>
            {
                liabilityAccounts.map(e => {
                    if(e.account_type === 'Mortgages')
                    return(
                        <div>
                            <Link href={`edit/account/${e.id}`}>
                            <a><p className="account-name">{e.name} <span className="fade-icon">
                            <AiFillEdit /></span></p></a>
                            </Link>
                            <p className="account-balance ab-l">${e.currentAmount.toLocaleString()}</p>
                        </div>
                    )   
                })
            }
            <p className="asset-header">Payables</p>
            {
                liabilityAccounts.map(e => {
                    if(e.account_type === 'Payables')
                    return(
                        <div>
                            <Link href={`edit/account/${e.id}`}>
                            <a><p className="account-name">{e.name} <span className="fade-icon">
                            <AiFillEdit /></span></p></a>
                            </Link>
                            <p className="account-balance ab-l">${e.currentAmount.toLocaleString()}</p>
                        </div>
                    )   
                })
            }
            <div className="networth">
            <p className="networth-heading">Net Worth </p>
            <p className="networth-amount">{ netWorth}</p>
            </div>
        </div>
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


export default connect(mapStateToProps)(withAuth(Accounts));
