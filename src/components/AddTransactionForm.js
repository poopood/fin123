import React,{useState} from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {useForm, Controller } from 'react-hook-form';
import {startAddTransaction} from '../actions/TransactionsActions';
import  Router from 'next/router';
import moment from 'moment';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import NumberFormat from "react-number-format";
import {groupedOptions} from '../utils/data';

const AddTransactionForm = (props) => {
    // let cats = [];

    // props.accounts.category.map(e =>  {
    //     return(
    //         cats.push({label:e.capitalize() , value:e})
    //         // [...cats,{label: e, value: e}]
    //     )
    // })
    // console.log(cats, 'cats')
    const groupStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      };
      const groupBadgeStyles = {
        backgroundColor: '#EBECF0',
        borderRadius: '2em',
        color: '#172B4D',
        display: 'inline-block',
        fontSize: 12,
        fontWeight: 'normal',
        lineHeight: '1',
        minWidth: 1,
        padding: '0.16666666666667em 0.5em',
        textAlign: 'center',
      };

    let cats = [];

    props.accounts.map(e => {
        return(
            cats.push({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: <div style={groupStyles}><span>{e.name}</span>
                <span style={groupBadgeStyles}>${e.currentAmount}</span></div>})
        )
    })
    console.log(cats, 'cats');
  
   


    console.log(props, 'props of add transaction')
    const [message, setMessage] = useState('');
    const [ cA, setcA] = useState(moment());
    const [focus, setFocus] = useState(null);
  
        const {register, handleSubmit,control, errors, reset} = useForm({
            defaultValues : {
                category: [{value: 'food', label: 'Food'}]
            },
            mode: "onChange",
            shouldFocusError: true,
            shouldUnregister: true,
        });

    const formData = ({name, amount, entry, category,account,id,submit}) => {
        // console.log(cA.toString())
        const categoryArray = category.map((item) => item.value)
        // console.log(parseFloat(amount.replace(/\D/g, "")));
        // console.log(account.value[2].aid)
        props.dispatch(startAddTransaction(
            {
                name,
                amount : parseFloat(amount.replace(/\D/g, "")),
                category: categoryArray,
                entry: entry.value,
                account_type: account.value[1].type,
                account_cat: account.value[0].cat,
                createdAt : cA.toISOString(),
                aid : account.value[2].aid
                }
                ))
        // // console.log(name,amount,categoryArray, date,submit);
        
        reset();
        setMessage('thank you');
        // setTimeout(function(){ alert("Hello"); }, 3000);
        setTimeout(() => {
            Router.push('/')
        }, 1000 )
        
    }



    return(
        <div className="transaction-app">
            <form onSubmit={handleSubmit(formData)}>
            <label> Transaction Name &nbsp;<span />
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
            <label>Amount  </label>
            <Controller
              as={NumberFormat}
              thousandSeparator
              name="amount"
              className="i_amount"
              control={control}
              prefix={'$'}
              defaultValue=""	
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
                defaultValue="expense"
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
                defaultValue={[{value:"food", label:"Food"}]}
                control={control}
                error={errors.category}
                rules={{ required: false }}
                
            />
            {errors.category && <p>please select an Account</p>}
            <p htmlFor="account">Choose an Account</p>
            <Controller
                name="account"
                as={Select}
                options={cats}
                defaultValue={'savings'}
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
        transactions : state.transactions,
        formState : state.formState
    };
};


export default connect(mapStateToProps)(AddTransactionForm);