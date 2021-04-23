import React,{useState} from 'react';
import styled from 'styled-components';
import Modal from 'react-overlays/Modal';
import {FaPlus} from 'react-icons/fa';
import Link from 'next/link';

let rand = () => Math.floor(Math.random() * 20) - 10;

const Backdrop = styled("div")`
  position: fixed ;
  z-index: 1040 ;
  top: 0 ;
  bottom: 0 ;
  left: 0 ;
  right: 0 ;
  background-color: #000;
  opacity: 0.5;
`;

// we use some pseudo random coords so nested modals
// don't sit right on top of each other.
const RandomlyPositionedModal = styled(Modal)`
  position: fixed;
  width: 400px;
  z-index: 1040;
  // top: ${() => 50 + rand()}%;
  // left: ${() => 50 + rand()}%;
  border: 1px solid #e5e5e5;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  padding: 20px;
`;

function ModalExample() {
  const [show, setShow] = useState(false);

  const renderBackdrop = (props) => <Backdrop {...props} />;

  return (
    <div className="modal-example">
     {/*  <button
        // id="cheerios"
        type="button"
        // className="btn btn-primary mb-4"
        onClick={() => setShow(true)}
      >
        Open Modal
      </button> */}
       <span id="floating-btn" onClick={() => setShow(true)}>
            <FaPlus size="1.2rem" />
        </span> 
    

      <RandomlyPositionedModal
        show={show}
        onHide={() => setShow(false)}
        renderBackdrop={renderBackdrop}
        aria-labelledby="modal-label"
        id="cheerio"
      >
        <div className="add-modal">
          
          <ul>
           <Link href="/add-transaction"><li><a href="#"> <img src="images/add.png" alt=""/> Add Transaction</a></li></Link>
           <Link href="/add-transaction"><li> <img src="images/add-account.png" alt=""/><a href="#">Add Account</a></li></Link>
         </ul>
         
        </div>
      </RandomlyPositionedModal>
    </div>
  );
}

export default ModalExample;