import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { AddTransaction, removeTransaction, rmFromLib} from '../actions/TransactionsActions';
import fetch from 'isomorphic-unfetch';
import db from '../firebase/firebase';
import  Router from 'next/router';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import Link from 'next/link';
import SearchInput, {createFilter} from 'react-search-input'


const KEYS_TO_FILTERS = ['name', 'labels']


const Transactions = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    // const transactions = props.transactions;
    let LofT = [];
    // const LofT = props.TList;
    // console.log(LofT);
    
    // console.log(LofT)

    Object.keys(props.TList).forEach(child => {
        // console.log(props[child])
    
        LofT.push({
            id: child,
            ...props.TList[child]
        })
        
    })
    // console.log(LofT)
    // console.log(props.TList, 'decuid')
    // const TransactionList

    // useEffect(() => {
        
	// 	const transactions = JSON.parse(localStorage.getItem('LofT'));
    //     transactions.forEach(e => {
    //         LofT.push(e);
    //     })
    //     console.log(LofT)

	// 	return () => {};
    // }, [LofT]);
    
    // useEffect(() => {
    //     const ucook = Cookies.get('userId');
  
 
    //  const decoded = jwt.decode(ucook, { header: true })

    //  let p = [];
    //     db.ref(`users/${decoded}/transactions`)
    //  .once('value')
    //      .then((snapshot) => {
    //      const val = snapshot.val();
    //     //  var result = Object.keys(val).map((key) => {
    //     //     p.push(val[key])
    //     //  });

    //      Object.keys(val).forEach(child => {
    //         // console.log(props[child])
        
    //         p.push({
    //             id: child,
    //             ...val[child]
    //         })
            
    //     })

    //      console.log(p, 'pp')
    //         // p.push(val)
    
    //  })
    //      .catch((e) => {
    //      console.log('error fetching data', e)
    //  })
    //     console.log(p, 'sdf')
    // }, [LofT])

        // useEffect(
        // 	() => {
        // 		localStorage.setItem('LofT', JSON.stringify(LofT));
        // 	},
        // 	[ LofT ]
        //     );

    


    const removeTransaction = (e) => {
        props.dispatch(rmFromLib(e))
        Router.push('/')
    }
    // const fLoft = LofT.filter
    // console.log(serachTerm)
    const searchUpdated = (term) => {
        setSearchTerm(term)
    }
    const filteredLofts= LofT.filter(createFilter(searchTerm, KEYS_TO_FILTERS))
    // console.log(searchTerm)
    return(
        <div>
            
        <h3>TR List</h3>
                <div>
        <SearchInput className="search-input" onChange={searchUpdated} />
                    {/* <button onClick={() =>  props.dispatch(AddTransaction({name: 'shanil'}))}>hi</button> */}
                        {filteredLofts && filteredLofts.map((e, i) => {
                            // let aid1 = e.aid1? aid1 : '';
                            
                            return (
                                <div key={i}>
                                
                                {console.log(e ,'e')}
                                
                                
                                <hr/>
                                <p >{e.name}</p>
                               
                                <p>{e.createdAt && moment(e.createdAt).format('ll')}</p>
                                <p>{e.id && e.id}</p>
                                <p>Amount - {e.amount}</p>
                                <hr/>
                                <button onClick={() => 
                                    removeTransaction(e)
                                    // console.log(e)
                                    
                                }>Remove</button>
                                <br/>
                                <Link href={`edit/transaction/${e.id}`}>
                                    <a>Edit Transaction</a>
                                </Link>
                               
                                </div>
                                
                            )
                        })}
                
                </div>
        </div>
    )
}





const mapStateToProps = (state) => {
    return {
        transactions : state.transactions,
        formState : state.formState
    };
};


export default connect(mapStateToProps)(Transactions);
