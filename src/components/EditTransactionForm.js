import React,{useState} from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {useForm, Controller } from 'react-hook-form';
import {startAddTransaction, startEditTransaction} from '../actions/TransactionsActions';
import  Router from 'next/router';
import moment from 'moment'; 
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import NumberFormat from "react-number-format";
import {groupedOptions} from '../utils/data';

const AddTransactionForm = (props) => {
    console.log(props.transaction,'meehow')
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    let cats = [];

    props.transaction.category.map(e =>  {
        return(
            cats.push({label:e.capitalize() , value:e})
            // [...cats,{label: e, value: e}]
        )
    })
    console.log(cats, 'cats')

    // const jj = () => {
    //     props.transaction.category.map(e =>  {
    //         return(
    //             {value: e, label: e}
    //         )
    //     })
    // }

    const [message, setMessage] = useState('');
    const [ cA, setcA] = useState(moment(`${props.transaction.createdAt}`));
    const [focus, setFocus] = useState(null);
  
        const {register, handleSubmit,control, errors, reset} = useForm({
            // defaultValues : {
            //     category: [{value: `${props.transaction.category.map(e =>  e[0])}`, label:`${props.transaction.category.map(e =>  e)}` }]
            // },
            // defaultValues : {
            //     category: [{value: `${props.transaction.category.map(e =>  [...e])}`, label:`${props.transaction.category.map(e =>  [...e])}` }]
            // },
           
            mode: "onChange",
            shouldFocusError: true,
            shouldUnregister: true,
        });

    const formData = ({name, amount, entry, category,account,id,submit}) => {
        // console.log(cA.toString())
        const categoryArray = category.map((item) => item.value)
        props.dispatch(startEditTransaction(
            {
                name,
                amount : parseFloat(amount.replace(/\D/g, "")),
                category: categoryArray,
                entry: entry.value,
                account_type: account.value[1].type,
                account_cat: account.value[0].cat,
                createdAt : cA.toISOString(),
                tid: props.tid
                }
                ))
        // console.log(name,amount,categoryArray, date,submit);
        
        // reset();
        setMessage('thank you');
        // setTimeout(function(){ alert("Hello"); }, 3000);
        setTimeout(() => {
            Router.push('/')
        }, 350 )
        console.log(name, amount, categoryArray, entry.value, account.value, cA.toISOString(),props.tid)
        
    }

    return(
        <div className="transaction-app">
            <form onSubmit={handleSubmit(formData)}>
            <label> Transaction Name &nbsp;<span />
            <input 
            type="text"
            name="name"
            ref={register({required: true, minLength: 5})} 
            defaultValue={`${props.transaction.name}`}
            />
            {errors.name && errors.name.type === 'required' && <span>this is required 
            </span>}
            {errors.name && errors.name.type === 'minLength' && <span>Length of name should be atleast 5 charactors
            </span>}
            </label> 
                <br/><br/>

            
            
            <section>
            <label>Amount  </label>
            <Controller
              as={NumberFormat}
              thousandSeparator
              name="amount"
              className="i_amount"
              control={control}
              prefix={'$'}
              defaultValue={`${props.transaction.amount}`}
            //   ref={register({required : true})}
              rules={{ required: true }}
            />
            {errors.amount && <p>please enter amount</p>}
          </section>
            

            <h3>Pick a Date</h3>
            <section>
        
            <SingleDatePicker
                  date={cA}// momentPropTypes.momentObj or null
                  onDateChange={date => {return (
                     // setcA(moment(date))
                     // console.log(date.toString())
                     setcA(date)
                 )}} // PropTypes.func.isRequired
                 focused={focus} // PropTypes.bool
                 onFocusChange={ c => setFocus(c.focused)} // PropTypes.func.isRequired
                 id="dates" // PropTypes.string.isRequired,
                 isOutsideRange={() => false}
                 
                 />
             
     
            </section>
    
            <p htmlFor="entry">Choose an Entry</p>
            <Controller
                name="entry"
                as={Select}
                options={[
                { value: "expense", label: "Expense" },
                { value: "income", label: "Income" },
                { value: "transfer", label: "Transfer" }
                ]}
                defaultValue={{value: `${props.transaction.entry}` , label : `${props.transaction.entry.capitalize()}`}}
                control={control}
                rules={{ required: true }}
            />
        
            <p htmlFor="categories">Choose a Category</p>
            <Controller
                name="category"
                as={Select}
                isMulti
                options={[
                { value: "entertainment", label: "Entertainment" },
                { value: "food", label: "Food" },
                { value: "rent", label: "Rent" }
                ]}
                // defaultValue={[{value:"food", label:"Food"}]}
                defaultValue={cats}
                // defaultValue={[...`${props.transaction.category.map(e =>  e)}`]}
                // defaultValue={['Rent']}
                // defaultValue={jj}
                // defaultValue={[props.transaction.category.map(e =>  {
                //     return(
                //         <span key={e}>
                //         {{value: e, label: e}}
                //         </span>
                //     )
                // })]}
                
                control={control}
                error={errors.category}
                rules={{ required: false }}
                
            />
            {errors.category && <p>please select a category</p>}
            <p htmlFor="account">Choose an Account</p>
            <Controller
                name="account"
                as={Select}
                options={groupedOptions}
                defaultValue={{value:[{cat: `${props.transaction.account_cat}`}, {type: `${props.transaction.account_type}`}], label:`${props.transaction.account_type.capitalize()}`}}
                control={control}
                rules={{ required: true }}
            />
                
            <button 
            type="submit"
            name="submit" 
            disabled={errors.name}
            >submit</button>
            
            </form> 
            {message && message}

		</div> 

    )
}



const mapStateToProps = (state) => {
    return {
        
    };
};


export default connect(mapStateToProps)(AddTransactionForm);