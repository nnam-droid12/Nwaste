import { FaSistrix } from "react-icons/fa";
// import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import Logo from '../../assets/logo1.png';
import { GoThreeBars } from "react-icons/go";
import './Header_two.scss';

const HeaderTwo = ({ products,handleFilter, searchName, clrBtn, currentUser }) => {
    return ( 
        <nav>
         <div className="nav-container">
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

            <div className="search">
                <input
                type='search'
                value={searchName}
                onChange={handleFilter}
                className="input" 
                placeholder="Search products"
                />
                <div className="search-icon">
                    {
                        <FaSistrix /> 
                    }
                </div>
            </div>

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
                    currentUser?
                    <div className='option' onClick={() => auth.signOut(window.location = '/')} >
                            LOGOUT
                        </div>
                    :
                    <Link className='option' to='/signin'>
                    LOGIN
                    </Link>
                    
                }
               
            </div>
          </div>
        </nav>
     );
}
 
export default HeaderTwo;