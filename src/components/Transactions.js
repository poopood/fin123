import React, {useState} from 'react';
import { connect } from 'react-redux';
import {  rmFromLib} from '../actions/TransactionsActions';
import  Router from 'next/router';
import moment from 'moment';
import Link from 'next/link';
import SearchInput, {createFilter} from 'react-search-input'


const KEYS_TO_FILTERS = ['name', 'labels']


const Transactions = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    
  
    let LofT = [];
   

    Object.keys(props.TList).forEach(child => {
      
        LofT.push({
            id: child,
            ...props.TList[child]
        })
        
    })


    const removeTransaction = (e) => {
        props.dispatch(rmFromLib(e))
        Router.push('/')
    }
  
    const searchUpdated = (term) => {
        setSearchTerm(term)
    }
    const filteredLofts= LofT.filter(createFilter(searchTerm, KEYS_TO_FILTERS))

    return(
        <div>
            
        <h3>TR List</h3>
                <div>
        <SearchInput className="search-input" onChange={searchUpdated} />
                   
                        {filteredLofts && filteredLofts.map((e, i) => {
                         
                            
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
        transactions : state.transactions
    };
};


export default connect(mapStateToProps)(Transactions);
