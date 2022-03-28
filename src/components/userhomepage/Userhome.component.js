import React from 'react';
// import axios from 'axios';
import './Userhome.scss';


const UserHomePage = (props) => {
    console.log(props.currentUser)

    return(
        <div className='user-home'>
        {props.currentUser && <h1>welcome {props.currentUser.displayName}</h1>}
          
        
             
           <button >
           Get Polygon Graph For Soil Data
           </button>

             <button>
                 get current weather
             </button>


             <p></p>
        </div>
    );
}

export default UserHomePage;