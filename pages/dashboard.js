import React,{useEffect} from 'react';
// import Link from 'next/link';
import { connect } from 'react-redux';
import {LogoutUser} from '../src/actions/UserActions';
import moment, { now } from 'moment';
import ExpensesCatChart from '../src/components/charts/ExpensesCatChart';
import AssetLiabilityChart from '../src/components/charts/AssetLiabilityChart';
import jwt from 'jsonwebtoken'; 
import cookie from 'cookie';
import db from '../src/firebase/firebase'
import IncomeCatChart from '../src/components/charts/IncomeCatChart';
import NetIncomeChart from '../src/components/charts/NetIncomeChart';
// import {useSpring, animated} from 'react-spring';
// import {ClickOutside} from "reactjs-click-outside";
// import Example from '../src/components/SideMenu';
import ModalExample from '../src/components/ModalPop';
// import {FaPlus} from 'react-icons/fa';
// import FloatingButton from '../src/components/FloatingButton';
import Navigation from '../src/components/Navigation';
import {auth} from '../src/firebase/firebase';
import  Router from 'next/router';
import withAuth from '../src/utils/withAuth';
import array from 'lodash';




// import firebase from '../src/firebase/firebase'


const Dashboard = (props) => {
  
  // const [showM, setShowM] = useState(false);
  // const [drop, setDrop] = useState(false);
  // const [add, setAdd] = useState(false);

//  useEffect(() => {
//   auth.onAuthStateChanged(function(user) {
//     if (!user) {
//       LogoutUser()
//     } else {
//     }
//   })
//    return () => {
     
//    }
//  }, [])
  
  // console.log(props.accounts, 'accounts 234')
 
  

  let todaysDate= moment(new Date()).format("DD/MM/YYYY");

  
  
  let currentMonth = moment(new Date()).format('MMMM');
  // console.log(currentMonth, 'currentmonth')

  let startCmonth = moment().clone().startOf('month').format('YYYY-MM-DD hh:mm');
  let endCmonth = moment().clone().endOf('month').format('YYYY-MM-DD hh:mm');

  // let currentYear = moment(new Date()).format('Y');

  // console.log(currentMonth,'currentYear');

//net worth calculation
  let assetAccounts = [];
  let liabilityAccounts = [];
  let netWorth = 0;  

props.accounts.map(e => {
  if(e.account_cat === 'Assets'){
      return (
          assetAccounts.push(e)
      )
  } else if(e.account_cat === 'Liabilities'){
      return (
          liabilityAccounts.push(e)
      )
  }
})
assetAccounts.map(e => {
  return(
      netWorth += e.currentAmount
  )
})
liabilityAccounts.map(e => {
  return(
      netWorth -= e.currentAmount
  )
})


  //net worth calculation



  let lofT = [];
  let eCatLabels = [];
  let iCatLabels = [];
  let eChartData = [];
  let iChartData = [];
  let accountChartData = [{
    'label': 'net worth',
    'data' :[ 0, 0, netWorth],
    'backgroundColor': "#" + ((1<<24)*Math.random() | 0).toString(16)
  }];
  // let sortedLoft = lofT.reverse();

  // let sortedLoft  = _.orderBy(lofT, (e) => {
  //   return moment(e.createdAt.format('YYYYMMDD')
  // }, ['desc']);

  // let sortedLoft = _.orderBy(lofT, (e) => {
  //   return

  //     moment(e.createdAt).format('YYYYMMDD')},['desc'])
      //  moment(e.createdAt.format('YYYYMMDD'))},['desc'])


 
  // console.log(lofT, 'unsorted');



  props.transactions && props.transactions.map(e => {
    // console.log(moment(e.createdAt).isSame(new Date(), 'year') && );
    lofT.push(e);
  })
  props.expenseCats.map(e => {
    eCatLabels.push(e.label);
  })
  props.incomeCats.map(e => {
    iCatLabels.push(e.label);
  })

   eCatLabels.map((e,i) => {
    // console.log(e);
    props.transactions.map(t => {
        if(t.entry === 'expense'){
          if(t.category.label == e){
            eChartData.push({'name':e, 'count' : t.amount})
          }
        }
    })
  })

  iCatLabels.map((e,i) => {
    // console.log(e);
    props.transactions.map(t => {
        if(t.entry === 'income'){
          if(t.category.label == e){
            iChartData.push({'name':e, 'count' : t.amount})
          }
        }
    })
  })


 let allExpenseValues = [];
 let allExpenseValuesCMonth= [];

 let allIncomeValues = [];
 let allIncomeValuesCMonth= [];


lofT.map(e => {
  if(e.entry === 'expense'){
    // console.log(e, 'eee')
    allExpenseValues.push(e.amount)
  } else if( e.entry === 'income'){
    allIncomeValues.push(e.amount)
  }
})


lofT.map(e => {
  if(e.entry === 'expense'){
    // console.log(e, 'eee')
    if(moment(e.createdAt).isBetween(startCmonth, endCmonth)){
      allExpenseValuesCMonth.push(e.amount)
    }
  } else if( e.entry === 'income'){
    if(moment(e.createdAt).isBetween(startCmonth, endCmonth)){
      allIncomeValuesCMonth.push(e.amount)
    }
  }

  
})

// console.log(allIncomeValuesCMonth, 'allIncomeValuesCMonth');


let TallExpenseValuesCMonth = _.sum(allExpenseValuesCMonth);
let TallallIncomeValuesCMonth = _.sum(allIncomeValuesCMonth);
console.log(TallExpenseValuesCMonth, 'total')
console.log(TallallIncomeValuesCMonth, 'total')

// allExpenseValuesCMonth.map((e, i) => {
//   TallExpenseValuesCMonth += e[i]
// })



let totalExpense = allExpenseValues.reduce((a, b) => a + b, 0);
let totalIncome  = allIncomeValues.reduce((a, b) => a + b, 0);

let netIncome = (totalIncome -  totalExpense)
console.log(totalExpense, totalIncome,netIncome, 'expense and income values');

  // console.log(allExpenseTrForTheMonth, allIncomeTrForTheMonth)
 let AssetsData = [];
 let LiabilityData = [];








  props.accounts.map(e => {
   if(e.account_cat === 'Assets'){
     accountChartData.push({
       'label': e.name,
       'data' :[ e.currentAmount, 0],
       'backgroundColor': "#" + ((1<<24)*Math.random() | 0).toString(16)
     })
     AssetsData.push(e.currentAmount);
   } else {
    accountChartData.push({
      'label': e.name ,
      'data' :[ 0, e.currentAmount],
      'backgroundColor': "#" + ((1<<24)*Math.random() | 0).toString(16)
    })
    LiabilityData.push(e.currentAmount);
   }
  // accountChartData.push({
  //   'label': e.name,
  //   'cat' : e.account_cat
  // })
  })



const result = Object.values(eChartData.reduce((c, {name,count}) => {
  c[name] = c[name] || {name,count: 0};
  c[name].count += count;
  return c;
}, {}));


const result1 = Object.values(iChartData.reduce((c, {name,count}) => {
  c[name] = c[name] || {name,count: 0};
  c[name].count += count;
  return c;
}, {}));


let TotalAssetsValue = _.sum(AssetsData);
let TotalLiabilityValue = _.sum(LiabilityData);

  // const passablefunc = () => {
  
  // let  sortedLoft2 = lofT.reverse();

  // }
  

  return (
    <div className="outer-container">
    
      
        <Navigation />
      
      
        <div className="dash_body_content">
        <div id="cool-data">
          <div className="data-card" title="FEB" >
          <img src="/images/expense2.png" alt=""/>
          
            <p  >Total Expenses ({currentMonth})</p>
             
           
            <p>${TallExpenseValuesCMonth.toLocaleString()}</p>
            
            
            
            
          </div>
          <div className="data-card" title="for the month of February" >
          <img src="/images/income2.png" alt=""/>
            <p>Total Income ({currentMonth}) </p>
         
           
            <p>${TallallIncomeValuesCMonth.toLocaleString()}</p>
            
          </div>
          <div className="data-card" title="'12/21">
          <img src="/images/assets.png" alt=""/>
            <p>Total Assets ({todaysDate}) </p>
            
            <p>${TotalAssetsValue.toLocaleString()}</p>
            
          </div>
          <div className="data-card" title="'12/21">
          <img src="/images/liabilities.png" alt=""/>
            <p>Total Liabilities  ({todaysDate}) </p>
           
            <p>${TotalLiabilityValue.toLocaleString()}</p>
            
          </div>
         
        </div>

       
        <div id="charts">
        <div className="chart chart1">
        <ExpensesCatChart result={result}/>
        </div>
        <div className="chart chart2">
        <IncomeCatChart result1={result1}/>
        </div>
        <div className="chart chart3">
        <AssetLiabilityChart accountChartData={accountChartData}/>
        </div>
        <div className="chart chart4">
        <NetIncomeChart totalExpense={totalExpense} totalIncome={totalIncome} netIncome={netIncome}/>
        </div>
         <ModalExample />
        </div>
      
        

      
        
    </div>
    
    </div>
  )
}


