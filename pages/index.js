import Link from 'next/link';
import { connect } from 'react-redux';
import {LogoutUser} from '../src/actions/UserActions';
import moment from 'moment';


const Index = () => {
  let currentMonth = moment(new Date()).format('MMMM');
    let currentYear= moment(new Date()).format('Y');

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



const mapStateToProps = () => {
  return {
      
  };
};


export default connect(mapStateToProps)(Index);

