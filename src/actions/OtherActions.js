import db from '../firebase/firebase';
import {auth} from '../firebase/firebase';
import  Router from 'next/router';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

// const startAddCategories = ({
//     category = 'other'
// } = {} ) => {
//     const ucook = Cookies.get('userId');
 
//     const decoded = jwt.decode(ucook, { header: true })
//     return (dispatch) => {
//         if(entry === 'expense'){
//             db.ref(`users/${decoded}/categories/expense`).once('value')
//             .then((snapshot) => {
//                let peepee = snapshot.val();   
//                 if(peepee.account_cat === 'Assets'){
//                     let currentValue = peepee.currentAmount + amount;
                    
//                     db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
//                 } else {
//                     let currentValue = peepee.currentAmount - amount;
//                     db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
//                 }
                
//                 // console.log(currentValue, 'amount peepee')s
                
//             })
               
    
            
//             } else if ( entry === 'income') {
//                 db.ref(`users/${decoded}/categories/income`).once('value')
//             .then((snapshot) => {
//                let peepee = snapshot.val();   
//                 if(peepee.account_cat === 'Assets'){
//                     let currentValue = peepee.currentAmount - amount;
                    
//                     db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
//                 } else {
//                     let currentValue = peepee.currentAmount + amount;
//                     db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
//                 }
                
//                 // console.log(currentValue, 'amount peepee')s
                
//             })
//             }
//     }
// }

const startAddExpenseCategory = ({
    value = 'other',
    label = 'other'
} = {}) => {
    const ucook = Cookies.get('userId');
    const category = {value,label}
    const decoded = jwt.decode(ucook, { header: true })
    return (dispatch) => {
        db.ref(`users/${decoded}/categories/expense`).push(category)
    }
}
const startAddIncomeCategory = ({
    value = 'other',
    label = 'other'
} = {}) => {
    const ucook = Cookies.get('userId');
    const category = {value,label}
    const decoded = jwt.decode(ucook, { header: true })
    return (dispatch) => {
        db.ref(`users/${decoded}/categories/income`).push(category)
    }
}

const removeCategory = (id, entry) => {
    const ucook = Cookies.get('userId');
 
    const decoded = jwt.decode(ucook, { header: true })
    return (dispatch) => {
        if(entry === 'Expense') {
            db.ref(`users/${decoded}/categories/expense/${id}`).remove()
        } else if (entry === 'Income'){
            db.ref(`users/${decoded}/categories/income/${id}`).remove()
        }
    }
}

const AddBudget = ({month, year, category, budget}) => {
    const ucook = Cookies.get('userId');
 
    const decoded = jwt.decode(ucook, { header: true })
    return(dispatch) => {
        db.ref(`users/${decoded}/budget/${year}/${month}/${category}`).update({budget});
    }
}

export {startAddExpenseCategory, startAddIncomeCategory,removeCategory,AddBudget}