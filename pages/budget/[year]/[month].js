import { connect } from 'react-redux';
import db from '../../../src/firebase/firebase';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import moment from 'moment';
import EasyEdit, { Types } from "react-easy-edit";
import {AddBudget} from '../../../src/actions/OtherActions';
import Link from 'next/link';

const Budgeting = (props) => {
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    let budgets =  props.budgets;
    
    let paramDate = `${moment().year(props.params.year).format("Y")}-${moment().month(props.params.month).format("M")}-28`;

    let prevM = moment(paramDate).subtract(1, 'month').add(1, 'day').format("MMMM").toLowerCase();
    
    let nextY = moment(paramDate).add(1, 'month').format("YYYY");
    let prevY = moment(paramDate).subtract(1, 'month').format("YYYY");
    let nextM = moment(paramDate).add(1, 'month').format("MMMM").toLowerCase();
    
    const save = (value,label) => {
        props.dispatch(AddBudget({
            month:props.params.month,
            year:props.params.year,
            category: label,
            budget: value
        }))
       
       
    }
   let totalExpenses = 0;
    return(
        <div>
            <h2>{props.params.month.capitalize()} - {props.params.year}</h2>
        
        {props.uTransactions.map(e => {

            if(moment(e.createdAt).isSame(paramDate, 'month') && moment(e.createdAt).isSame(paramDate, 'year')){
                totalExpenses += e.amount
            }

        })}
       <p><b> Total Expenses for the Month {totalExpenses}</b></p>
        {props.expensesCats.map((e,i) => {
            let sum = 0;
            let setBudget = 0;
            budgets.map(x => {
                if(x.cat === e.label){
                    setBudget = x.budget;
                }
               
            })
            
            return(
                <div key={i}>
                    
                    <span>
                        {props.uTransactions.map(h => {
                           if(h.category){
                            if(h.category.label === e.label && moment(h.createdAt).isSame(paramDate, 'month')){
                                
                                sum += h.amount
                               
                                
                            }
                           }
                           
                        })}
                    </span>
                    {e.label} - {sum}
                    <br/>
                    {(setBudget-sum == 0) ? 'ditto' :  (setBudget-sum > 0 ? 'left' : ' over')} ___ {Math.abs(setBudget-sum)} 
                    <br/><br/>
                    <span>Budgeted Amount</span>
                    { <EasyEdit
                        type={Types.NUMBER}
                        value={setBudget ||'Set Budget'}
                        onSave={(value) => {save(value,e.label)}}   
                        saveButtonLabel="Save"
                        cancelButtonLabel="Cancel"
                        attributes={{ name: "awesome-input", id: 1 }}
                        instructions="Click to"
                    />} 
                    
                    <br/>
                    <hr/>
                    
                </div>
            )
        })}
        <p><Link href={`/budget/${prevY}/${prevM}`}>
                        <a>Previous Month Budget</a>
                    </Link></p>
        <p><Link href={`/budget/${nextY}/${nextM}`}>
                        <a>Next Month Budget</a>
                    </Link></p>
            
        </div>
    )
}


export const getServerSideProps = async ({params, req}) => {

    let decoded = 'dGZZ2xH3toXlfGU2W2F5iifEkMJ3'
  if(req.headers.cookie){
    const parsedCookies = cookie.parse(req.headers.cookie)
    decoded = jwt.decode(parsedCookies.userId, { header: true })
  }
  let expensesCats = [];
  let uTransactions = [];

  const dbdb = await db.ref(`users/${decoded}/categories/expense`)
  .once('value')
      .then((snapshot) => snapshot.val())
      
      .then((val) => {
        Object.keys(val).map((key) => {
            expensesCats.push({
              id: key,
              ...val[key]
            })
          }
          
          );

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })
  
  const dbdb1 = await db.ref(`users/${decoded}/transactions`)
  .once('value')
      .then((snapshot) => snapshot.val())
      
      .then((val) => {
        Object.keys(val).map((key) => {
            uTransactions.push({
              id: key,
              ...val[key]
            })
          }
          
          );

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })
  
  let ymBudget = [];

  const dbdb2 = await db.ref(`users/${decoded}/budget/${params.year}/${params.month}`)
  .once('value')
      .then((snapshot) => snapshot.val())
      
      .then((val) => {
        Object.keys(val).map((key) => {
            ymBudget.push({
              cat: key,
              ...val[key]
            })
          }
          
          );

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })




    return{
        props: {
            params: params,
            expensesCats: expensesCats,
            uTransactions: uTransactions,
            budgets: ymBudget
        }
    }
}

// export default Budgeting;

const mapStateToProps = () => {
    return {    
        
    };
};


export default connect(mapStateToProps)(Budgeting);