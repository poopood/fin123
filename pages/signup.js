import {useState} from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import {useForm, Controller } from 'react-hook-form';
import {auth} from '../src/firebase/firebase';
import startAddUser, {startSignInUser} from '../src/actions/UserActions';
import db from '../src/firebase/firebase';
import  {useToast}  from "@chakra-ui/toast";


const SignUp = (props) => {
    const [error, setError] = useState('')
    const [message, setMessage] = useState('');

    const toast = useToast();
    const id = "test-toast";

    const toastFunc = () => {
        if (!toast.isActive(id)) {
        toast({
            id,
            title: "Welcome",
            status: "success",
            duration: 9000,
            isClosable: true,
            position:"bottom"
          })

        }
    }

    
    const {register, handleSubmit,control, errors, reset} = useForm({
        mode: "onChange",
        shouldFocusError: true,
        shouldUnregister: true,
    });
    
    const formData = ({name, email, password}) => {
        // console.log(name, email, password)
        //create an action here for the sign up and the subsequent adding of default accounts
        auth.createUserWithEmailAndPassword(email, password)
            .then((cred) => {
                const uuser = auth.currentUser;
                uuser.updateProfile({
                    displayName: name
                  })
                const {uid } = cred.user;
                props.dispatch(startAddUser({
                    name,email,password,uid
                }))
                const params = {email: email, password: password}

                const defaultAccount1 = {name : `${name}'s Cash`, currentAmount : 0, account_cat : "Assets", account_type : "Wallet", currency : "USD"}
                const defaultAccount2 = {name : `${name}'s Credit Card`, currentAmount : 0, account_cat : "Liabilities", account_type : "Credit Card", currency : "USD"}
                const defaultCategory = {value:'other', label:'Other'};
               
                
            db.ref(`users/${uid}/accounts`).push(defaultAccount1)
            .then(() => {
                
                db.ref(`users/${uid}/accounts`).push(defaultAccount2)
                db.ref(`users/${uid}/categories/expense`).push(defaultCategory)
                db.ref(`users/${uid}/categories/income`).push(defaultCategory)
                .then(() => {
                    toastFunc();
                    props.dispatch(startSignInUser(params))
                })
                
            })

            })
            .catch((e) => {
                // setError(e.message);
                if (!toast.isActive(id)) {
                    toast({
                        id,
                        title: `${e.message}`,
                        status: "error",
                        duration: 1000,
                        isClosable: true,
                        position:"bottom"
                      })
            
                    }
                
            })
    }

    return(
        <div className="signup_body">
            <div className="signup_form">
            <div className="logo">
             
            </div>
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
                    <p>Enter a password</p>
                    <input type="password" name="password" ref={register}/>
                </label>
                <br/>
                <button className="submit_btn_signup" type="submit">Submit</button>
            </form>
            
        
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
            <Link href="/login">
            <span>already have an account? <a>Sign in</a></span>
            </Link>
            </div>
        </div>
    )
}

// export default Login;

const mapStateToProps = () => {
    return {    
        
    };
};


export default connect(mapStateToProps)(SignUp);