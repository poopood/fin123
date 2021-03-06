import React, {useState} from 'react';
import { connect } from 'react-redux';
import {  rmFromLib} from '../actions/TransactionsActions';
import  Router from 'next/router';
import moment from 'moment';
import Link from 'next/link';
import SearchInput, {createFilter} from 'react-search-input';
import {FaSearch} from 'react-icons/fa';
import {AiOutlineDelete} from 'react-icons/ai';
import {AiOutlineEdit} from 'react-icons/ai';
import {AiFillCaretDown} from 'react-icons/ai';
import {AiFillCaretUp} from 'react-icons/ai';
import {AiOutlineSearch} from 'react-icons/ai';
import  {useToast}  from "@chakra-ui/toast";





const KEYS_TO_FILTERS = ['name', 'labels']


const Transactions = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [add, setAdd] = useState(5);
    const toast = useToast();
    
    
    
  
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
        toast({
            title: "Deleted Transaction",
            status: "success",
            duration: 4000,
            isClosable: true
          })
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
        className="search-input" tabIndex="1" />
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
                              
                                <p className="transaction-amount">${e.amount.toLocaleString()}</p>
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
                             
                                <Link href={`edit/transaction/${e.id}`}><span 
                                className="transaction-btn btn-ed" ><AiOutlineEdit />
                                
                                     Edit 
                                </span></Link>
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


// <div className="dash-nav">
//           <div className="nav-content">
//             <div className="logo"></div>
//             <div className="home_links">
//               <ul>
//               <Link href="/dashboard">
//                 <li className="active"><img  src="/images/house.svg" alt=""/></li>

//                 </Link>
//                 <Link href="/transactions">
//                 <li><img src="/images/slist.svg" alt=""/></li>
//                 </Link>
                
                
//               </ul>
//             </div>
//             <div className="nav_links">
//                   <ul>
                  
//                   <li id="plus-icon">
                    
//                     <img src="/images/plus.svg" alt=""
//                     onClick={() => setAdd(!add)}
//                     />
//                     {add && <AddItem />}
                 
//                   </li>
//                     <li>
//                     <Link href="/accounts">
//                     <img src="/images/accounts.svg" alt=""/>
//                   </Link>
//                   </li>
//                     <li>
//                     <Link href={`/budget/${currentYear}/${currentMonth}`}>
//                     <img src="/images/budget.svg" alt=""/>
//                   </Link>
//                   </li>
//                     <li className="drop-caret"
//                     >
//                     <img src="/images/down-arrow.svg" alt=""
//                       onClick={() => setDrop(!drop)}
//                     />
//                    {/* <a onClick={LogoutUser} >Logout</a> */}

//                    { drop  && <DropItem />}
                 
                   
//                   </li>
      
//                   </ul>          
//             </div>
//             </div>
//         </div>