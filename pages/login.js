import {useState} from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import {useForm, Controller } from 'react-hook-form';
import {auth} from '../src/firebase/firebase';
import  Router from 'next/router';
import {startSignInUser} from '../src/actions/UserActions';
import jwt from 'jsonwebtoken';


const Login = (props) => {

    // var decoded = jwt.verify(token, 'shhhhh');
    // console.log(auth.currentUser.uid, 'sdfdsfsdfsdf')
    console.log(props)

    const [error, setError] = useState('')
    
    const {register, handleSubmit,control, errors, reset} = useForm({
        mode: "onChange",
        shouldFocusError: true,
        shouldUnregister: true,
    });

    const formData = (data) => {
        // console.log(name, email, password)
       
        props.dispatch(startSignInUser(data));
       
    }

    return(
        <div>
            <h3>Login</h3>
            <form onSubmit={handleSubmit(formData)}>
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
            <Link href="/signup">
                <a>Dont have an Account</a>
            </Link>
        </div>
    )
}

// export default Login;

const mapStateToProps = (state) => {
    return {
        userState : state.userState.userID
    };
};


export default connect(mapStateToProps)(Login);