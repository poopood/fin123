// import { v4 as uuidv4 } from 'uuid';
// import React,{useState} from 'react';
import db from '../firebase/firebase';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const AddTransaction = (transaction) => ({
    type : 'ADD_TRANSACTION',
    transaction
})

const startAddTransaction = (
    {
        name = 'Unknown',
        entry =  'expense',
        account_type = 'assets',
        account_cat = 'food',
        description = 'Unknown Transaction',
        category  = ['entertainment'],
        createdAt = moment().toString(),
        amount = 0,
        aid = 'lkjasd'
    }
    = {}
) => {
    
    const transaction = {name, entry,account_type,account_cat, description, category,createdAt, amount }
    const ucook = Cookies.get('userId');
 
    const decoded = jwt.decode(ucook, { header: true })
    // console.log(decoded,'sdf')
    console.log(transaction)
    return (dispatch) => {
        
        db.ref(`users/${decoded}/transactions`).push(transaction).then((ref) => {
            dispatch(AddTransaction({
                id:ref.key,
                ...transaction
            }));
        })
        // let peepee;
        db.ref(`users/${decoded}/accounts/${aid}`).once('value')
        .then((snapshot) => {
           let peepee = snapshot.val();   
            if(peepee.account_cat === 'Assets'){
                let currentValue = amount - peepee.currentAmount;
                
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            } else {
                let currentValue = peepee.currentAmount + amount;
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            }
            
            // console.log(currentValue, 'amount peepee')

            
            

        })
        // console.log(peepee, 'peepee');
        // db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: 12})
    };
}
const EditTransaction = (transaction) => ({
    type: 'EDIT_TRANSACTION',
    transaction
})

const startEditTransaction = (
    {
        name = 'Unknown',
        entry =  'expense',
        account_type = 'assets',
        account_cat = 'food',
        description = 'Unknown Transaction',
        category  = ['entertainment'],
        createdAt = moment().toString(),
        amount = 0,
        tid = 'gg',
        aid = ''
}
 = {}) => {
    const transaction = {name, entry,account_type,account_cat, description, category,createdAt, amount }
    const ucook = Cookies.get('userId');
 
    const decoded = jwt.decode(ucook, { header: true })
    // console.log(decoded,'sdf')
    // console.log(transaction)
    return (dispatch) => {
        
        db.ref(`users/${decoded}/transactions/${tid}`).update(transaction).then(() => {
            dispatch(EditTransaction({
                ...transaction
            }));
        })
        db.ref(`users/${decoded}/accounts/${aid}`).once('value')
        .then((snapshot) => {
           let peepee = snapshot.val();   
            if(peepee.account_cat === 'Assets'){
                let currentValue = amount - peepee.currentAmount;
                
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            } else {
                let currentValue = peepee.currentAmount + amount;
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            }
            
            // console.log(currentValue, 'amount peepee')

            
            

        })
    };
}


const removeTransaction= (id) => ({
    type : 'REMOVE_TRANSACTION',
    id
})

const rmFromLib = (id) => {
    const ucook = Cookies.get('userId');
 
    const decoded = jwt.decode(ucook, { header: true })
    // console.log(decoded,'sdf')
    return (dispatch) => {

        db.ref(`users/${decoded}/transactions`).child(id).remove().then(() => {
            dispatch(removeTransaction(id));
        })
    }
    
}


export {AddTransaction, removeTransaction, startAddTransaction, rmFromLib, startEditTransaction};


// const startSetUpTransactions = ({} = {}) => {
//     return (dispatch) => {
//         db.ref()
//             .once('value')
//             .then((snapshot) => {
//             const val = snapshot.val()
//             dispatch(setUpTransactions)
//                 })
//             .catch((e) => {
//             console.log('error fetching data', e)
//     })
//     }
// }