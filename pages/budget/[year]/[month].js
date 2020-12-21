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
    console.log(props, 'props')
    let budgets =  props.budgets;
    const chktm = props.trtr.map(e => {
        return(
            moment(e.createdAt).isSame(new Date(), 'month')
        )
    })
    console.log(chktm, 'chk')
    console.log(moment().month(props.params.month).format("M"), 'parapluie')
    console.log(moment().year(props.params.year).format("Y"), 'parapluie 2')
    let paramDate = `${moment().year(props.params.year).format("Y")}-${moment().month(props.params.month).format("M")}-28`

    console.log(paramDate, 'paramDate')
    // console.log(moment(paramDate).subtract(1, 'month').add(1, 'day').format("MMMM").toLowerCase(), 'juji fruits')
    let prevM = moment(paramDate).subtract(1, 'month').add(1, 'day').format("MMMM").toLowerCase();
    // let prevM = moment(paramDate).subtract(1, 'month').add(1, 'day').format("MMMM").toLowerCase();
    
    // console.log(moment(prevM).add(2, 'M'), 'juji fruits')
    
    let nextY = moment(paramDate).add(1, 'month').format("YYYY");
    console.log(nextY,'juji fruits');
    let prevY = moment(paramDate).subtract(1, 'month').format("YYYY");
    console.log(nextY,'juji fruits');
    let nextM = moment(paramDate).add(1, 'month').format("MMMM").toLowerCase();
    // console.log(moment(paramDate).add(1, 'month').format("MMMM"), 'juju fruits 2')
    // const j = props.katsu.map(m => {
    //    let  sum = 0;
    //     return(
    //         // e.label
    //         props.trtr.map(e => {
    //             return(
    //             //    console.log(e.category.label, 'poopee')
    //                 console.log(m.label)
    //             )
    //         })

    //     )
    // })
    const save = (value,label) => {
        props.dispatch(AddBudget({
            month:props.params.month,
            year:props.params.year,
            category: label,
            budget: value
        }))
       
        console.log( value,label)
    }
    const cancel = () => {
        console.log('cancelled')
      };

    const arctic = () => {
       let totes = 0
            props.trtr.map(e => {

                if(moment(e.createdAt).isSame(paramDate, 'month') && moment(e.createdAt).isSame(paramDate, 'year')){
                    totes += e.amount
                }
                // if(e.category.label === g.label){
                //     // console.log(e.category.label , g.label, 'mellow')
                
                // }

            })
            console.log(totes, 'toast');
    
    }
    let totes = 0;
    return(
        <div>
            <h2>{props.params.month.capitalize()} - {props.params.year}</h2>
        
        {props.trtr.map(e => {

            if(moment(e.createdAt).isSame(paramDate, 'month') && moment(e.createdAt).isSame(paramDate, 'year')){
                totes += e.amount
            }
            // if(e.category.label === g.label){
            //     // console.log(e.category.label , g.label, 'mellow')
            
            // }

        })}
       <p><b> Total Expenses for the Month {totes}</b></p>
        {props.katsu.map((e,i) => {
            let sum = 0;
            let qq = 0;
            budgets.map(w => {
                if(w.cat === e.label){
                    qq = w.budget;
                }
                // console.log(qq, 'qq')
            })
            
            return(
                <div key={i}>
                    
                    <span>
                        {props.trtr.map(h => {
                            // console.log(moment(h.createdAt).isSame(props.params.month, 'month'), 'haiya')
                            if(h.category.label === e.label && moment(h.createdAt).isSame(paramDate, 'month')){
                                
                                sum += h.amount
                                console.log(sum);
                                
                            }
                        })}
                    </span>
                    {e.label} - {sum}
                    <br/>
                    {(qq-sum == 0) ? 'ditto' :  (qq-sum > 0 ? 'left' : ' over')} ___ {Math.abs(qq-sum)} 
                    <br/><br/>
                    <span>Budgeted Amount</span>
                    { <EasyEdit
                        type={Types.NUMBER}
                        value={qq ||'Set Budget'}
                        onSave={(value) => {save(value,e.label)}}   
                        onCancel={cancel}
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
  let catsAvail = [];
  let trtr = [];

  const dbdb = await db.ref(`users/${decoded}/categories/expense`)
  .once('value')
      .then((snapshot) => snapshot.val())
      
      .then((val) => {
        Object.keys(val).map((key) => {
            catsAvail.push({
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
            trtr.push({
              id: key,
              ...val[key]
            })
          }
          
          );

  })
      .catch((e) => {
      console.log('error fetching data', e)
  })
  
  let budCats = [];

  const dbdb2 = await db.ref(`users/${decoded}/budget/${params.year}/${params.month}`)
  .once('value')
      .then((snapshot) => snapshot.val())
      
      .then((val) => {
        Object.keys(val).map((key) => {
            budCats.push({
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
            katsu: catsAvail,
            trtr: trtr,
            budgets: budCats
        }
    }
}

// export default Budgeting;

const mapStateToProps = (state) => {
    return {    
        
    };
};


export default connect(mapStateToProps)(Budgeting);