import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { AddTransaction, removeTransaction} from '../src/actions/TransactionsActions';
// import fetch from 'isomorphic-unfetch';
import db from '../src/firebase/firebase';


const Transactions = (props) => {
    // const transactions = props.transactions;
    // console.log(props);
    console.log(props.TList)
    const miso = props.TList;
    const tr = []

    Object.keys(miso).forEach(child => {
        // console.log(props[child])
    
        tr.push({
            id: child,
            ...miso[child]
        })
        
    })
    console.log(tr);
    // console.log(tr);
    // props.forEach((child) => {
    //         tr.push({
    //             id :child.key,
    //             ...child.val()
    //         })
    //     })
        // console.log(tr, 'tr')
    // useEffect(() => {
	// 	const transactions = JSON.parse(localStorage.getItem('transactions'));
	// 	if (transactions) {
	// 		props.dispatch({
	// 			type: 'SETUP_TRANSACTIONS',
	// 			transactions
	// 		});
	// 	}
	// 	return () => {};
    // }, []);
    
    // useEffect(() => {
    //     const transactions = db.ref()
    //     .once('value')
    //         .then((snapshot) => {
    //         const val = snapshot.val().transactions;
    //         return val;
    //     })
    //         .catch((e) => {
    //             console.log('error fetching data', e)
    //     })
    // }, [])

        // useEffect(
        // 	() => {
        // 		localStorage.setItem('transactions', JSON.stringify(transactions));
        // 	},
        // 	[ transactions ]
        //     );




    return(
        <div>
            <p>hello from transactions</p>

                <div>
                    {/* <button onClick={() =>  props.dispatch(AddTransaction({name: 'shanil'}))}>hi</button> */}
                        {props.transactions && props.transactions.map((e, i) => {
                            return (
                                <div key={i}>
                                <p >{e.name}</p>
                                <p>{e.date && e.date}</p>
                                <p>{e.id && e.id}</p>
                                <hr/>
                                <button onClick={() => props.dispatch(removeTransaction(e.id))}>X</button>
                                </div>
                            )
                        })}
                
                </div>
        </div>
    )
}


// Transactions.getInitialProps = async () => {
//     const dbdb = db.ref()
//     .once('value')
//         .then((snapshot) => {
//         const val = snapshot.val().transactions;
//         return val;
//     })
//         .catch((e) => {
//         console.log('error fetching data', e)
//     })
//     // const transactions = [];

//     const libby =  dbdb.then((val) =>  val)
//     // console.log(typeof libby)
//     // const transactions = [];
//     // libby.forEach((child) => {
//     //     transactions.push({
//     //         id :child.key,
//     //         ...child.val()
//     //     })
//     // })
//     return libby;
//     // return dbdb.then((val) => val)
//     // return {
//     //     name: "shanil"
//     // }
// }




// const mapStateToProps = (state) => {
//     return {
//         transactions : state.transactions,
//         formState : state.formState
//     };
// };


// export default connect(mapStateToProps)(Transactions);

export default Transactions;