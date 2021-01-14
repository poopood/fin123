import Link from 'next/link';
import { connect } from 'react-redux';
import {LogoutUser} from '../src/actions/UserActions';
import moment, { now } from 'moment';
import ExpensesCatChart from '../src/components/charts/ExpensesCatChart';
import AssetLiabilityChart from '../src/components/charts/AssetLiabilityChart';
import jwt from 'jsonwebtoken'; 
import cookie from 'cookie';
import db from '../src/firebase/firebase'
import IncomeCatChart from '../src/components/charts/IncomeCatChart';
import NetAssetChart from '../src/components/charts/NetAssetsChart';


const Index = (props) => {
  let currentMonth = moment(new Date()).format('MMMM');
    let currentYear= moment(new Date()).format('Y');
  console.log(props);
  // console.log(moment().startOf('month').format("YYYY-DD-MM"), "momee");
  // console.log(moment().endOf("month").format("YYYY-DD-MM"));
  let lofT = [];
  let eCatLabels = [];
  let iCatLabels = [];
  let eChartData = [];
  let iChartData = [];
  let accountChartData = [];
  let allExpenseTrForTheMonth = 0;
  let allIncomeTrForTheMonth = [];
  // console.log(Date.now(), 'moment date')
  props.transactions.map(e => {
    // console.log(moment(e.createdAt).isSame(new Date(), 'year') && );
    lofT.push(e);
  })
  props.expenseCats.map(e => {
    eCatLabels.push(e.label);
  })
  props.incomeCats.map(e => {
    iCatLabels.push(e.label);
  })

   eCatLabels.map((e,i) => {
    // console.log(e);
    props.transactions.map(t => {
        if(t.entry === 'expense'){
          if(t.category.label == e){
            eChartData.push({'name':e, 'count' : t.amount})
          }
        }
    })
  })

  iCatLabels.map((e,i) => {
    // console.log(e);
    props.transactions.map(t => {
        if(t.entry === 'income'){
          if(t.category.label == e){
            iChartData.push({'name':e, 'count' : t.amount})
          }
        }
    })
  })
  // console.log(iChartData);

  //NetAssetChartData

  props.transactions.map(e => {
    if(e.entry === 'expense'){
      let sumOfExpenses = 0;
      sumOfExpenses += e.amount
      allExpenseTrForTheMonth = sumOfExpenses
    }
  })

  console.log(allExpenseTrForTheMonth)

  props.accounts.map(e => {
   if(e.account_cat === 'Assets'){
     accountChartData.push({
       'label': e.name,
       'data' :[ e.currentAmount, 0],
       'backgroundColor': "#" + ((1<<24)*Math.random() | 0).toString(16)
     })
   } else {
    accountChartData.push({
      'label': e.name ,
      'data' :[ 0, e.currentAmount],
      'backgroundColor': "#" + ((1<<24)*Math.random() | 0).toString(16)
    })
   }
  // accountChartData.push({
  //   'label': e.name,
  //   'cat' : e.account_cat
  // })
  })

  console.log(accountChartData, 'account data')

const result = Object.values(eChartData.reduce((c, {name,count}) => {
  c[name] = c[name] || {name,count: 0};
  c[name].count += count;
  return c;
}, {}));


const result1 = Object.values(iChartData.reduce((c, {name,count}) => {
  c[name] = c[name] || {name,count: 0};
  c[name].count += count;
  return c;
}, {}));

// console.log(lofT, 'loft');

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
        <IncomeCatChart result1={result1}/>
        <AssetLiabilityChart accountChartData={accountChartData}/>
        <NetAssetChart />
        
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
  let userIncomeCategories = [];
  let listOfTransactions = [];
  let userAccounts = [];

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
  
  const dbreqIncome= await db.ref(`users/${decoded}/categories/income`)
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


  return {
    props : {
      expenseCats: [...userExpenseCategories],
      incomeCats:[...userIncomeCategories],
      transactions: [...listOfTransactions],
      accounts:[...userAccounts]
    }
  }


}



const mapStateToProps = () => {
  return {
      
  };
};


export default connect(mapStateToProps)(Index);

