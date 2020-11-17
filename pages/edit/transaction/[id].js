import db from '../../../src/firebase/firebase';
// import Cookies from 'js-cookie';
// import {LogoutUser} from '../src/actions/UserActions';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import EditTransactionForm from '../../../src/components/EditTransactionForm';

const ss = (props) => {
    console.log(props.transaction[0])
    console.log(props.accounts,'lucian')
    return(
        <div>
        <h4>Edit Transaction</h4>
        <EditTransactionForm transaction={props.transaction[0]} tid={props.tid} accounts={props.accounts}/>
        </div>

    )
}

export const getServerSideProps = async ({params, req}) => {

    let pinter = params.id

    console.log(pinter)
    let decoded = 'dGZZ2xH3toXlfGU2W2F5iifEkMJ3'
  if(req.headers.cookie){
    const parsedCookies = cookie.parse(req.headers.cookie)
    decoded = jwt.decode(parsedCookies.userId, { header: true })
  }

    let kist = [];
   const dbdb = await db.ref(`users/${decoded}/transactions/${pinter}`)
  .once('value')
      .then((snapshot) => snapshot.val())
      
      .then((val) => {
        kist.push(val)

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })

  let mist = [];
     const bdbd = await db.ref(`users/${decoded}/accounts`)
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


    return {
        props : {
            transaction : [...kist],
            tid: pinter,
            accounts: [...mist]
        }
    }

}

export default ss;