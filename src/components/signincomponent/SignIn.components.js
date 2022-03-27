import React from 'react';
import FormInput from '../formInput/Forminput.component';
import './Signin.scss';
// import EmailIcon from '@mui/icons-material/Email';
// import HttpsIcon from '@mui/icons-material/Https';
import CustomButton from '../custombutton/CustomButton.component';
import GoogleButton from 'react-google-button';
import { auth, provider } from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
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
             <h2 className='h2'>I already have an account</h2>
             <span className='span'>Sign in with your email and password</span>
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
                  <div className='buttons'>
                    <CustomButton type='submit'> sign in </CustomButton>
                        <GoogleButton onClick={this.signInWithGoogle} 
                        
                        label='Sign In With Google'
                        style={{marginLeft: '18px'}} />
                    </div>
                </form>
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