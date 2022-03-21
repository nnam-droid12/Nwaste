import React from 'react';
import FormInput from '../formInput/Forminput.component';
import './Signin.scss';
// import EmailIcon from '@mui/icons-material/Email';
// import HttpsIcon from '@mui/icons-material/Https';
import CustomButton from '../custombutton/CustomButton.component';
import GoogleButton from 'react-google-button';
import { signInWithGoogle } from './../../firebase/firebase.utils';


class SignIn extends React.Component{
    constructor(){
        super();
        this.state ={
            email: '',
            password: ''
        }
    }
    
    handleSubmit = event =>{
        event.preventDefault();
        this.setState({email: '', password: ''})
    }

    handleChange = (event) =>{
      const [ value, name ] = event.target;
      this.setState({ [value]:name })
    }
    render(){
        return(
            <div className='sign-in'>
             <h2 className='h2'>I already have an account</h2>
             <span className='span'>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                   <FormInput name='email' type='email'
                   value={this.state.email}
                   handleChange={this.handleChange}
                   label='email'
                   required />
                   <FormInput name='password' type='password'
                   value={this.state.password}
                   handleChange={this.handleChange}
                   label='password'
                   required />
                
                </form>
                    <div className='buttons'>
                    <CustomButton type='submit'> sign in </CustomButton>
                        <GoogleButton onClick={signInWithGoogle} 
                        label='Sign In With Google'
                        style={{marginLeft: '18px'}} />
                    </div>
            </div>
        );
    }
}

export default SignIn;