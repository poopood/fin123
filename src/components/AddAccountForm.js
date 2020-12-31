import React,{useState} from 'react';
import { connect } from 'react-redux';
import {useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import {groupedOptions} from '../utils/data';
import {startAddAccount} from '../actions/AccountActions';
import  Router from 'next/router';
import NumberFormat from "react-number-format";



const AddAccountForm = (props) => {
    const [message, setMessage] = useState('');
    const {register, handleSubmit,control, errors, reset} = useForm({
        defaultValues : {
            category: [{value: 'food', label: 'food'}]
        },
        mode: "onChange",
        shouldFocusError: true,
        shouldUnregister: true,
    });

    const formData = ({name,currency,currentAmount,account_type}) => {
        
        const valAcc = account_type.value[1].type
        console.log(valAcc)
        props.dispatch(startAddAccount({
            name,
            currentAmount : parseFloat(currentAmount.replace(/\D/g, "")),
            account_type: account_type.value[1].type,
            account_cat: account_type.value[0].cat,
            currency: currency.value
        }))
        setMessage('thank you');
        setTimeout(() => {
            Router.push('/accounts')
        }, 350 )

       
        // console.log(valAcc)
        
    }

    return(
        <form onSubmit={handleSubmit(formData)}>
        <label> Account Name &nbsp;<span />
            <input 
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
                { value: "USD", label: "USD" },
                { value: "CAD", label: "CAD" },
                { value: "EUR", label: "EUR" }
                ]}
                defaultValue={[{value:"USD", label:"USD"}]}
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
            <button 
            type="submit"
            name="submit" 
            disabled={errors.name}
            >submit</button>
            {message && message}
        </form>
        
    )
}

// export default AddAccountForm;


const mapStateToProps = (state) => {
    return {
        transactions : state.transactions,
        formState : state.formState
    };
};


export default connect(mapStateToProps)(AddAccountForm);