import db from '../src/firebase/firebase';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken'; 
import cookie from 'cookie';
import Transactions from '../src/components/Transactions';
import Navigation from '../src/components/Navigation';



const TransactionsPage = (props) => {
  
  
    return(
        <div className="outer-container">
          <Navigation />
          <div className="transaction-page-content">
              
              <Transactions TList={props.transactions}/>
          </div>
            
        </div>
    )
}

export const getServerSideProps = async(context) => {

  let decoded = 'dGZZ2xH3toXlfGU2W2F5iifEkMJ3';
  if(context.req.headers.cookie){
    const parsedCookies = cookie.parse(context.req.headers.cookie)
    decoded = jwt.decode(parsedCookies.userId, { header: true })
  }
  
  
 
  let listOfTransactions = [];
   const dbreq = await db.ref(`users/${decoded}/transactions`)
  .once('value')
      .then((snapshot) => snapshot.val())
      .then((val) => {
        Object.keys(val).map((key) => {
          listOfTransactions.push({
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
      transactions: [...listOfTransactions]
    }
  }
}


// export default TransactionsPage;
const mapStateToProps = () => {
    return {
       
    };
  };
  
  
  export default connect(mapStateToProps)(TransactionsPage);