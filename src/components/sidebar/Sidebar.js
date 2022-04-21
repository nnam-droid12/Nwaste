import React from 'react';
import { sidebarData } from '../Sidebar.data';
import { IoMdContact } from "react-icons/io";
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import './Sidebar.scss';

const Sidebar = ({currentUser}) => {
    return ( 
        <div className='sidebar'>
            
            <ul className='sidebar-list'>
            <div id="contact-icon"><IoMdContact /></div>
            <div id='username'>{currentUser && <p>Welcome, {currentUser.displayName}</p> }</div>
                <h5 id='navigation'> Navigation</h5>
            {sidebarData.map((val, key)=> {
                return (
                    <li 
                    className='items' 
                    id={window.location.pathname  === val.link? "active": ''}
                    key={key} 
                    onClick={()=>{window.location.pathname  = val.link}}>
                        <div id="icon">{val.icon}</div>
                        <div id="title">{val.title}</div>
                    </li>
                )
            })}
            </ul>
        </div>
     );
}

const mapInitialStateToProps = state => ({
    currentUser: selectCurrentUser(state)
})
 
export default connect(mapInitialStateToProps)(Sidebar);