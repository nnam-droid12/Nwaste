import React from 'react';
import FormInput from '../formInput/Forminput.component';
import CustomButton from '../custombutton/CustomButton.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo1.png';
import './SignUp.scss';


class SignUp extends React.Component {
    constructor(){
        super();
        this.state ={
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event =>{
        event.preventDefault();
        const { displayName, email, password, confirmPassword } =this.state;

        if(password !== confirmPassword){
            alert("password don't match");
            return;
        }
        try{
          const { user } = await auth.createUserWithEmailAndPassword(
              email, 
              password);
              user.updateProfile({
                  displayName: displayName
              }).then(() =>{
                  console.log('name updated successfully');
              }).catch((error) =>{
                  console.log(error);
              })
              auth.onAuthStateChanged(user => {
                if(user){
                    window.location = '/userhome';
                }
            });

            await createUserProfileDocument(user, { displayName });

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }catch(error){
          console.log(error);
        }
    };

    handleChange = event =>{
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


    render(){
        const { displayName, email, password, confirmPassword } =this.state;
        return(
            <div className='sign-up'>
            <div className='sign-in-bg'>
            <div className='sign-in-header'>
                <div >
                <img className='sign-logo' alt='logo' src={Logo} style={{height: '55px', width: '55px'}}/> 
                </div>
                <h2>Create An Account</h2>
                <span>Sign up with your username and password</span>
            </div>
               <form 
               className='signin-form'
               onSubmit={this.handleSubmit}>
                   <FormInput type='text'
                   name='displayName'
                   value={displayName}
                   onChange={this.handleChange}
                   label='name'
                    required />
                     <FormInput type='email'
                   name='email'
                   value={email}
                   onChange={this.handleChange}
                   label='email'
                    required />
                     <FormInput type='password'
                   name='password'
                   value={password}
                   onChange={this.handleChange}
                   label='password'
                    required />
                    <FormInput type='Password'
                   name='confirmPassword'
                   value={confirmPassword}
                   onChange={this.handleChange}
                   label='confirm password'
                    required />
                    <div className='buttons'>
                         <CustomButton type='submit'> sign up </CustomButton>
                    </div>
                    <div className='signin-and-link'>
                    <p style={{color: '#4285f4'}}>Already Have An Account? 
                        <Link to='/signin'>
                            .<button className='sign-in-btn'>Sign in</button>
                        </Link>
                    </p> 
                    </div>
               </form>
            </div>
            </div>
           );
    }
}

export default SignUp;