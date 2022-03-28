import React from 'react';
import FormInput from '../formInput/Forminput.component';
import './Signin.scss';
import ParticlesContainer from '../particles/ParticlesContainer'
import CustomButton from '../custombutton/CustomButton.component';
import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';
import { auth, provider } from '../../firebase/firebase.utils';
import {getRedirectResult} from 'firebase/auth'







class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: ''
        }
    }

    componentDidMount(){
        const fetchGoogleSignIn = async ()=>{
           const response =  await getRedirectResult(auth);

           if(response){
              
             window.location='/userhome'
           }
        }

        fetchGoogleSignIn();
    }
    
    handleSubmit = async event =>{
        event.preventDefault();
        const { email, password } = this.state;
        try{
            await auth.signInWithEmailAndPassword(email, password);
            auth.onAuthStateChanged(user => {
                if(user){
                    window.location = '/userhome';
                }
            });
            this.setState({ email: '', password: '' });
        } catch(error){
            console.log(error);
        }
    };

    handleChange = event =>{
      const { value, name } = event.target;
      this.setState({ [name]: value });
    }

    signInWithGoogle = async () =>{
        auth.signInWithRedirect(provider);
    
    }
    render(){
        return(
        <div className='sign-in'>
            {/* <ParticlesContainer /> */}
             <div className='sign-in-text'>
             <h2 className='h2'>I already have an account</h2>
             <span className='span'>Sign in with your email and password</span>

             </div>

                <form onSubmit={this.handleSubmit}  >
                   <FormInput name='email' 
                   type='email'

                   value={this.state.email}
                   handleChange={this.handleChange}
                   label='email'
                   required />
                   <FormInput name='password' 
                   type='password'
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
                            onClick={this.signInWithGoogle}>Sign in with google</GoogleButton>
                        </div>
                    </div>
                        <div className='signup-and-link'>
                        <p style={{color: '#4285f4', textAlign: 'center'}}>Don't Have An Account?
                            <Link to='/signup'>
                            <button className='sign-up-btn'>Sign up</button>
                            </Link>
                        </p> 
                        </div>
        
                <Link 
                    style={{textDecoration: 'none', color: '#4284f4', 
                    marginTop: '10%', display: 'flex', 
                   justifyContent: 'center'}} 
                    to='/forgotpassword' >Forgot Password?</Link>
            </div>
        );
    }
}

export default SignIn;