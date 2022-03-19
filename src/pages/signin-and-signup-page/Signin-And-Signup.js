import React from 'react';
import SignIn from '../../components/signincomponent/SignIn.components';
import SignUp from '../../components/signup-component/SignUp.component';
import './Signin-and-Signup.scss';

const SigninAndSignupPage = () =>{
    return(
        <div className='signin-signup'>
           <SignIn />
           <SignUp />
        </div>
    );
}

export default SigninAndSignupPage;