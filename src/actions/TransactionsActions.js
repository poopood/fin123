
import db from '../firebase/firebase';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import  Router from 'next/router';


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
        description = '',
        category  = {value: 'other', label: 'other'},
        labels = ['other'],
        createdAt = moment().toString(),
        amount = 0,
        aid = 'lkjasd',
    }
    = {}
) => {

    
    const transaction = {name, entry,account_type,account_cat, description, category,createdAt, amount,aid, labels }
    const ucook = Cookies.get('userId');
 
    const decoded = jwt.decode(ucook, { header: true })


    return (dispatch) => {
          
        
        
        db.ref(`users/${decoded}/transactions`).push(transaction).then((ref) => {
            dispatch(AddTransaction({
                id:ref.key,
                ...transaction
            }));
        })
        if(transaction.entry === 'expense'){
            db.ref(`users/${decoded}/accounts/${aid}`).once('value')
        .then((snapshot) => {
           let dbData = snapshot.val();   
            if(dbData.account_cat === 'Assets'){
                let currentValue = dbData.currentAmount - amount;
                
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            } else {
                let currentValue = dbData.currentAmount + amount;
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            }
            
            

        })
        } else {
            db.ref(`users/${decoded}/accounts/${aid}`).once('value')
        .then((snapshot) => {
           let dbData = snapshot.val();   
            if(dbData.account_cat === 'Assets'){
                let currentValue = dbData.currentAmount + amount;
                
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            } else {
                let currentValue = dbData.currentAmount - amount;
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            }
            
  
        })
        }
       
        
    };
    
}




const startAddTransferTransaction = (
    {
        name = 'Unknown',
        entry =  'transfer',
        account_type = 'assets',
        account_cat = '',
        account1_type = '',
        account1_cat = '',
        description = '',
        labels = ['other'],
        createdAt = moment().toString(),
        amount = 0,
        aid = 'lkjasd',
        aid1 = 'lkjasd'
    }
    = {}
) => {
    
    const transaction = {name, entry,account_type,account_cat, description,createdAt, amount,aid, account1_type,account1_cat,aid1, labels }
    const ucook = Cookies.get('userId');
 
    const decoded = jwt.decode(ucook, { header: true })
 
    return (dispatch) => {
        
        db.ref(`users/${decoded}/transactions`).push(transaction).then((ref) => {
            dispatch(AddTransaction({
                id:ref.key,
                ...transaction
            }));
        })
     
            db.ref(`users/${decoded}/accounts/${aid}`).once('value')
        .then((snapshot) => {
           let dbData = snapshot.val();
        


            if(dbData.account_cat === 'Assets'){
                let currentValue = dbData.currentAmount + amount;
                
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            } else {
                let currentValue = dbData.currentAmount - amount;
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            }

            db.ref(`users/${decoded}/accounts/${aid1}`).once('value')
        .then((snapshot) => {
           let dbData = snapshot.val();    

            if(dbData.account_cat === 'Assets'){
                let currentValue = dbData.currentAmount - amount;
                console.log(currentValue,'sdf')
                
                db.ref(`users/${decoded}/accounts/${aid1}`).update({currentAmount: currentValue})
            } else {
                let currentValue = dbData.currentAmount + amount;
                db.ref(`users/${decoded}/accounts/${aid1}`).update({currentAmount: currentValue})
            }
            
            
        })  
            
            
        })
          
        
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
        description = '',
        category  =  {value: 'other', label: 'other'},
        createdAt = moment().toString(),
        prevAmount = 0,
        amount = 0,
        aid = 'lkjasd',
        tid = 'gg',
        labels = ['other'],
        
        
}
 = {}) => {
    
    const transaction = {name, entry,account_type,account_cat, description, category,createdAt, amount, aid,labels }
    const ucook = Cookies.get('userId');

    const decoded = jwt.decode(ucook, { header: true })

    return (dispatch) => {
        
        db.ref(`users/${decoded}/transactions/${tid}`).update(transaction).then(() => {
            dispatch(EditTransaction({
                ...transaction
            }));
        })

        if(transaction.entry === 'expense'){ 
        db.ref(`users/${decoded}/accounts/${aid}`).once('value')
        .then((snapshot) => {
           let dbData = snapshot.val();   
            if(dbData.account_cat === 'Assets'){
                let changeAmount = prevAmount - amount ;
                let currentValue = dbData.currentAmount + changeAmount;
                
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
             
            } else {
                let changeAmount = prevAmount - amount;
                let currentValue = dbData.currentAmount - changeAmount;
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            }
            
        

            })}
    };
}



