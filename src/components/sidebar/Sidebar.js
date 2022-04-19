import './Sidebar.scss';
import { sidebarData } from '../Sidebar.data';
import { IoMdContact } from "react-icons/io";

const Sidebar = ({props}) => {
    return ( 
        <div className='sidebar'>
            
            <ul className='sidebar-list'>
            <div id="contact-icon"><IoMdContact /></div>
            <div id='username'>{props.currentUser && <p>Welcome, {props.currentUser.displayName}</p>}</div>
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
 
export default Sidebar;