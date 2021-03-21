import Link from 'next/link';
import React,{useState, useEffect, useRef} from 'react';
import moment, { now } from 'moment';
import {useSpring, animated} from 'react-spring';
// import {LogoutUser} from '../src/actions/UserActions';
import {LogoutUser} from '../actions/UserActions';
import SideMenu from '../components/SideMenu';
import { useRouter } from "next/router";




const Navigation = () => {
    const router = useRouter();
    const [drop, setDrop] = useState(false);
  const [add, setAdd] = useState(false);

  let currentMonth = moment(new Date()).format('MMMM').toLowerCase();
  let currentYear = moment(new Date()).format('Y');

  {console.log(router.pathname, 'konichiwa')}


  ////
  const AddItem = () => {

    const addTRRef = useRef();
    

    useEffect(() => {

      let handler = (e) => {
        if(!addTRRef.current.contains(e.target)){
          setAdd(false);
        
      }
      }
      document.addEventListener("mousedown", handler);

      return () =>{
        document.removeEventListener("mousedown", handler);
        
      }

    }, [])
    const props = useSpring({opacity: 1, from: {opacity: 0}})
    return(
      <animated.div style={props}>
       <div id="add-item" ref={addTRRef}>
          <ul >
          
         <Link href="/add-transaction">
         <li>
         <img src="/images/add.png" alt=""/>
         <a href="#">Add Transaction</a> 
         </li>
         </Link>

         <Link href="/add-account">
         <li>
         <img src="/images/add-account.png" alt=""/>
        <a href="#">  Add Account</a>
        </li> 
        </Link> 
          </ul>
       </div>
       </animated.div>
    )
  }



  ///


  /////

  const DropItem = () => {
    const dropdownRef = useRef();
    

    useEffect(() => {

      let handler = (e) => {
        if(!dropdownRef.current.contains(e.target)){
          setDrop(false);
        
      }
      }
      document.addEventListener("mousedown", handler);

      return () =>{
        document.removeEventListener("mousedown", handler);
        
      }

    }, [])


    const props = useSpring({opacity: 1, from: {opacity: 0}})

    return(
     
      <animated.div style={props} >
      <div id="dropdown-logout" ref={dropdownRef} >
          <ul >
            <li>  
            <label class="switch">
            <input type="checkbox"/>
            <span class="slider round"></span>
            </label>
            <a href="#"> Night Mode</a></li>
            <li onClick={LogoutUser}><img src="/images/logout.svg" alt=""/><a href="#">Log Out</a></li>
            </ul>
      </div>
      </animated.div>
  
    
    )
  }


  /////



    return(
        <div className="dash-nav">
        <SideMenu />
          <div className="nav-content">
          <Link href="/dashboard"><div className="logo"></div></Link>
            <div className="home_links">
              <ul>
              <Link href="/dashboard">
                <li 
                
                className={(router.pathname === "/dashboard") ? "active": "inactive"}>
                {(router.pathname === "/dashboard") ? <img  src="/images/house.svg" alt=""/> : <img  src="/images/white-home.svg" alt=""/>}
                
                
                
                </li>

                </Link>
                <Link href="/transactions">
                <li
                className={(router.pathname === "/transactions") ? "active": "inactive"}>
                    
                {(router.pathname === "/transactions") ? <img  src="/images/shopping-list.svg" alt=""/> : <img src="/images/slist.svg" alt=""/>}
                
                </li>
                </Link>
                
                
              </ul>
            </div>
            <div className="nav_links">
                  <ul>
                  
                  <li id="plus-icon"
                  class="tooltip--bottom" data-tooltip="Add"
                  >
                    
                    <img src="/images/plus.svg" alt=""
                    onClick={() => setAdd(!add)}
                    />
                    {add && <AddItem />}
                 
                  </li>
                    <li 
                    class="tooltip--bottom" data-tooltip="Accounts">
                    <Link href="/accounts">
                    <img src="/images/accounts.svg" alt=""/>
                  </Link>
                  </li>
                    <li
                    class="tooltip--bottom" data-tooltip="Budget"
                    >
                    <Link href={`/budget/${currentYear}/${currentMonth}`}>
                    <img src="/images/budget.svg" alt=""/>
                  </Link>
                  </li>
                    <li className="drop-caret"
                    >
                    <img src="/images/down-arrow.svg" alt=""
                      onClick={() => setDrop(!drop)}
                    />
                   {/* <a onClick={LogoutUser} >Logout</a> */}

                   { drop  && <DropItem />}
                 
                   
                  </li>
      
                  </ul>          
            </div>
            </div>
        </div>
    )
}

export default Navigation;