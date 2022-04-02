import React from 'react';
import './Farmers.scss';

const Farmers = ({ name, location, price }) => {

    return(
        <div className='farmer-card' style={{marginTop: '500px'}}>
                
                    <h2>product name {name}</h2>
                    <h4>price {price}</h4>
                    <h4>location {location}</h4>                    
               
        </div>
    );
}

export default Farmers;