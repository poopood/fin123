import React,{useState} from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {useForm, Controller } from 'react-hook-form';
import {startAddExpenseCategory,startAddIncomeCategory,removeCategory} from '../src/actions/OtherActions'; 
import  Router from 'next/router';
import jwt from 'jsonwebtoken'; 
import cookie from 'cookie';
import db from '../src/firebase/firebase';

const AddCategory = (props) => {
    console.log(props, 'milly props')
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    let eCatsValues = [];

    let iCatsValues = [];
    

    {props.expenseCategories && (
        props.expenseCategories.map(e => {
            // console.log(e.value.indexOf('shiloh'), 'eem')
            
            eCatsValues.push(e.value);
            
        })
        // console.log(props.expenseCategories.indexOf('shiloh'), 'shanil respect the poms')
        
    )}
    {props.IncomeCategories && (
        props.IncomeCategories.map(e => {
            // console.log(e.value.indexOf('shiloh'), 'eem')
            iCatsValues.push(e.value);
            
        })
        // console.log(props.expenseCategories.indexOf('shiloh'), 'shanil respect the poms')
        
    )}
   
    
    const [message, setMessage] = useState('');
    const {register, handleSubmit,control, errors,watch} = useForm({
        mode: "onChange",
        shouldFocusError: true,
        shouldUnregister: true,
    });

    const removeCat = (e, id, entry) => {
    
        if(eCatsValues.indexOf(e) > -1){
            eCatsValues.splice(e, 1);

        } else if(iCatsValues.indexOf(e) > -1){
            iCatsValues.splice(e, 1)
        }
        // console.log(e, id,entry);
        props.dispatch(removeCategory(id,entry));
        Router.push('/add-category');
      
    }

    const watchEntry = watch("entry", {value:'expense', label: 'Expense'});
    // {console.log(watchEntry.label, 'entry.label')}

    const formData = ({name ,entry}) => {
       let  capitalizedName = name.capitalize();


       {props.expenseCategories && (
        props.expenseCategories.map(e => {
            console.log(e.value.indexOf(name), 'eem')
            if(e.value.indexOf(name) < 0){
                
            }
        })
        // console.log(props.expenseCategories.indexOf('shiloh'), 'shanil respect the poms')
    )}
       
        if(watchEntry.label === "Expense"){
            // props.dispatch(startAddExpenseCategory({value: `${name}`, label: `${capitalizedName}`}))

            if(eCatsValues.indexOf(name) < 0){
                    props.dispatch(startAddExpenseCategory({value: `${name}`, label: `${capitalizedName}`}))     
                    setMessage('thank you');
                    
                    setTimeout(() => {
                            Router.push('/add-transaction')
                    }, 100 )
            } else {
                setMessage('category already exist')
                setTimeout(() => {
                    setMessage('');
                }, 2500)
            }
        } 

        if(watchEntry.label === "Income"){

            if(iCatsValues.indexOf(name) < 0){
                props.dispatch(startAddIncomeCategory({value: `${name}`, label: `${capitalizedName}`}))   
                setMessage('thank you');
                    setTimeout(() => {
                            Router.push('/add-transaction')
                    }, 100 )  
        } else {
            setMessage('category already exist')
            setTimeout(() => {
                setMessage('');
            }, 2500)
        }
            // props.dispatch(startAddIncomeCategory({value: `${name}`, label: `${capitalizedName}`}))
        }

        }
    
    return(
        <div>
            <form onSubmit={handleSubmit(formData)}>
            <label> Category Name &nbsp;<span />
            <input 
            type="text"
            name="name"
            ref={register({required: true, minLength: 2, pattern: /^\S*$/})} />
            {errors.name && errors.name.type === 'required' && <span>this is required 
            </span>}
            {errors.name && errors.name.type === 'pattern' && <span>no spaces 
            </span>}
            {errors.name && errors.name.type === 'minLength' && <span>Length of name should be atleast 5 charactors
            </span>}
            </label>  <br/><br/>

            <p htmlFor="entry">Choose an Entry</p>
            <Controller
                name="entry"
                as={Select}
                options={[
                { value: "expense", label: "Expense" },
                { value: "income", label: "Income" }
                ]}
                defaultValue={{value:'expense', label: 'Expense'}}
                control={control}
                rules={{ required: true }}
                
            />
            <button type="submit">Submit</button>
            </form>
            <div>
                <h3>Available categories</h3>
               
                {watchEntry.label === "Expense" && <p>{props.expenseCategories.map((
                   
                    {label,id}) => 
                <div>
                <span>{label} </span>
                <button onClick={() => {removeCat(label,id,watchEntry.label)}}>X</button>
                 <br /> </div>
                 )
                }
                </p>
            }


                {watchEntry.label === "Income" && <p>{props.IncomeCategories.map(({label, id}) => 
                <div>
                <span >{label} </span> 
                <button onClick={() => {removeCat(label,id,watchEntry.label)}}>X</button>
                <br /> 
                </div>
                )}</p>}
               
            </div>
            {message && message}

        </div>
    )
}


export const getServerSideProps =  async (context) => {
    let decoded = 'dGZZ2xH3toXlfGU2W2F5iifEkMJ3'
    if(context.req.headers.cookie){
      const parsedCookies = cookie.parse(context.req.headers.cookie)
      decoded = jwt.decode(parsedCookies.userId, { header: true })
    }

    let expenseCats = [];
    let IncomeCats = [];

    const dbdb = await db.ref(`users/${decoded}/categories/expense`)
    .once('value')
        .then((snapshot) => snapshot.val())
        .then((val) => {
          Object.keys(val).map((key) => {
            expenseCats.push({
              id:key,
              ...val[key]
            })
          }
          
          );
  
    })
        .catch((e) => {
        console.log('error fetching data', e)
    })

    const dbdb2 = await db.ref(`users/${decoded}/categories/income`)
    .once('value')
        .then((snapshot) => snapshot.val())
        .then((val) => {
          Object.keys(val).map((key) => {
            IncomeCats.push({
              id: key,
              ...val[key]
            })
          }
          
          );
  
    })
        .catch((e) => {
        console.log('error fetching data', e)
    })

    return {
        props : {
          expenseCategories: [...expenseCats],
          IncomeCategories: [...IncomeCats]
        }
      }

}



const mapStateToProps = (state) => {
    return {


    };
};


export default connect(mapStateToProps)(AddCategory);