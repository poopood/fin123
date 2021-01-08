import Link from 'next/link';
import { connect } from 'react-redux';
import {LogoutUser} from '../src/actions/UserActions';
import moment from 'moment';
import ExpensesCatChart from '../src/components/charts/ExpensesCatChart';
import AssetLiabilityChart from '../src/components/charts/AssetLiabilityChart';
import jwt from 'jsonwebtoken'; 
import cookie from 'cookie';
import db from '../src/firebase/firebase'


const Index = (props) => {
  let currentMonth = moment(new Date()).format('MMMM');
    let currentYear= moment(new Date()).format('Y');
  console.log(props);
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

        <ExpensesCatChart />
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


  return {
    props : {
      expenseCats: [...userExpenseCategories]
    }
  }


}



const mapStateToProps = () => {
  return {
      
  };
};


export default connect(mapStateToProps)(Index);

