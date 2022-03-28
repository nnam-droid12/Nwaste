import React from 'react';
import FormInput from '../formInput/Forminput.component';
import './Signin.scss';
import ParticlesContainer from '../particles/ParticlesContainer'
import CustomButton from '../custombutton/CustomButton.component';
import GoogleButton from 'react-google-button';
import { signInWithGoogle } from './../../firebase/firebase.utils';
import { Link } from 'react-router-dom';


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
            <ParticlesContainer />
             <div className='sign-in-text'>
             <h2 className='h2'>I already have an account</h2>
             <span className='span'>Sign in with your email and password</span>
             </div>
                <form 
                className='signin-form'
                onSubmit={this.handleSubmit}>
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
                    <div className='btn-and-link'>
                        <div className='sign-in-btns'>
                            <CustomButton
                                
                              type='submit'> sign in </CustomButton>
                            <GoogleButton 
                            className='google-btn'
                            onClick={signInWithGoogle}>Sign in with google</GoogleButton>
                        </div>
                        <div className='signup-and-link'>
                        <p style={{color: '#4285f4', textAlign: 'center'}}>Don't Have An Account?
                            <Link to='/signup'>
                            <button className='sign-up-btn'>Sign up</button>
                            </Link>
                        </p> 
                        </div>
                    </div>
            </div>
        );
    }
}

export default SignIn;