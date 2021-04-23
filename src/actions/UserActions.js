
import db from '../firebase/firebase';
import {auth} from '../firebase/firebase';
import  Router from 'next/router';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';




const AddUser = (user) => ({
    type: 'CREATE_USER',
    user 
})

const startAddUser = ({name = '', email = '', password = '', uid} = {}) => {
    
    const user = {name, email, password, uid}
    
    return (dispatch) => {
        db.ref('authUsers').push(user).then((ref) => {
            console.log(ref)
            dispatch(AddUser({
                ...user
            }))
            setTimeout(() => {
                Router.push('/')
            }, 1000 )
        }) 
    }
}

const SignInUser = (uid) => ({
    type: 'USER_AUTH_SIGN_IN',
    uid
})

const startSignInUser = ({email, password} = {}) => {
    // const [error, setError] = useState('');
    // const toast = useToast();
    return (dispatch) => {
        auth.signInWithEmailAndPassword(email, password)
            .then((cred) => {
            dispatch(SignInUser(cred.user.uid))
            localStorage.setItem('User', JSON.stringify(cred.user.uid));

            const uidToken= jwt.sign(cred.user.uid, 'shhhhh');

            Cookies.set("userId", uidToken);
           
          
            setTimeout(() => {
                Router.push('/dashboard')
            }, 1000 )
            
            
            })
            .catch((e) => {
                
                alert(e.message);
                
                
            })
        
    }
}

const LogoutUser = () => {
    auth.signOut().then(() => {
        Router.push('/login');
        Cookies.remove('userId');
        localStorage.clear();
       
  

    })
}

export {startAddUser as default, LogoutUser, startSignInUser, SignInUser}