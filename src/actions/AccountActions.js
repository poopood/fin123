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

//removeAccount

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

const startRemovingRelatedTransactions = (id) => {

    const ucook = Cookies.get('userId');
 
    const decoded = jwt.decode(ucook, { header: true })

    const dbcall = db.ref(`users/${decoded}/transactions`).orderByChild(id)
    .remove()
    .catch((e) => {
        console.log('error fetching data', e)
    })

}


//bad func

// const startRemovingTransactions = (id) => {
//     const ucook = Cookies.get('userId');
 
//     const decoded = jwt.decode(ucook, { header: true })

//     const getAlltransactions = [];

//     const dbreq =  db.ref(`users/${decoded}/transactions`)
//         .once('value')
//             .then((snapshot) => snapshot.val())
//             .then((val) => {
//               Object.keys(val).map((key) => {
//                 getAlltransactions.push({
//                   id: key,
//                   ...val[key]
//                 })
//               }
              
//               );
      
//         })
//         .then(() =>{
//             let filteredTransactions = getAlltransactions.filter((e) => {
//                 return e.aid !== id
//             })
//             const dbreq1 = db.ref(`users/${decoded}/transactions`).update(filteredTransactions)
//         })
//             .catch((e) => {
//             console.log('error fetching data', e)
//         })

// }

// const startRemoveAccount = (id) => {
//     const ucook = Cookies.get('userId');
 
//     const decoded = jwt.decode(ucook, { header: true })
//     return (dispatch) => {

//         db.ref(`users/${decoded}/accounts`).child(id).remove().then(() => {
//             dispatch(removeAccount(id));

//             //getalltransactions to an array
//         let getAlltransactions = [];
//         const dbreq =  db.ref(`users/${decoded}/transactions`)
//         .once('value')
//             .then((snapshot) => snapshot.val())
//             .then((val) => {
//               Object.keys(val).map((key) => {
//                 getAlltransactions.push({
//                   id: key,
//                   ...val[key]
//                 })
//               }
              
//               );
      
//         })
//             .catch((e) => {
//             console.log('error fetching data', e)
//         })

//         //filter the transactions
            
//             let filteredTransactions = getAlltransactions.filter((e) => {
//                 return e.aid !== id
//             })

//         //update transactions
//             const dbreq1 = db.ref(`users/${decoded}/transactions`).update(filteredTransactions)



//         })
        


//     }

// }

// startremove account part deux

// const startRemoveAccount = (id) => {
//     const ucook = Cookies.get('userId');
//     const decoded = jwt.decode(ucook, { header: true })

//     return(dispatch) => {


//           //getalltransactions to an array
//         let getAlltransactions = []; 
//         const dbreq =  db.ref(`users/${decoded}/transactions`)
//         .once('value')
//             .then((snapshot) => snapshot.val())
//             .then((val) => {
//               Object.keys(val).map((key) => {
//                 getAlltransactions.push({
//                   id: key,
//                   ...val[key]
//                 })
//               }
              
//               );
      
//         })
//             .catch((e) => {
//             console.log('error fetching data', e)
//         })
//         //filter the transactions
//         let filteredTransactions = getAlltransactions.filter((e) => {
//             return e.aid !== id
//         })

//         //update transactions
//         const dbreq1 = db.ref(`users/${decoded}/transactions`).update(filteredTransactions)
//         .then(() => {
//             const dbreq3 = db.ref(`users/${decoded}/accounts`).child(id)
//             .remove()
//             .then(() => {
//                 dispatch(removeAccount(id));
//             })
//         })

        

//     }



// }



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




export { startAddAccount , startRemoveAccount, startEditAccount,startRemovingRelatedTransactions };