import db from '../../../src/firebase/firebase';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import EditAccountForm from '../../../src/components/EditAccountForm';

const EditableAccount = (props) => {
    
    return(
        <div>
        <h4>Edit Account</h4>
        <EditAccountForm account={props.account[0]} aid={props.aid}/>  
        </div>

    )
}

export const getServerSideProps = async ({params, req}) => {

    let idOfAccountToEdit = params.id

   
    let decoded = 'dGZZ2xH3toXlfGU2W2F5iifEkMJ3'
  if(req.headers.cookie){
    const parsedCookies = cookie.parse(req.headers.cookie)
    decoded = jwt.decode(parsedCookies.userId, { header: true })
  }

    let accountToEdit = [];
   const dbdb = await db.ref(`users/${decoded}/accounts/${idOfAccountToEdit}`)
  .once('value')
      .then((snapshot) => snapshot.val())
      
      .then((val) => {
        accountToEdit.push(val)

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })


    return {
        props : {
            account : [...accountToEdit],
            aid: idOfAccountToEdit
        }
    }

}

export default EditableAccount;