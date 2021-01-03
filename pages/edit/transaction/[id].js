import db from '../../../src/firebase/firebase';

import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import EditTransactionForm from '../../../src/components/EditTransactionForm';
import Link from 'next/link';

const TransactionToEdit = (props) => {

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };


    let accounts = props.accounts;
    let transaction = props.transaction[0];
    let transferAccount = [];

    let AccountsIDcat = [];
    let transactionLabels = [];
    


  let AddAccountsLink = [{'label':<Link href={`/add-account`}>
    
    
  <a>Add Account</a>
</Link>,isDisabled: true}]
  props.accounts.map((e) => {
    AddAccountsLink.unshift({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: <div style={groupStyles}><span>{e.name}</span>
        <span style={groupBadgeStyles}>${e.currentAmount}</span></div>})
  })



 
  accounts.map((e) => {
    if(transaction.aid === e.id){
        return(
          AccountsIDcat.push({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: e.name
               })
        )
    }
})

accounts.map((e) => {
  if(transaction.aid1 === e.id){
    return(
      transferAccount.push({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: e.name
           })
    )
}
})


props.transaction.map((e) => {
  return(
    transactionLabels.push(e.labels)
  )
})


 
    return(
        <div>
        <h4>Edit Transaction</h4>
        <EditTransactionForm transaction={props.transaction[0]} tid={props.tid} accounts={props.accounts} AddAccountsLink={AddAccountsLink} AccountsIDcat={AccountsIDcat}   expenseCats={props.expense} incomeCats={props.income} category={transaction.category} transactionLabels={transactionLabels} description={props.description} transferAccount={transferAccount}/>
        </div>

    )
}

export const getServerSideProps = async ({params, req}) => {

    let TransactionID = params.id

    
    let decoded = 'dGZZ2xH3toXlfGU2W2F5iifEkMJ3'
  if(req.headers.cookie){
    const parsedCookies = cookie.parse(req.headers.cookie)
    decoded = jwt.decode(parsedCookies.userId, { header: true })
  }

    let transactionToEdit = [];
    let expenseCategories = [];
    let incomeCategories = [];
   const dbreqTransaction = await db.ref(`users/${decoded}/transactions/${TransactionID}`)
  .once('value')
      .then((snapshot) => snapshot.val())
      
      .then((val) => {
        transactionToEdit.push(val)

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })
 let transactionDescription;
  const dbreqTransactionID = await db.ref(`users/${decoded}/transactions/${TransactionID}/description`)
  .once('value')
      .then((snapshot) => {
        return(
          transactionDescription = snapshot.val()
        )
      })
      
      .catch((e) => {
      console.log('error fetching data', e)
  })

  let allAccounts = [];
     const dbreqAllAccounts = await db.ref(`users/${decoded}/accounts`)
    .once('value')
        .then((snapshot) => snapshot.val())
        .then((val) => {
          Object.keys(val).map((key) => {
            allAccounts.push({
              id: key,
              ...val[key]
            })
          }
          
          );
  
    })
        .catch((e) => {
        console.log('error fetching data', e)
    })

    // category 

    const dbreqAllExpenseCat = await db.ref(`users/${decoded}/categories/expense`)
  .once('value')
      .then((snapshot) => snapshot.val())
      .then((val) => {
        Object.keys(val).map((key) => {
          expenseCategories.push({
            id: key,
            ...val[key]
          })
        }
        
        );

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })
  const dbreqAllIncomeCat = await db.ref(`users/${decoded}/categories/income`)
  .once('value')
      .then((snapshot) => snapshot.val())
      .then((val) => {
        Object.keys(val).map((key) => {
          incomeCategories.push({
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
            transaction : [...transactionToEdit],
            tid: TransactionID,
            accounts: [...allAccounts],
            expense: [...expenseCategories],
            income:[...incomeCategories],
            description: transactionDescription
        }
    }

}

export default TransactionToEdit;