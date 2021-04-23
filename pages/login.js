import {useState} from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import {useForm, Controller } from 'react-hook-form';
import  Router from 'next/router';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import {startSignInUser} from '../src/actions/UserActions';
import {auth} from '../src/firebase/firebase';
import * as React from "react";
 import  {useToast}  from "@chakra-ui/toast";

//error message

const Login = (props) => {
    const [error, setError] = useState('');
    const toast = useToast();
    
  
    const {register, handleSubmit,control, errors, reset} = useForm({
        mode: "onChange",
        shouldFocusError: true,
        shouldUnregister: true,
    });

    const formData = ({email, password}) => {
        // console.log(name, email, password)
        // console.log(data);
       
        // props.dispatch(startSignInUser(data));
        auth.signInWithEmailAndPassword(email, password)
        .then((cred) => {
            // dispatch(SignInUser(cred.user.uid))
            localStorage.setItem('User', JSON.stringify(cred.user.uid));

            const uidToken= jwt.sign(cred.user.uid, 'shhhhh');
            console.log(cred.user,'cred.user');

            Cookies.set("userId", uidToken);
           
          
            setTimeout(() => {
                Router.push('/dashboard')
                toast({
                    title: "Welcome back.",
                    status: "success",
                    duration: 1000,
                    isClosable: true,
                    position:"top"
                  })
            }, 1000 )  
            
            
            })
            .catch((e) => {
                
                // alert(e.message);
                setError(e.message)
                toast({
                    title: "Error.",
                    description: `${e.message}`,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  })
                
                
            })
       
    }

    return(
        <div className="login_body">
            <div className="login_form">
             <div className="logo">
             
             </div>
            <form onSubmit={handleSubmit(formData)}>
                <label htmlFor="email">
                    <p> &nbsp;  Email Address</p>
                    <input type="email" name="email" ref={register}/>
                </label>
                <label htmlFor="password">
                    <p>&nbsp;  Password</p>
                    <input  type="password"  name="password" ref={register}/>
                </label>
                <br/>
                <button type="submit" className="submit_btn">Log in</button>
            </form>
        
            <Link href="/signup">
                <span>Don't have an account? <a>Sign up</a></span>
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


export default connect(mapStateToProps)(Login);