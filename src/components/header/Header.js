import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo1.png';
import { auth } from '../../firebase/firebase.utils';
import './Header.scss';
import { GoThreeBars } from "react-icons/go";

const Header = ({ currentUser }) =>{
    return(
        <nav className='header sticky'>
            <Link to='/'>
            <div> 
             {/* my logo === h1 */}
                <div className='logo-container'  title='Go to home page!'>
                    <div className='col'>
                    <img className='logo' alt='logo' src={Logo} style={{height: '65px', width: '65px'}}/> 
                    <div className='text col'>
                        Nwaste
                    </div>
                    </div>
                </div>     
                {/* the end of the logo */}
                
            </div> 
            </Link>
            <input type="checkbox" className="nav-toggle" id='nav-toggle'/>
            <label htmlFor='nav-toggle' className='nav-toggle-label'>
                    <span style={{color: 'dodgerblue'}}>
                        <GoThreeBars className='hamburger-btn' size='32px' />
                    </span>
            </label>
               <div className='options'>
                 <Link className='option' to='/about'>
                     ABOUT
                 </Link>
                 <Link className='option' to='/faq' >
                     FAQ
                 </Link>
                 {

                     currentUser?
                     // when user is sign in
                     <div className='option'>
                        <div className='option' onClick={() => auth.signOut(window.location = '/')}>
                        SIGN OUT</div>
                        <div className='option'><Link  to='/userhome'>VIEW PROFILE</Link>
                        </div>
                     </div>
                       // end of when user is signin
                       :
                     <Link className='option' to='/signin' >
                     SIGN IN
                     </Link>
                 }
                 <Link className='option' to='/farmers' >
                    FARM PRODUCT
                 </Link>

            </div>
        </nav>
    );
}

export default Header;