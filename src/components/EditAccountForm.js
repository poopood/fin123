import React,{useState} from 'react';
import { connect } from 'react-redux';
import {useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import {groupedOptions} from '../utils/data';
import {startAddAccount, startEditAccount, startRemoveAccount,startRemovingRelatedTransactions} from '../actions/AccountActions';
import  Router from 'next/router';
import moment from 'moment'; 
import NumberFormat from "react-number-format";
// import Modal from 'react-overlays/Modal';
// import PureModal from 'react-pure-modal';
import  {useToast}  from "@chakra-ui/toast";
import { Button, Lorem } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";



const EditAccountForm = (props) => {
  
    


    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState('');
    const {register, handleSubmit,control, errors, reset} = useForm({
        mode: "onChange",
        shouldFocusError: true,
        shouldUnregister: true,
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const finalRef = React.useRef()


    const toast = useToast();
    const id = "test-toast";

    const toastFunc = () => {
        if (!toast.isActive(id)) {
        toast({
            id,
            title: "Transaction Added",
            status: "success",
            duration: 1000,
            isClosable: true,
            position:"bottom"
          })

        }
    }
    

    const formData = ({name,currency,currentAmount,account_type}) => {
        
 
        props.dispatch(startEditAccount({
            name,
            currentAmount : parseFloat(currentAmount.replace(/\D/g, "")),
            account_type: account_type.value[1].type,
            account_cat: account_type.value[0].cat,
            currency: currency.value,
            aid: props.aid
        }))
        
        toastFunc();
        setTimeout(() => {
            Router.push('/accounts')
        }, 350 )
        
        
    }

    const deleteAccount = () => {
      // props.dispatch(startRemoveAccount(props.aid))
      // startRemovingRelatedTransactions(props.aid)
      // console.log(props.aid)
      onClose();
      setTimeout(() => {
        Router.push('/accounts')
    }, 350 )
    }

   

    

    return (
        <div className="edit-account-form">
        <form onSubmit={handleSubmit(formData)}>
         <h3>Edit Account</h3>
        <label> Account Name &nbsp;<span /></label> 
            <input 
            defaultValue={props.account.name}
            type="text"
            name="name"
            ref={register({required: true, minLength: 5})} />
            {errors.name && errors.name.type === 'required' && <span>this is required 
            </span>}
            {errors.name && errors.name.type === 'minLength' && <span>Length of name should be atleast 5 charactors
            </span>}
            
            <br/><br/>

            <section>
            <label>Current Value  </label>
            <Controller
              as={NumberFormat}
              thousandSeparator
              name="currentAmount"
              className="i_amount"
              control={control}
              prefix={'$'}
              defaultValue={`${props.account.currentAmount}`}
            //   ref={register({required : true})}
              rules={{ required: true }}
            />
            {errors.amount && <p>please enter amount</p>}
          </section>
            <Controller
                name="currency"
                as={Select}
                options={[
                { value: "CAD", label: "CAD" },
                ]}
                defaultValue={{value:`${props.account.currency}`, label:`${props.account.currency}`}}
                control={control}
                rules={{ required: true }}
            />
            <p htmlFor="account_type">Choose  Account Type</p>
            <Controller
            // defaultValue={[{value:`${props.account.account_type}`, label:`${props.account.account_type}`}]}
            defaultValue={{value:[{cat: `${props.account.account_cat}`}, {type: `${props.account.account_type}`}], label:`${props.account.account_type}`}}
                name="account_type"
                as={Select}
                options={groupedOptions}
                control={control}
                rules={{ required: true }}
            />
            <br/>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Are You Sure</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <p>This will delete the account and all its accompanying transactions</p>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={deleteAccount}>
                    Yes Go Ahead
                  </Button>
                  
                </ModalFooter>
              </ModalContent>
            </Modal>
            <button 
            type="submit"
            name="submit" 
            className="submit"
            disabled={errors.name}
            >submit</button>
            {message && message}
            
        </form>
      
        <p>...or do you wish to delete this account?</p>
         <button
        className="submit submit-delete"
        onClick={onOpen}
        >Delete </button> 
        
        </div>
        
    )
}



// export default EditAccountForm;


const mapStateToProps = (state) => {
    return {
        
    };
};


export default connect(mapStateToProps)(EditAccountForm);