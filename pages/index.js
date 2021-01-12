import Link from 'next/link';
import { connect } from 'react-redux';
import {LogoutUser} from '../src/actions/UserActions';
import moment, { now } from 'moment';
import ExpensesCatChart from '../src/components/charts/ExpensesCatChart';
import AssetLiabilityChart from '../src/components/charts/AssetLiabilityChart';
import jwt from 'jsonwebtoken'; 
import cookie from 'cookie';
import db from '../src/firebase/firebase'


const Index = (props) => {
  let currentMonth = moment(new Date()).format('MMMM');
    let currentYear= moment(new Date()).format('Y');
  // console.log(props);
  // console.log(moment().startOf('month').format("YYYY-DD-MM"), "momee");
  // console.log(moment().endOf("month").format("YYYY-DD-MM"));
  let lofT = [];
  let eCatLabels = [];
  let shoon = [];
  // console.log(Date.now(), 'moment date')
  props.transactions.map(e => {
    // console.log(moment(e.createdAt).isSame(new Date(), 'year') && );
    lofT.push(e);
  })
  props.expenseCats.map(e => {
    eCatLabels.push(e.label);
  })

   eCatLabels.map((e,i) => {
    // console.log(e);
    props.transactions.map(t => {
        if(t.category){
          if(t.category.label == e){
            shoon.push({'name':e, 'count' : t.amount})
          }
        }
    })
  })

 console.log(shoon,'shoon')
// solution

var result = Object.values(shoon.reduce((c, {name,count}) => {
  c[name] = c[name] || {name,count: 0};
  c[name].count += count;
  return c;
}, {}));

console.log(result);



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

        <ExpensesCatChart result={result}/>
        <AssetLiabilityChart />
        
    </div>
  )
}


export const getServerSideProps = async (context) => {

  let decoded = 'dGZZ2xH3toXlfGU2W2F5iifEkMJ3'
  if(context.req.headers.cookie){
    const parsedCookies = cookie.parse(context.req.headers.cookie)
    decoded = jwt.decode(parsedCookies.userId, { header: true })
  }

  let userExpenseCategories = [];
  let listOfTransactions = [];

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
  // .orderByChild("createdAt").startAt(moment().startOf('month').format("YYYY-DD-MM")).endAt(moment().endOf("month").format("YYYY-DD-MM"))
  const dbreq = await db.ref(`users/${decoded}/transactions`).orderByChild("createdAt").startAt(moment().startOf('month').format("YYYY-DD-MM")).endAt(moment().endOf("month").format("YYYY-DD-MM"))
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
      expenseCats: [...userExpenseCategories],
      transactions: [...listOfTransactions]
    }
  }


}



const mapStateToProps = () => {
  return {
      
  };
};


export default connect(mapStateToProps)(Index);

