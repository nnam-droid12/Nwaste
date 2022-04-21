import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo1.png';
import { auth } from '../../firebase/firebase.utils';
import { GoThreeBars } from "react-icons/go";
import { MdArrowRightAlt } from "react-icons/md";
import './Header.scss';


const Header = ({ currentUser }) =>{
    return(
        <nav className='header sticky'>
            {/* my logo === h1 */}
            <Link to='/'>
             <div> 
                    <div className='logo-container' title='Go to home page!'>
                    <div className='col'>
                    <img className='logo' alt='logo' src={Logo} style={{height: '65px', width: '65px'}}/> 
                        <div className='text col'>
                            Nwaste
                        </div>
                </div>
                </div>    
            </div> 
            </Link>
             {/* the end of the logo */} 
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
                 <Link className='option' to='/loan' >
                    LOAN
                </Link>
                 {
                     currentUser ?
                     // when user is sign in
                        <Link className='option' to='/userhome'>
                        PROFILE
                        </Link>   
                    :
                        <Link className='option' to='/signin' >
                            LOGIN
                        </Link>
                 }

                 <div>
                 <Link className='options' to="/farmers" >
                    <button 
                        className='get-started'>
                        <span className='get-started-btn'>Market place</span>
                        <span 
                        className="get-started-icon"
                        size='30px'
                        ><MdArrowRightAlt />
                        </span>
                    </button>
                 </Link>
                 </div>
        </div>
        <Link to="/farmers">
            <button className='products'>
                Market place
            </button>
        </Link>
        </nav>
    );
}

export default Header;