export const getServerSideProps = async (context) => {
  // var userName = localStorage.getItem('userN');

  let decoded = 'dGZZ2xH3toXlfGU2W2F5iifEkMJ3';
 
  if(context.req.headers.cookie){
    const parsedCookies = cookie.parse(context.req.headers.cookie)
    decoded = jwt.decode(parsedCookies.userId, { header: true })

  }

  let userExpenseCategories = [];
  
  let userIncomeCategories = [];
  let listOfTransactions = [];
  let userAccounts = [];

 

  const dbreqExpense = await db.ref(`users/${decoded}/categories/expense`)
  .once('value')
      .then((snapshot) => snapshot.val())
      .then((val) => {
        Object.keys(val).map((key) => {
          userExpenseCategories.push({
            id: key,
            ...val[key]
          })
        }
        
        );

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })

//////


//////

  
  const dbreqIncome= await db.ref(`users/${decoded}/categories/income`)
  .once('value')
      .then((snapshot) => snapshot.val())
      .then((val) => {
        Object.keys(val).map((key) => {
          userIncomeCategories.push({
            id: key,
            ...val[key]
          })
        }
        
        );

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })
  // .orderByChild("createdAt").startAt(moment().startOf('month').format("YYYY-DD-MM")).endAt(moment().endOf("month").format("YYYY-DD-MM"))
  const dbreq = await db.ref(`users/${decoded}/transactions`)
  .orderByChild("createdAt")
  .startAt(moment().startOf('month').format("YYYY-DD-MM"))
  .endAt(moment().endOf("month").format("YYYY-DD-MM"))
  .once('value')
      .then((snapshot) => snapshot.val())
      .then((val) => {
        Object.keys(val).map((key) => {
          listOfTransactions.push({
            id: key,
            ...val[key]
          })
        }
        
        );

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })



  const dbreqAccounts = await db.ref(`users/${decoded}/accounts`)
  .once('value')
      .then((snapshot) => snapshot.val())
      .then((val) => {
        Object.keys(val).map((key) => {
          userAccounts.push({
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
      expenseCats: [...userExpenseCategories],
      incomeCats:[...userIncomeCategories],
      transactions: [...listOfTransactions],
      accounts:[...userAccounts]
    }
  }


}



const mapStateToProps = () => {
  return {
      
  };
};


// export default connect(mapStateToProps)(Dashboard);
export default connect(mapStateToProps)(withAuth(Dashboard));

