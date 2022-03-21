import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo1.png';
import './Header.scss';

const Header = () =>{
    return(
        <div className='header'>
            <Link className='logo-container' to='/'>
                <img className='logo' alt='logo' src={Logo} /><span style={{color: 'blue'}}> Nwaste</span>
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