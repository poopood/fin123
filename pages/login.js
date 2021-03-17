import {useState} from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import {useForm, Controller } from 'react-hook-form';

import {startSignInUser} from '../src/actions/UserActions';

//error message

const Login = (props) => {

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
            <p>{error}</p>
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