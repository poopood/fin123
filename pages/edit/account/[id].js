import db from '../../../src/firebase/firebase';
// import Cookies from 'js-cookie';
// import {LogoutUser} from '../src/actions/UserActions';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import EditAccountForm from '../../../src/components/EditAccountForm';

const ss = (props) => {
    console.log(props)
    return(
        <div>
        <h4>Edit Account</h4>
        <EditAccountForm account={props.account[0]} aid={props.aid}/>
        
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
   const dbdb = await db.ref(`users/${decoded}/accounts/${pinter}`)
  .once('value')
      .then((snapshot) => snapshot.val())
      
      .then((val) => {
        kist.push(val)

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })


    return {
        props : {
            account : [...kist],
            aid: pinter
        }
    }

}

export default ss;