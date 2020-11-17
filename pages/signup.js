import {useState} from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import {useForm, Controller } from 'react-hook-form';
import {auth} from '../src/firebase/firebase';
import startAddUser, {startSignInUser} from '../src/actions/UserActions';
import { startAddAccount } from '../src/actions/AccountActions';
import db from '../src/firebase/firebase';



const SignUp = (props) => {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('');
    console.log(props)
    // const user = auth.currentUser;
    
    const {register, handleSubmit,control, errors, reset} = useForm({
        mode: "onChange",
        shouldFocusError: true,
        shouldUnregister: true,
    });
    
    const formData = ({name, email, password}) => {
        // console.log(name, email, password)
        auth.createUserWithEmailAndPassword(email, password)
            .then((cred) => {
                const {uid } = cred.user;
                props.dispatch(startAddUser({
                    name,email,password,uid
                }))
                const params = {email: email, password: password}

                const defaultAccount1 = {name : `${name}'s Cash`, currentAmount : 0, account_cat : "Assets", account_type : "Wallet", currency : "USD"}
                const defaultAccount2 = {name : `${name}'s Credit Card`, currentAmount : 0, account_cat : "Liabilities", account_type : "Credit Card", currency : "USD"}
                // props.dispatch(startAddAccount({
                //     name: defaultAccount1.name,
                //     currentAmount: defaultAccount1.currentAmount,
                //     account_type: defaultAccount1.type,
                //     account_cat  : defaultAccount1.cat,
                //     currency: defaultAccount1.currency

                // }))
                
            db.ref(`users/${uid}/accounts`).push(defaultAccount1)
            .then(() => {
                db.ref(`users/${uid}/accounts`).push(defaultAccount2)
                .then(() => {
                    setMessage('thank you');
                    props.dispatch(startSignInUser(params))
                })
                
            })
            

               
                  
                        
                
                
            })
            .catch((e) => {
                setError(e.message);
                
            })
    }

    return(
        <div>
            Hello from Sign Up
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit(formData)}>
                <label htmlFor="name">
                    <p> Enter Your Name</p>
                    <input type="text" name="name" ref={register}/>
                </label>
                <label htmlFor="email">
                    <p>Enter Your Email</p>
                    <input type="email" name="email" ref={register}/>
                </label>
                <label htmlFor="password">
                    <p>Enter Your password</p>
                    <input type="password" name="password" ref={register}/>
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
            <p>{error}</p>
            <p>{message}</p>
            <Link href="/">
                <a >Back to the Future</a>
            </Link>
        </div>
    )
}

// export default Login;

const mapStateToProps = (state) => {
    return {    
        auth : state.userState
    };
};


export default connect(mapStateToProps)(SignUp);