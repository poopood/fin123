import React,{useState} from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {useForm, Controller } from 'react-hook-form';
import {startAddTransaction,startAddTransferTransaction} from '../actions/TransactionsActions';
// import {startAddExpenseCategory,startAddIncomeCategory} from '../actions/OtherActions';
import  Router from 'next/router';
import moment from 'moment';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import NumberFormat from "react-number-format";
// import {categoryOptions,categoryOptions2} from '../utils/data';
// import {cats} from '../utils/data';
import Link from "next/link";

const AddTransactionForm = (props) => {
    console.log(props, 'props from indside');
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
    //   let linkcats = [{'label':<Link href={`/add-account`}>
    // const cats = props.cats;
    // let cats = [];
    
    let cats = [{'label':<Link href={`/add-account`}>
    
    
    <a>Add Account</a>
</Link>,isDisabled: true}]
    props.accounts.map((e) => {
        cats.unshift({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: <div style={groupStyles}><span>{e.name}</span>
          <span style={groupBadgeStyles}>${e.currentAmount}</span></div>})
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
    // console.log(cats, 'cats');

    // props.accounts.category.map(e =>  {
    //     return(
    //         cats.push({label:e.capitalize() , value:e})
    //         // [...cats,{label: e, value: e}]
    //     )
    // })
    // console.log(cats, 'cats')
    // const groupStyles = {
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //   };
    //   const groupBadgeStyles = {
    //     backgroundColor: '#EBECF0',
    //     borderRadius: '2em',
    //     color: '#172B4D',
    //     display: 'inline-block',
    //     fontSize: 12,
    //     fontWeight: 'normal',
    //     lineHeight: '1',
    //     minWidth: 1,
    //     padding: '0.16666666666667em 0.5em',
    //     textAlign: 'center',YY
    //   };

    // let cats = [];

    // props.accounts.map(e => {
    //     return(
    //         cats.push({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: <div style={groupStyles}><span>{e.name}</span>
    //             <span style={groupBadgeStyles}>${e.currentAmount}</span></div>})
    //     )
    // })
    // console.log(cats, 'cats');
  

    const [message, setMessage] = useState('');
    const [ cA, setcA] = useState(moment());
    const [focus, setFocus] = useState(null);
    const minDate = new Date("2020-06-04T08:05:10");
    const maxDate = new Date("2022-01-04T08:05:10");
    // const maxDate = new Date("2021-01-04T08:05:10");

    const labelOptions = [
        {label:"e.g.", isDisabled: true},
        { value: "#Misc", label: "#Misc"  },
        { value: "#2021", label: "#2021"  },
      ]
    // const categoryOptions2 = [
    //     { value: "entertainment", label: "fvfv"},
    //     { value: "33", label: "33"},
    //     { value: "rent", label: "33"}
    //   ]

    //   const handleMultiChange = (option) => {
    //       console.log(option,'changed');
    //   }
  
        const {register, handleSubmit,control, errors,watch} = useForm({
            // defaultValues : {
            //     category: [{value: 'food', label: 'Food'}]
            // },
            mode: "onChange",
            shouldFocusError: true,
            shouldUnregister: true,
        });
        // const watchEntry = watch("entry", {value:'expense', label: 'Expense'}); // you can supply default value as second argument
        // // const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
        // // const watchFields = watch(["entry", "number"]);
        // console.log("watchEntry", watchEntry);


    const formData = ({name, amount, entry, category,account, account1, labels,description}) => {
        
        // console.log(cA.toString())
        // const categoryArray = category ? category.map((item) => item.value) : undefined;
        // console.log(description, 'description')
        const labelsArray = labels ? labels.map((item) => item.value) : undefined;
        // console.log(labelsArray)
        // if(recur){
        //         props.dispatch(startAddRecurringTransaction({
        //         name,
        //         amount : parseFloat(amount.replace(/\D/g, "")),
        //         category: categoryArray,
        //         entry: entry.value,
        //         account_type: account.value[1].type,
        //         account_cat: account.value[0].cat,
        //         createdAt : cA.toISOString(),
        //         aid : account.value[2].aid,
        //         recur: recur.value
        //      }))    
        
        // } else {
            
        // }


        // console.log(parseFloat(amount.replace(/\D/g, "")));
        // console.log(account.value[2].aid)
        // const account1 = account1 ? account1 : '';
        // const EITransaction = {
        //     name,
        //     amount : parseFloat(amount.replace(/\D/g, "")),
        //     category: categoryArray,
        //     entry: entry.value,
        //     account_type: account.value[1].type,
        //     account_cat: account.value[0].cat,
        //     createdAt : cA.toISOString(),
        //     aid : account.value[2].aid }

        // const Transfer = {
        //     name,
        //     amount : parseFloat(amount.replace(/\D/g, "")),
        //     entry: entry.value,
        //     account_type: account.value[1].type,
        //     account_cat: account.value[0].cat,
        //     createdAt : cA.toISOString(),
        //     aid : account.value[2].aid,
        //     account1_type: account1.value[1].type,
        //     account1_cat: account1.value[0].cat,
        //     aid1 : account1.value[2].aid,
         

        // }
        // console.log(account2,'2BE2BE')
        //activate
        {(watchEntry.label === "Expense" || watchEntry.label === "Income") && (
            props.dispatch(startAddTransaction({
                name,
                amount : parseFloat(amount.replace(/\D/g, "")),
                category: category,
                entry: entry.value,
                account_type: account.value[1].type,
                account_cat: account.value[0].cat,
                createdAt : cA.toISOString(),
                labels: labelsArray,
                aid : account.value[2].aid,
                description:description
             }))
        )}
        
       
        //activate
        {watchEntry.label === "Transfer" &&(
            props.dispatch(startAddTransferTransaction(
                {
                    name,
                    amount : parseFloat(amount.replace(/\D/g, "")),
                    entry: entry.value,
                    account_type: account.value[1].type,
                    account_cat: account.value[0].cat,
                    createdAt : cA.toISOString(),
                    labels: labelsArray,
                    aid : account.value[2].aid,
                    account1_type: account1.value[1].type,
                    account1_cat: account1.value[0].cat,
                    aid1 : account1.value[2].aid,
                    description:description
        
                }
            ))
        )}
            // props.dispatch(startAddTransaction(
            
            //     EITransaction
                
            //     ))
  
        
        // console.log(dpdp);
        // console.log(name)
        
        // reset(); *this creates an infinite loop
        //activate
        setMessage('thank you');
       
        setTimeout(() => {
            Router.push('/')
        }, 1000 )
        
    }
   
    
    const watchEntry = watch("entry", {value:'expense', label: 'Expense'}); // you can supply default value as second argument
    const watchCategory = watch("category",{value:'entertainment', label: 'Entertainment',__isNew__:false}); 
    const watchRecurring = watch("isRecurring", false)
    // console.log(watchRecurring, 'watchisRecurring')


    // const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
    // const watchFields = watch(["entry", "number"]);
    // console.log("watchEntry", watchEntry.label);
    // console.log( Array.isArray(watchCategory));
    // { Array.isArray(watchCategory) && (
        
    //     watchCategory.map(e => {
    //         if(watchEntry.label === "Expense" && e.__isNew__){
                    
    //                 // categoryOptions.push(e);
    //                 // console.log(e.label);
    //                 categoryOptions.push({value: `${e.value}`, label: `${e.label}`})
    //                 console.log(categoryOptions,'homeless cats');
                    
    //                 // props.dispatch(startAddExpenseCategory({value: `${e.value}`, label: `${e.label}`}))
    //                 // console.log({value: `${e.value}`, label: `${e.label}`})
                   
    //                 // console.log(categoryOptions);
    //         } else if(watchEntry.label === "Expense" && e.__isNew__) {
    //             // props.dispatch(startAddIncomeCategory({value: `${e.value}`, label: `${e.label}`}))
    //             categoryOptions2.push({value: `${e.value}`, label: `${e.label}`})
    //         }
    //     })
    // )}
    
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
          <br/>
          <section>
                <label> Description &nbsp;<span />
                <br/>
                <input 
                name="description"
                type="text"
                placeholder="Optional"
                defaultValue={''}
                ref={register}
                 />
                </label> 
                    <br/>
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
                //  isOutsideRange={() => false}
                 isOutsideRange={date => date.isBefore(minDate) || date.isAfter(maxDate)}
                 />
             
     
            </section>
            {/*
            <section>
            
            <input type="checkbox" name="isRecurring" ref={register}/>
            <label for="isRecurring">This a recurring transaction?</label>
            </section>
            <section>
            {watchRecurring && (
            <div>
                <p htmlFor="recur">Choose an Recurring timeline</p>
            <Controller
                name="recur"
                as={Select}
                options={[
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" },
                { value: "annually", label: "Annually" }
                ]}
                defaultValue={{value:'monthly', label: 'Monthly'}}
                control={control}
                rules={{ required: true }}
                
            />
            </div>




            )}
            </section> */}
    
            <p htmlFor="entry">Choose an Entry</p>
            <Controller
                name="entry"
                as={Select}
                options={[
                { value: "expense", label: "Expense" },
                { value: "income", label: "Income" },
                { value: "transfer", label: "Transfer" }
                ]}
                defaultValue={{value:'expense', label: 'Expense'}}
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
                defaultValue={''}
                // onChange={(e) => console.log(e)}
                control={control}
                error={errors.category}
                rules={{ required: true }}
                // isOptionDisabled={option => option.link !== 'Expense'}
                
            />

                </div>
            )}
           
            {watchEntry.label === "Income" && (
                <div>
                <p htmlFor="categories">Choose a Category</p>
                <Controller
                name="category"
                as={Select}
                options={LinkedcatsI}
                defaultValue={''}
                control={control}
                error={errors.category}
                rules={{ required: true }}
                // isOptionDisabled={option => option.link !== 'Expense'}
                
            />

                </div>
            )}
            {errors.category && <p>please select a Category</p>}
               
            {watchEntry.label === "Transfer" && (
                <div>
                <p htmlFor="account1">Choose an Account to Transfer From</p>
                <Controller
                name="account1"
                as={Select}
                options={cats}
                defaultValue={''}
                control={control}
                rules={{ required: true }}
                
            />

                </div>
            )}
            
            {errors.account1 && <p>please select an Account</p>}

            
            <section>
            <p htmlFor="labels">Add a Label</p>
                <Controller
                    as={CreatableSelect}
                    defaultValue={''}
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
                options={cats}
                defaultValue={''}
                control={control}
                rules={{ required: true }}
                
            />
            {errors.account && <p>please select an Account</p>}
                
            <button 
            type="submit"
            name="submit" 
            disabled={errors.name}
            >submit</button>
            
            </form> 
            <div>
        
          </div>
            {message && message}

		</div> 

    )
}


const mapStateToProps = (state) => {
    return {


    };
};


export default connect(mapStateToProps)(AddTransactionForm);