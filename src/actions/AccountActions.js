import db from '../firebase/firebase';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import moment from 'moment';


const AddAccount = (account) => ({
    type: 'ADD_ACCOUNT',
    account
})

const startAddAccount = (
    {
        name = 'Unknown',
        currentAmount  = 0,
        currency = '$',
        account_type = 'savings',
        account_cat = 'assets',
        date = moment().toISOString(),

    } = {}) => {
        const account = {name, currentAmount, currency,date,account_type,account_cat}
       
        const ucook = Cookies.get('userId');
        const decoded = jwt.decode(ucook, { header: true })
        return (dispatch) => {
            db.ref(`users/${decoded}/accounts`).push(account)
            .then((ref) => {
                dispatch(AddAccount({
                    id: ref.key,
                    ...account
                }))
            })
        }
}

const removeAccount = (id) => ({
    type: 'REMOVE_ACCOUNT',
    id
})

const startRemoveAccount = (id) => {
    const ucook = Cookies.get('userId');
 
    const decoded = jwt.decode(ucook, { header: true })
    return (dispatch) => {

        db.ref(`users/${decoded}/accounts`).child(id).remove().then(() => {
            dispatch(removeAccount(id));
        })
    }
}

///Edit Account

const EditAccount = (account) => ({
    type: 'EDIT_ACCOUNT',
    account
})

const startEditAccount = (
    {
        name = 'Unknown',
        currentAmount  = 0,
        currency = '$',
        account_type = 'savings',
        account_cat = 'assets',
        aid=''
}
 = {}) => {
    const account = {name, currentAmount,currency, account_type, account_cat }
    const ucook = Cookies.get('userId');
 
    const decoded = jwt.decode(ucook, { header: true })
    
    return (dispatch) => {
        
        db.ref(`users/${decoded}/accounts/${aid}`).update(account).then(() => {
            dispatch(EditAccount({
                ...account
            }));
        })
    };
}




export { startAddAccount , startRemoveAccount, startEditAccount };