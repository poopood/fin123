// import withRedux from 'next-redux-wrapper';
import AddTransactionForm from '../src/components/AddTransactionForm';
// import wrapper from '../src/store/configureStore';
import { connect } from 'react-redux';
import Transactions from '../src/components/Transactions';
import jwt from 'jsonwebtoken'; 
import cookie from 'cookie';
import db from '../src/firebase/firebase';
import {cats} from '../src/utils/data';

const AddTransactionPage = (props) => {
    console.log(props, 'mega props');
    
// let cats = [];

    // props.accounts.map(e => {
    //     return(
    //         cats.push({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: <div style={groupStyles}><span>{e.name}</span>
    //             <span style={groupBadgeStyles}>${e.currentAmount}</span></div>})
                
    //     )
    // })
    

    return(
        <div>
            Hello from Add Transaction Page
            <AddTransactionForm accounts={props.accounts} expenseCats={props.expense} incomeCats={props.income}/>
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
    
   
    let mist = [];
    let Ecats = [];
    let Icats = [];
     const dbdb = await db.ref(`users/${decoded}/accounts`)
    .once('value')
        .then((snapshot) => snapshot.val())
        .then((val) => {
          Object.keys(val).map((key) => {
            mist.push({
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
    const dbdb1 = await db.ref(`users/${decoded}/categories/expense`)
  .once('value')
      .then((snapshot) => snapshot.val())
      .then((val) => {
        Object.keys(val).map((key) => {
            Ecats.push({
            id: key,
            ...val[key]
          })
        }
        
        );

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })
  const dbdb2 = await db.ref(`users/${decoded}/categories/income`)
  .once('value')
      .then((snapshot) => snapshot.val())
      .then((val) => {
        Object.keys(val).map((key) => {
          Icats.push({
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
        accounts: [...mist],
        expense: [...Ecats],
        income:[...Icats]
      }
    }
  }
  

  const mapStateToProps = (state) => {
    return {
        userState : state.userState.userID
    };
  };
  
  
  export default connect(mapStateToProps)(AddTransactionPage);



// export default wrapper.withRedux(AddTransactionPage);
// export default AddTransactionPage;