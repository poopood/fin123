
import AddTransactionForm from '../src/components/AddTransactionForm';

import { connect } from 'react-redux';

import jwt from 'jsonwebtoken'; 
import cookie from 'cookie';
import db from '../src/firebase/firebase';
import withAuth from '../src/utils/withAuth';

const AddTransactionPage = (props) => {
 
    return(
        <div>
            
            <AddTransactionForm accounts={props.accounts} expenseCats={props.expenseCats} incomeCats={props.incomeCats}/>
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
    let userExpenseCategories = [];
    let userIncomeCategories = [];
     const dbreqAccounts = await db.ref(`users/${decoded}/accounts`)
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
    /// expense categories
    const dbreqExpense = await db.ref(`users/${decoded}/categories/expense`)
  .once('value')
      .then((snapshot) => snapshot.val())
      .then((val) => {
        Object.keys(val).map((key) => {
          userExpenseCategories.push({
            id: key,
            ...val[key]
          })
        }
        
        );

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })
  const dbreqIncome = await db.ref(`users/${decoded}/categories/income`)
  .once('value')
      .then((snapshot) => snapshot.val())
      .then((val) => {
        Object.keys(val).map((key) => {
          userIncomeCategories.push({
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
        accounts: [...userAccounts],
        expenseCats: [...userExpenseCategories],
        incomeCats:[...userIncomeCategories]
      }
    }
  }
  

  const mapStateToProps = () => {
    return {
  
    };
  };
  
  
  // export default connect(mapStateToProps)(AddTransactionPage);
  export default connect(mapStateToProps)(withAuth(AddTransactionPage));