const startEditTransferTransaction = (
    {
        name = 'Unknown',
        entry =  'transfer',
        account_type = 'assets',
        account_cat = '',
        account1_type = '',
        account1_cat = '',
        description = '',
        createdAt = moment().toString(),
        prevAmount = 0,
        amount = 0,
        aid = 'lkjasd',
        aid1 = 'lkjasd',
        tid = 'gg',
        labels = ['other'],
    } = {}) => {
        const transaction = {name, entry,account_type,account_cat, description,createdAt, labels,amount,aid, account1_type,account1_cat,aid1 }
        const ucook = Cookies.get('userId');
 
        const decoded = jwt.decode(ucook, { header: true })

        return(dispatch) => {
            db.ref(`users/${decoded}/transactions/${tid}`).update(transaction).then(() => {
                dispatch(EditTransaction({
                    ...transaction
                }));
            }) 
            ///
            db.ref(`users/${decoded}/accounts/${aid}`).once('value')
        .then((snapshot) => {
           let dbData = snapshot.val();
        


            if(dbData.account_cat === 'Assets'){
                let changeAmount = amount - prevAmount ;
                let currentValue = dbData.currentAmount + changeAmount;
                
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            } else {
                let changeAmount = amount - prevAmount;
                let currentValue = dbData.currentAmount - changeAmount;
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            }

            db.ref(`users/${decoded}/accounts/${aid1}`).once('value')
        .then((snapshot) => {
           let dbData = snapshot.val();    

            if(dbData.account_cat === 'Assets'){
                let changeAmount = amount - prevAmount ;
                let currentValue = dbData.currentAmount - changeAmount;
                console.log(currentValue,'sdf')
                
                db.ref(`users/${decoded}/accounts/${aid1}`).update({currentAmount: currentValue})
            } else {
                let changeAmount = amount - prevAmount ;
                let currentValue = dbData.currentAmount + changeAmount;
                db.ref(`users/${decoded}/accounts/${aid1}`).update({currentAmount: currentValue})
            }
            
            
        })  
            
            
        })


        }


    }





const removeTransaction= (id) => ({
    type : 'REMOVE_TRANSACTION',
    id
})

const rmFromLib = (e) => {
    let {id, aid, amount, entry} = e;
    let aid1;
    if(e.aid1){
        aid1 = e.aid1;
    }
    const ucook = Cookies.get('userId');
 
    const decoded = jwt.decode(ucook, { header: true })
 
    return (dispatch) => {

         if(entry === 'expense'){
        db.ref(`users/${decoded}/accounts/${aid}`).once('value')
        .then((snapshot) => {
           let dbData = snapshot.val();   
            if(dbData.account_cat === 'Assets'){
                let currentValue = dbData.currentAmount + amount;
                
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            } else {
                let currentValue = dbData.currentAmount - amount;
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            }
            
       
            
        })
           

        
        } else if ( entry === 'income') {
            db.ref(`users/${decoded}/accounts/${aid}`).once('value')
        .then((snapshot) => {
           let dbData = snapshot.val();   
            if(dbData.account_cat === 'Assets'){
                let currentValue = dbData.currentAmount - amount;
                
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            } else {
                let currentValue = dbData.currentAmount + amount;
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            }
            
           
            
        })
        } else {


            db.ref(`users/${decoded}/accounts/${aid}`).once('value')
        .then((snapshot) => {
           let dbData = snapshot.val();
        


            if(dbData.account_cat === 'Assets'){
                let currentValue = dbData.currentAmount - amount;
                
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            } else {
                let currentValue = dbData.currentAmount + amount;
                db.ref(`users/${decoded}/accounts/${aid}`).update({currentAmount: currentValue})
            }

            db.ref(`users/${decoded}/accounts/${aid1}`).once('value')
        .then((snapshot) => {
           let dbData = snapshot.val();    

            if(dbData.account_cat === 'Assets'){
                let currentValue = dbData.currentAmount + amount;
                console.log(currentValue,'sdf')
                
                db.ref(`users/${decoded}/accounts/${aid1}`).update({currentAmount: currentValue})
            } else {
                let currentValue = dbData.currentAmount - amount;
                db.ref(`users/${decoded}/accounts/${aid1}`).update({currentAmount: currentValue})
            }
            
            
        })  
            
            
        })




        }


        db.ref(`users/${decoded}/transactions`).child(id).remove().then(() => {
            dispatch(removeTransaction(id));
            Router.push('/')

        })
    }
    
}


export {AddTransaction, removeTransaction, startAddTransaction, rmFromLib, startEditTransaction,startAddTransferTransaction,startEditTransferTransaction};

