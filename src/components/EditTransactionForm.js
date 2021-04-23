import React,{useState} from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {useForm, Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import { startEditTransaction,startEditTransferTransaction} from '../actions/TransactionsActions';
import  Router from 'next/router';
import moment from 'moment'; 
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import NumberFormat from "react-number-format";
import Link from 'next/link';
import  {useToast}  from "@chakra-ui/toast";


const AddTransactionForm = (props) => {
  
 
    const transactionEntry = props.transaction.entry === 'expense' || props.transaction.entry === 'income'? [{ value: "expense", label: "Expense" },
    { value: "income", label: "Income" }]: [
        { value: "transfer", label: "Transfer" }
        ];

    
    let AddAccountsLink = props.AddAccountsLink;

    let transferAccount = props.transferAccount;
    
    let AccountsIDcat = props.AccountsIDcat;

    let transactionLabels = [];

    const toast = useToast();
    const id = "test-toast";

    const toastFunc = () => {
        if (!toast.isActive(id)) {
        toast({
            id,
            title: "Transaction Edited",
            status: "success",
            duration: 1000,
            isClosable: true,
            position:"bottom"
          })

        }
    }

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    props.transactionLabels.map(e => {
        transactionLabels.push({value:e, label: e})
    })

    
    let Linkedcats = [{'label':<Link href={`/add-category`}>
    
    
    <a>Add Category</a>
    </Link>,isDisabled: true}]
    props.expenseCats.map((e) => {
        Linkedcats.unshift({value:e.value, label: e.label})
    })


    let LinkedcatsI = [{'label':<Link href={`/add-category`}>
    
    
    <a>Add Category</a>
</Link>,isDisabled: true}]
    props.incomeCats.map((e) => {
        LinkedcatsI.unshift({value:e.value, label: e.label})
    })

   

    const [message, setMessage] = useState('');
   
    const [ cA, setcA] = useState(moment(`${props.transaction.createdAt}`));
    const [focus, setFocus] = useState(null);

    const labelOptions = [
        {label:"e.g.", isDisabled: true},
        { value: "#Misc", label: "#Misc"  },
        { value: "#2021", label: "#2021"  },
      ]


  
        const {register, handleSubmit,control, errors,watch} = useForm({
     
            mode: "onChange",
            shouldFocusError: true,
            shouldUnregister: true,
        });

    const formData = ({name, amount, entry, category,account, account1}) => {
    

        {(watchEntry.label === "Expense" || watchEntry.label === "Income") && (
            props.dispatch(startEditTransaction({
                name,
                amount : parseFloat(amount.replace(/\D/g, "")),
                category: category,
                entry: entry.value,
                account_type: account.value[1].type,
                account_cat: account.value[0].cat,
                createdAt : cA.toISOString(),
                aid : account.value[2].aid,
                tid: props.tid,
                prevAmount: props.transaction.amount
             }))
        )}
        
       

        {watchEntry.label === "Transfer" &&(
            props.dispatch(startEditTransferTransaction({
                name,
                amount : parseFloat(amount.replace(/\D/g, "")),
                entry: entry.value,
                account_type: account.value[1].type,
                account_cat: account.value[0].cat,
                createdAt : cA.toISOString(),
                aid : account.value[2].aid,
                account1_type: account1.value[1].type,
                account1_cat: account1.value[0].cat,
                aid1 : account1.value[2].aid,
                tid: props.tid,
                prevAmount: props.transaction.amount
    
            }))
          
        )}


        toastFunc();
        setTimeout(() => {
            Router.push('/transactions')
        }, 1000 )

    }

    
    const watchEntry = watch("entry", {value: `${props.transaction.entry}` , label : `${props.transaction.entry.capitalize()}`}); // 



    return(
        <div className="edit-transaction-form">
            <form onSubmit={handleSubmit(formData)}>
            <h3>Edit Transaction</h3>
            <label> Transaction Name &nbsp; </label> 
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
          <br/>
          <section>
                <label> Description &nbsp;</label> 
                <br/>
                <input 
                name="description"
                type="text"
                placeholder="Optional"
                defaultValue={props.description}
                 />
                
                    <br/>
          </section>
            

            <label>Pick a Date</label>
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
                 withPortal={true}
             
                 readOnly
                verticalHeight={370}
                orientation="vertical"
                numberOfMonths={2}
                
                 
                 />
             
     
            </section>
    
            <p htmlFor="entry">Choose an Entry</p>
            <Controller
                name="entry"
                as={Select}
                options={transactionEntry}
                defaultValue={{value: `${props.transaction.entry}` , label : `${props.transaction.entry.capitalize()}`}}
                control={control}
                rules={{ required: true }}
            />
        
            {watchEntry.label === "Expense" && (
                <div>
                <p htmlFor="categories">Choose a Category</p>
                <Controller
                name="category"
                as={Select}
                options={Linkedcats}
                defaultValue={props.category}
                control={control}
                error={errors.category}
                rules={{ required: true }}
                // isOptionDisabled={option => option.link !== 'Expense'}
                
            />

                </div>
            )}
            {errors.category && <p>please select a category</p>}
            {watchEntry.label === "Income" && (
                <div>
                <p htmlFor="categories">Choose a Category</p>
                <Controller
                name="category"
                as={Select}
                options={LinkedcatsI}
                defaultValue={props.category}
                control={control}
                error={errors.category}
                rules={{ required: true }}
                // isOptionDisabled={option => option.link !== 'Expense'}
                
            />

                </div>
            )}
                

            {errors.category && <p>please select a category</p>}
            {watchEntry.label === "Transfer" && (
                <div>
                <p htmlFor="account1">Choose an Account to Transfer From</p>
                <Controller
                name="account1"
                as={Select}
                options={AddAccountsLink}
                defaultValue={transferAccount}
                control={control}
                rules={{ required: true }}
                
            />

                </div>
            )}
            
            {errors.category && <p>please select an Account</p>}

            <section>
            <p htmlFor="labels">Add a Label</p>
                <Controller
                    as={CreatableSelect}
                    defaultValue={transactionLabels}
                    name="labels"
                    isMulti
                    options={labelOptions}
                    control={control}
                />
            </section>


            {watchEntry.label === "Transfer" ?( 
                <p htmlFor="account">Account Transferred to</p>
            ) :
            (
                <p htmlFor="account">Choose an Account </p>) 
            }
       
            <Controller
                name="account"
                as={Select}
                options={AddAccountsLink}
                defaultValue={AccountsIDcat[0]}
                control={control}
                rules={{ required: true }}
                
            />
            {errors.account && <p>please select an Account</p>}
            
                
            <button 
            type="submit"
            name="submit" 
            className="submit" 
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