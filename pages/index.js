import {auth} from '../src/firebase/firebase';
import  Router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const Index = () => {
    auth.onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          Router.push('/dashboard')
        } else {
          // No user is signed in.
          // console.log('not hello')
        }
      });


    return(
        <div>
        <Head>
        <title>Finnikky</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" /> 
        </Head>
        <div className="landingPage">
        <div className="nav-content">   
            <div className="nav">
                
                <div className="logo">
                   

                </div>
                <div className="accountButtons">
                    <div className="login">
                    <Link href="/login">
                         <a>Login</a>
                    </Link>
                    </div>
                    <div className="signUp">
                       <Link href="/signup">
                         <a>Sign Up</a>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
            <div className="landingPage_body">
            <div className="landingPage_content">
                <div className="sales_pitch">
                    <div className="oneline_pitch">
                        <p>What Does Becoming Financially Independent Mean?</p>
                    </div>
                    <div className="sentence_pitch">
                    <p>
                   In general, reaching financial independence means you have enough income to pay for your living expenses for the rest of your life without having to work.
                    </p>
                    </div>
                    <div className="join_now_btn">
                        <Link href="/signup">
                         <a>Join Now</a>
                    </Link>
                    </div>
                </div>
                <div className="cool_illustration">
                <img src="/images/cool_illustration.png" alt=""/>
                </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export const getServerSideProps = () => {

    
  
   return {
    props : {
      
    }
  }
}



export default Index;