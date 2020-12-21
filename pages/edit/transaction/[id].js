import db from '../../../src/firebase/firebase';
// import Cookies from 'js-cookie';
// import {LogoutUser} from '../src/actions/UserActions';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import EditTransactionForm from '../../../src/components/EditTransactionForm';
import Link from 'next/link';

const ss = (props) => {
  console.log(props,'drops son');
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
    // console.log(props.transaction[0])
    // let transaction = props.transaction[0];

    let accounts = props.accounts;
    let transaction = props.transaction[0];

    // let cats = [];
    let dogs = [];
    let bats = [];
    let visigoths = [];
    let burrito = [];
    
  //   {transaction.category && transaction.category.map(e =>  {
  //     return(
  //         bats.push({label:e.capitalize() , value:e})
  //         // [...cats,{label: e, value: e}]
  //     )
  // })}

  let cats = [{'label':<Link href={`/add-account`}>
    
    
  <a>Add Account</a>
</Link>,isDisabled: true}]
  props.accounts.map((e) => {
      cats.unshift({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: <div style={groupStyles}><span>{e.name}</span>
        <span style={groupBadgeStyles}>${e.currentAmount}</span></div>})
  })



  //   accounts.map(e => {
  //     return(
  //         cats.push({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: <div style={groupStyles}><span>{e.name}</span>
  //             <span style={groupBadgeStyles}>${e.currentAmount}</span></div>})
  //     )
  // })
  accounts.map((e) => {
    if(transaction.aid === e.id){
        return(
            dogs.push({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: e.name
               })
        )
    }
})
accounts.map((e) => {
  if(transaction.aid1 === e.id){
    return(
        visigoths.push({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: e.name
           })
    )
}
})

props.transaction.map((e) => {
  return(
    burrito.push(e.labels)
  )
})


    // console.log(props.accounts,'lucian')
    return(
        <div>
        <h4>Edit Transaction</h4>
        <EditTransactionForm transaction={props.transaction[0]} tid={props.tid} accounts={props.accounts} cats={cats} dogs={dogs} bats={bats} visigoths={visigoths} expenseCats={props.expense} incomeCats={props.income} category={transaction.category} burrito={burrito} description={props.description} />
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
    let Ecats = [];
    let Icats = [];
   const dbdb = await db.ref(`users/${decoded}/transactions/${pinter}`)
  .once('value')
      .then((snapshot) => snapshot.val())
      
      .then((val) => {
        kist.push(val)

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })
 let dbdesc;
  const dbdb5 = await db.ref(`users/${decoded}/transactions/${pinter}/description`)
  .once('value')
      .then((snapshot) => {
        return(
          dbdesc = snapshot.val()
        )
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

    // category 

    const dbdb1 = await db.ref(`users/${decoded}/categories/expense`)
  .once('value')
      .then((snapshot) => snapshot.val())
      .then((val) => {
        Object.keys(val).map((key) => {
            Ecats.push({
            id: key,
            ...val[key]
          })
        }
        
        );

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })
  const dbdb2 = await db.ref(`users/${decoded}/categories/income`)
  .once('value')
      .then((snapshot) => snapshot.val())
      .then((val) => {
        Object.keys(val).map((key) => {
          Icats.push({
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
            accounts: [...mist],
            expense: [...Ecats],
            income:[...Icats],
            description: dbdesc
        }
    }

}

export default ss;