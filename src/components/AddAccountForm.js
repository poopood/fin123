import React,{useState} from 'react';
import { connect } from 'react-redux';
import {useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import {groupedOptions} from '../utils/data';
import {startAddAccount} from '../actions/AccountActions';
import  Router from 'next/router';
import NumberFormat from "react-number-format";
import  {useToast}  from "@chakra-ui/toast";


const AddAccountForm = (props) => {
    const [message, setMessage] = useState('');
    const {register, handleSubmit,control, errors} = useForm({
        defaultValues : {
            category: [{value: 'food', label: 'food'}]
        },
        mode: "onChange",
        shouldFocusError: true,
        shouldUnregister: true,
    });

    const toast = useToast();
    const id = "test-toast";
    const toastFunc = () => {
        if (!toast.isActive(id)) {
        toast({
            id,
            title: "Account Added",
            status: "success",
            duration: 1000,
            isClosable: true,
            position:"bottom"
          })

        }
    }

    const formData = ({name,currency,currentAmount,account_type}) => {
        
     
        props.dispatch(startAddAccount({
            name,
            currentAmount : parseFloat(currentAmount.replace(/\D/g, "")),
            account_type: account_type.value[1].type,
            account_cat: account_type.value[0].cat,
            currency: currency.value
        }))
        toastFunc();
        setTimeout(() => {
            Router.push('/accounts')
        }, 350 )

    
        
    }

    return(
        <div className="add-account-form">
        <form onSubmit={handleSubmit(formData)}>
        <h3>Add Account  </h3>
        <label> Account Name &nbsp;<span /></label> 
            <input 
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
              defaultValue={'$0'}
            //   ref={register({required : true})}
              rules={{ required: true }}
            />
            {errors.amount && <p>please enter amount</p>}
          </section>

            <Controller
                name="currency"
                as={Select}
                options={[
               
                { value: "CAD", label: "CAD" }
               
                ]}
                defaultValue={[{value:"CAD", label:"CAD"}]}
                control={control}
                rules={{ required: true }}
            />
            <p htmlFor="account">Choose  Account Type</p>
            <Controller
                name="account_type"
                as={Select}
                options={groupedOptions}
                control={control}
                rules={{ required: true }}
            />
            <br/>
            <div className="button-container" >
            <button 
            type="submit"
            name="submit" 
            className="submit" 
            disabled={errors.name}
            >Add Account</button>
            </div>
            {message && message}
        </form>
        </div>
        
    )
}

// export default AddAccountForm;


const mapStateToProps = (state) => {
    return {
        transactions : state.transactions,

    };
};


export default connect(mapStateToProps)(AddAccountForm);