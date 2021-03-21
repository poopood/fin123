import React, {useState} from 'react';
import { connect } from 'react-redux';
import {  rmFromLib} from '../actions/TransactionsActions';
import  Router from 'next/router';
import moment from 'moment';
import Link from 'next/link';
import SearchInput, {createFilter} from 'react-search-input';
import {FaSearch} from 'react-icons/fa';
import {AiOutlineDelete} from 'react-icons/Ai';
import {AiOutlineEdit} from 'react-icons/Ai';
import {AiFillCaretDown} from 'react-icons/Ai';
import {AiFillCaretUp} from 'react-icons/Ai';
import {AiOutlineSearch} from 'react-icons/Ai';




const KEYS_TO_FILTERS = ['name', 'labels']


const Transactions = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [add, setAdd] = useState(5);
    
    
    
  
    let LofT = [];
   

    Object.keys(props.TList).forEach(child => {
      
        LofT.push({
            id: child,
            ...props.TList[child]
        })
        
    })



    const removeTransaction = (e) => {
        props.dispatch(rmFromLib(e))
        Router.push('/transactions')
    }
  
    const searchUpdated = (term) => {
        setSearchTerm(term)
    }
    const filteredLofts= LofT.filter(createFilter(searchTerm, KEYS_TO_FILTERS))

    return(
        <div className="tr-list-container">
            
        <h3> Transactions List</h3>
                <div>
        <div className="search-container">   
        <SearchInput id="search-input" onChange={searchUpdated} placeholder="Search Transactions by Title or Label" 
        className="search-input" tabindex="1" />
        <AiOutlineSearch className="search-icon"/>
        </div> 
        
        
                   
                        {filteredLofts && filteredLofts.slice(0, 10).map((e, i) => {
                            
                            
                            
                            return (
                                <div 
                           
                                key={i} 
                                
                                data-expense={(e.entry === "expense") && 'true'}
                                data-income={(e.entry === "income") && 'true'}
                                data-transfer={(e.entry === "transfer") && 'true'}
                                
                                className="transaction"
                                tabindex="2" 
                                
                                >
                                
                                
                                {/* {console.log(e ,'e')} */}
                                {console.log(e.entry)}
                                
                                <div className="transaction-content">
                                
                                
                                <p className="transaction-name">{e.name}</p>

                                {(e.entry === "expense") && <span className="transaction-entry"><AiFillCaretUp className="expense-caret" /> </span>}
                                {(e.entry === "income") && <span className="transaction-entry"><AiFillCaretDown className="income-caret"/> </span>}
                                {(e.entry === "transfer") && <span className="transaction-entry"> <AiFillCaretDown className="income-caret" /><AiFillCaretUp className="expense-caret" /> </span>}
                               
                                <p className="transaction-date" >{e.createdAt && moment(e.createdAt).format('ll')}</p>
                                <p className="transaction-description">{e.description} </p>
                              
                                <p className="transaction-amount">${e.amount}</p>
                                <p>Labels : {e.labels.map(e => {
                                    return(
                                        <span className="transaction-label">{e}&nbsp;</span>
                                
                                    )
                                })} </p>
                                
                                <span
                                className="transaction-btn btn-rm"
                                 onClick={() => 
                                    removeTransaction(e)
                                  
                                    // console.log(e)
                                    
                                }><AiOutlineDelete />Remove</span>
                             
                                <span 
                                className="transaction-btn btn-ed" ><AiOutlineEdit />
                                <Link href={`edit/transaction/${e.id}`}>
                                     Edit 
                                </Link></span>
                                </div>
                                
                      
                               
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
