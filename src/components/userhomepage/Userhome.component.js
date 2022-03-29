import React from 'react';
// import axios from 'axios';
import './Userhome.scss';


const UserHomePage = (props) => {
    console.log(props.currentUser)

    const fetchData = () => {
        fetch('http://localhost:5000/userweather', {
            method: 'get',
            headers:{'Content-Type': 'application/json' }
        }).then((response) =>{
            console.log(response)
            return response.json();
        }).catch((error) =>{
            console.log(error)
        })

    }    
            
    return(
        <div className='user-home'>
        {props.currentUser && <h1>welcome {props.currentUser.displayName}</h1>}
          
            <section>
              <button onClick={fetchData}>
                 Get Current Weather
              </button>
            </section>


        </div>
    );
}

export default UserHomePage;