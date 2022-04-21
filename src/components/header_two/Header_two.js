import React from 'react'
import { FaSistrix } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import Logo from '../../assets/logo1.png';
import { GoThreeBars } from "react-icons/go";
import { BsMicFill } from 'react-icons/bs';
import './Header_two.scss';



const HeaderTwo = ({ micspeak, sttFromMic, setSearch, currentUser, search, clearBtn  }) => {

    return ( 
        <nav>
         <div className="nav-container">
            <Link to='/'>
             <div> 
                <div className='logo-container' title='Go to home page!'>
                    <div className='col'>
                    <img className='logo' alt='logo' src={Logo} style={{height: '65px', width: '65px'}}/> 
                    <div className='text-2 col'>
                        Nwaste
                    </div>
                </div>
                </div>    
            </div> 
            </Link>

            <div className="search">
                <input
                type='search'
                value={search}
                onChange={(e) => setSearch(e.target.value || e.micspeak)}
                className="input" 
                placeholder="Search. . ."
                />
                
                <div className="search-icon">
                
                    {
                      !search.length?  <FaSistrix /> : <AiOutlineClose onClick={clearBtn}/>
                    }
                    <span className='partition'>|</span> <BsMicFill onClick={sttFromMic} />
                </div>
            </div>

            <input type="checkbox" className="nav-toggle" id='nav-toggle'/>
            <label htmlFor='nav-toggle' className='nav-toggle-label'>
                    <span style={{color: 'dodgerblue'}}>
                        <GoThreeBars className='hamburger-btn' size='32px' />
                    </span>
            </label>
            <div className='options'>
                <Link className='option' to='/loan' >
                    LOAN
                </Link>
                <Link className='option' to='/faq' >
                    FAQs
                </Link>
               
                {
                    currentUser?
                    <div className='display-option'>
                        <div className='option' onClick={() => auth.signOut(window.location = '/')} >
                            LOGOUT
                        </div>
                       
                        <Link className='option' to='/userhome'>
                        PROFILE
                        </Link> 
                         
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