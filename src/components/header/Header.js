import React from 'react';
import { Link } from 'react-router-dom';
// import { ReactComponent as Logo } from '../assets/logo.svg';
import './Header.scss';

const Header = () =>{
    return(
        <div className='header'>
            <Link className='logo-container' to='/'>
              <span style={{color: 'green', fontSize:'bold'}}>N
              <span style={{color: 'blue', fontSize: 'bold'}}>WAS
              <span style={{color: 'red', fontSize: 'bold'}}>TE</span></span></span>
            </Link>
               <div className='options'>
                 <Link className='option' to='/about'>
                     ABOUT
                 </Link>
                 <Link className='option' to='/faq' >
                     FAQ
                 </Link>
                 <Link className='option' to='/signin' >
                     SIGN IN
                 </Link>
               </div>
        </div>
    );
}

export default Header;