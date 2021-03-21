import { slide as Menu } from 'react-burger-menu';
import Link from 'next/link';
import * as FaIcons from 'react-icons/fa';
import {FaHome} from 'react-icons/fa';
import {FaLandmark} from 'react-icons/fa';
import {FaRegListAlt} from 'react-icons/fa';
import {FaFileInvoiceDollar} from 'react-icons/fa';
import {FaSignOutAlt} from 'react-icons/fa';

import {LogoutUser} from '../actions/UserActions';

import moment, { now } from 'moment';


class SideMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();
   
  }

  

  render () {
    let currentMonth = moment(new Date()).format('MMMM');
    let currentYear = moment(new Date()).format('Y');
    
    return ( 
      
      <Menu left 
        customCrossIcon={ <FaIcons.FaTimes color="#373A47"/> }
      >
        <div className="logo"></div>

        <div id="mobile-nav-wrap">
      
          <ul>

            <Link href="/dashboard">
            <li><a href=""><FaHome size="1.5rem" /> Home</a>
                        
            </li> 
            </Link>
            <Link href="/transactions">
            <li><a href=""><FaRegListAlt size="1.5rem"/> Transactions</a></li> 
            </Link>
            <Link href="/accounts">
            <li><a href=""><FaLandmark size="1.5rem" /> Accounts</a></li> 
            </Link>
            
            <Link href={`/budget/${currentYear}/${currentMonth}`}>
            <li><a href=""><FaFileInvoiceDollar size="1.5rem" /> Budget</a></li> 
            </Link>
            
            <li  onClick={LogoutUser}><a href=""><FaSignOutAlt size="1.5rem" /> Logout</a></li> 
            
            
          </ul>
        
        </div>
      
      </Menu>
    );
  }
}


export default SideMenu;