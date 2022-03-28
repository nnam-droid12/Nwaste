import React from 'react';
import './ForgotPassword.scss';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebase.utils';




const ForgotPassword = ({email}) =>{

    const sendPasswordReset = async (email) => {
        try{
          await sendPasswordResetEmail(auth,email);
           alert('password reset link sent successfully')
        } catch(error){
          alert(error.message)
        }
     }
    return(
        <div className='password-reset'>
        <form onSubmit={sendPasswordReset}>
          <input type='email'
          name='email'
          placeholder='email'
          value={email}
           required />

          <div className='btn'>
              <button type='submit'>Submit Email</button>
          </div>
          </form>
        </div>  
    );
}

export default ForgotPassword;