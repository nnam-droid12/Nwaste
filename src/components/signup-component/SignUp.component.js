import React from 'react';
import FormInput from '../formInput/Forminput.component';
import CustomButton from '../custombutton/CustomButton.component';
import './SignUp.scss';


class SignUp extends React.Component {
    constructor(){
        super();
        this.state ={
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = event =>{
        event.preventDefault();
        this.setState({ name: '',
         email: '', 
         password: '' })
    }

    handleChange = (event) =>{
        const [ value, name ] = event.target;
        this.setState({ [value]: name })
    }


    render(){
        return(
            <div className='sign-up'>
              <h2>I do not have an account</h2>
              <span>Sign up with your username and password</span>
               <form onSubmit=''>
                   <FormInput type='text'
                   name='name'
                   value={this.state.name}
                   label='name'
                    required />
                     <FormInput type='email'
                   name='email'
                   value={this.state.email}
                   label='email'
                    required />
                     <FormInput type='password'
                   name='password'
                   value={this.state.password}
                   label='password'
                    required />
                    <FormInput type='confirmPassword'
                   name='confirmPassword'
                   value={this.state.confirmPassword}
                   label='confirm password'
                    required />
                    <div className='buttons'>
                         <CustomButton> sign up </CustomButton>
                    </div>
               </form>
            </div>
           );
    }
}

export default SignUp;