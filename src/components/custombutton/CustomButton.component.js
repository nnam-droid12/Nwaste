import React from 'react';
import './CustomButton.scss';

const CustomButton = ({ children, isGoogleSignin, ...OtherProps }) =>{
    return(
          <button className={`${isGoogleSignin ? 'google-sign-in' : ''} custom-button`}
          {...OtherProps}>
             {children}
          </button>
    );
}

export default CustomButton;