import db from '../src/firebase/firebase';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken'; 
import cookie from 'cookie';
import Transactions from '../src/components/Transactions';
import Navigation from '../src/components/Navigation';
import withAuth from '../src/utils/withAuth';


const TransactionsPage = (props) => {

  let sortedTlist = props.transactions.reverse();
  // console.log(props.pg, 'hello');
  // console.log(props.transactions, 'yello');
  
    return(
        <div className="outer-container">
          <Navigation />
          <div className="transaction-page-content">
                
              <Transactions TList={sortedTlist}/>
          </div>
            
        </div>
    )
}

export const getServerSideProps = async(context) => {

  let decoded = 'dGZZ2xH3toXlfGU2W2F5iifEkMJ3';
  if(context.req.headers.cookie){
    const parsedCookies = cookie.parse(context.req.headers.cookie)
    decoded = jwt.decode(parsedCookies.userId, { header: true })
  }
  
  
 
  let listOfTransactions = [];
   const dbreq = await db.ref(`users/${decoded}/transactions`)
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

  // let gg = [];
  // const dbreq3 =  await db.ref(`users/${decoded}/transactions`)
  // .once('value')
  // .then((snapshot) => snapshot.val())
  // .then((val) => {
  //   Object.keys(val).map((key) => {
  //     if(val[key].aid === "-MQvjtVQCSg6EoQkglLb"){
  //       gg.push(val[key])
  //     }
  //   })
  // })
  // let gg = listOfTransactions.filter((e) => {
  //   return e.aid !== "-MPo56q9yeg9BFNtzu0a"
  // })
  // let fiji = [];
  // Object.keys(gg).map((key) => {
  //   fiji.push({
  //     id: gg[key].id,
  //     ...gg[key]
  //   })
  // })


  
  return {
    props : {
      transactions: [...listOfTransactions]
    }
  }
}




// export default TransactionsPage;
const mapStateToProps = () => {
    return {
       
    };
  };

  
  // export default connect(mapStateToProps)(TransactionsPage);
  export default connect(mapStateToProps)(withAuth(TransactionsPage));



  //// // import React, {useState} from 'react';

// // import {useForm, Controller } from 'react-hook-form';
// // import {SingleDatePicker} from 'react-dates';
// // import 'react-dates/initialize';
// // import moment from 'moment';

// // const test = () => {
// //     const [ cA, setcA] = useState(moment())
// //     const [focus, setFocus] = useState(null);
// //     console.log(focus)
// //     const {register, handleSubmit,control, errors, reset} = useForm({
// //         mode: "onChange",
// //         shouldFocusError: true,
// //         shouldUnregister: true,
// //     });

// //     const formData = (data) => {
// //         console.log(cA.toString(), data)
// //     }

// //     // const onDChange = (createdAt) =>{
// //     // }
// //     return(
        
// //         <div>

// //         <h4>Testing</h4>

// //         <form action="" onSubmit={handleSubmit(formData)}>
// //        <section>
        
// //        <SingleDatePicker
// //              date={cA}// momentPropTypes.momentObj or null
// //              onDateChange={date => {return (
// //                 // setcA(moment(date))
// //                 // console.log(date.toString())
// //                 setcA(date)
// //             )}} // PropTypes.func.isRequired
// //             focused={focus} // PropTypes.bool
// //             onFocusChange={ c => setFocus(c.focused)} // PropTypes.func.isRequired
// //             id="dates" // PropTypes.string.isRequired,
// //             />
        

// //        </section>
      
// //         <button type="submit">submit</button>
// //         </form>

// //         </div>
// //     )
// // }

// // export default test;
// // import '../styles/pages/_bj.scss';


// // const test = () => {
// //     return(

// //         <div className="test-me-now">
// //             <h2>Hello GG</h2>
// //         </div>
// //     )
// // }


// // export default test;




// import {auth} from '../src/firebase/firebase'


// const Index = () => {

// auth.onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     Router.push('/')
//   } else {
//     // No user is signed in.
//     // console.log('not hello')
//   }
// });

//   return (
//       <div>
//         <h4>This is the landing page</h4>
//       </div>

//   )
// }

// export const getServerSideProps = () => {
  
//    return {
//     props : {
      
//     }
//   }
// }


// export default Index;


