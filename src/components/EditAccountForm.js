import React,{useState} from 'react';
import { connect } from 'react-redux';
import {useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import {groupedOptions} from '../utils/data';
import {startAddAccount, startEditAccount} from '../actions/AccountActions';
import  Router from 'next/router';
import moment from 'moment'; 
import NumberFormat from "react-number-format";


const EditAccountForm = (props) => {
    // console.log(props.account.name)
    



    const [message, setMessage] = useState('');
    const {register, handleSubmit,control, errors, reset} = useForm({
        mode: "onChange",
        shouldFocusError: true,
        shouldUnregister: true,
    });

    const formData = ({name,currency,currentAmount,account_type}) => {
        
        // const valAcc = account_type.value[1].type
        // console.log(account_type[0].value[0].cat, account_type[0].value[1].type)
        // console.log(account_type.value[1].type, account_type.value[0].cat, currency.value)
        
        props.dispatch(startEditAccount({
            name,
            currentAmount : parseFloat(currentAmount.replace(/\D/g, "")),
            account_type: account_type.value[1].type,
            account_cat: account_type.value[0].cat,
            currency: currency.value,
            aid: props.aid
        }))
        
        setMessage('thank you');
        setTimeout(() => {
            Router.push('/accounts')
        }, 350 )
        
        
    }
    return (
        <>
        <form onSubmit={handleSubmit(formData)}>
        <label> Account Name &nbsp;<span />
            <input 
            defaultValue={props.account.name}
            type="text"
            name="name"
            ref={register({required: true, minLength: 5})} />
            {errors.name && errors.name.type === 'required' && <span>this is required 
            </span>}
            {errors.name && errors.name.type === 'minLength' && <span>Length of name should be atleast 5 charactors
            </span>}
            </label> 
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
                { value: "USD", label: "USD" },
                { value: "CAD", label: "CAD" },
                { value: "EUR", label: "EUR" }
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
            <button 
            type="submit"
            name="submit" 
            disabled={errors.name}
            >submit</button>
            {message && message}
        </form>
        <button>Delete</button>
        </>
    )
}



// export default EditAccountForm;


const mapStateToProps = (state) => {
    return {
        
    };
};


export default connect(mapStateToProps)(EditAccountForm);