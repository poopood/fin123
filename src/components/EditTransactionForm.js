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
// import {groupedOptions} from '../utils/data';
// import {categoryOptions,categoryOptions2} from '../utils/data';

const AddTransactionForm = (props) => {
    console.log(props);
    console.log(props.category.label, 'categoory')
    // props.transaction.entry
    const tortilla = props.transaction.entry === 'expense' || props.transaction.entry === 'income'? [{ value: "expense", label: "Expense" },
    { value: "income", label: "Income" }]: [
        { value: "transfer", label: "Transfer" }
        ];
    // {props.transaction.entry === "expense" || props.transaction.entry === 'income' && (
    //     tortilla.push([
    //         { value: "expense", label: "Expense" },
    //         { value: "income", label: "Income" }
    //         ])
    // )}
    // {props.transaction.entry === "transfer" &&(
    //     tortilla.push([
    //         { value: "transfer", label: "Transfer" }
    //         ])
    // )}
    
    console.log(props.transaction.amount, 'edit transactions')
    console.log(props, 'poops')
    let cats = props.cats;


    let bats = props.bats;
    let dogs = props.dogs;
    let visigoths = props.visigoths;
    let burritos = [];
//    console.log(dogs[0].label);
    
    // console.log(props.accounts,'meehow')
    // console.log(props.transaction,'meehow3')
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    props.burrito.map(e => {
        burritos.push({value:e, label: e})
    })
    // console.log(burritos, 'burritos')
    
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
    // console.log(dogs)
    // accounts.map((e) => {
    //     if(transaction.aid === e.id){
    //         return(
    //             dogs.push({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: <div style={groupStyles}><span>{e.name}</span>
    //                 <span style={groupBadgeStyles}>${e.currentAmount}</span></div>})
    //         )
    //     } else if (e.id === e.id){
    //         cats.push({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: <div style={groupStyles}><span>{e.name}</span>
    //             <span style={groupBadgeStyles}>${e.currentAmount}</span></div>})
    //     }
    // })
    // console.log(cats, 'cats')
    // console.log(dogs, 'dogs')
   

    const [message, setMessage] = useState('');
    // const [cats, setCats] = useState([]);
    // const [dogs, setDogs] = useState([]);
    const [ cA, setcA] = useState(moment(`${props.transaction.createdAt}`));
    const [focus, setFocus] = useState(null);

    const labelOptions = [
        {label:"e.g.", isDisabled: true},
        { value: "#Misc", label: "#Misc"  },
        { value: "#2021", label: "#2021"  },
      ]


  
        const {register, handleSubmit,control, errors,watch} = useForm({
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

    const formData = ({name, amount, entry, category,account, account1}) => {
        // console.log(cA.toString())
        // const categoryArray = category ? category.map((item) => item.value) : undefined;
        // console.log(account)
        // const aid = account.value[2].aid ?

        // const EITransaction = {
        //     name,
        //     amount : parseFloat(amount.replace(/\D/g, "")),
        //     category: category,
        //     entry: entry.value,
        //     account_type: account.value[1].type,
        //     account_cat: account.value[0].cat,
        //     createdAt : cA.toISOString(),
        //     aid : account.value[2].aid,
        //     tid: props.tid,
        //     prevAmount: props.transaction.amount
        //  }
        
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
        //     tid: props.tid,
        //     prevAmount: props.transaction.amount

        // }

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
            // console.log(Transfer, "hallelujah")
        )}

        
        // props.dispatch(startEditTransaction(
        //     {
        //         name,
        //         amount : parseFloat(amount.replace(/\D/g, "")),
        //         category: categoryArray,
        //         entry: entry.value,
        //         account_type: account.value[1].type,
        //         account_cat: account.value[0].cat,
        //         createdAt : cA.toISOString(),
        //         tid: props.tid,
        //         aid : account.value[2].aid,
        //         prevAmount: props.transaction.amount
        //         }
        //         ))
        // console.log( account.value[1].type,'fuckout')
        // console.log(name,amount,categoryArray, date,submit);
        

        setMessage('thank you');
        // // setTimeout(function(){ alert("Hello"); }, 3000);
        setTimeout(() => {
            Router.push('/')
        }, 1000 )
        // console.log(name, amount, categoryArray, entry.value, account.value, cA.toISOString(),props.tid)
        
    }



    // let accounts = props.accounts;
    // let transaction = props.transaction;

    // let bats = [];

    // props.transaction.category.map(e =>  {
    //     return(
    //         bats.push({label:e.capitalize() , value:e})
    //         // [...cats,{label: e, value: e}]
    //     )
    // })
    // console.log(bats, 'bats')
    // let cats = [];
    // let dogs = [];
    
    // let accountDefaultValue = [];
        // this.cats = cats;
        // this.dogs = dogs;
        // accounts.map(e => {
        //     return(
        //         cats.push({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: <div style={groupStyles}><span>{e.name}</span>
        //             <span style={groupBadgeStyles}>${e.currentAmount}</span></div>})
        //     )
        // })
        // accounts.map(e => {
        //     if(transaction.aid === e.id)
        //     return(
        //         dogs.push({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: <div style={groupStyles}><span>{e.name}</span>
        //             <span style={groupBadgeStyles}>${e.currentAmount}</span></div>})
        //     )
                    
        // })

        // accounts.map((e) => {
        //     if(transaction.aid === e.id){
        //         return(
        //             dogs.push({value:[{cat: e.account_cat}, {type: e.account_type }, {aid: e.id}], label: <div style={groupStyles}><span>{e.name}</span>
        //                 <span style={groupBadgeStyles}>${e.currentAmount}</span></div>})
        //         )
        //     }
        // })

   
    // let dogsZero = dogs[0];
    // console.log(dogs, 'dags');
    // console.log(cats, 'cats');
    
    const watchEntry = watch("entry", {value: `${props.transaction.entry}` , label : `${props.transaction.entry.capitalize()}`}); // 


   

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
          <br/>
          <section>
                <label> Description &nbsp;<span />
                <br/>
                <input 
                name="description"
                type="text"
                placeholder="Optional"
                defaultValue={props.description}
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
                 isOutsideRange={() => false}
                 
                 />
             
     
            </section>
    
            <p htmlFor="entry">Choose an Entry</p>
            <Controller
                name="entry"
                as={Select}
                options={tortilla}
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
                options={cats}
                defaultValue={cats[0]}
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
                    defaultValue={burritos}
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
                defaultValue={dogs[0]}
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
            {message && message}

            <Link href='/'>
            <a>Go Home</a>
            </Link>

		</div> 

    )
}



const mapStateToProps = (state) => {
    return {
        
    };
};


export default connect(mapStateToProps)(AddTransactionForm);