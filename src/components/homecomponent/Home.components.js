import React from 'react';
import Usereview from '../reviewpage/Review.components';
import './HomePage.css'

const HomePage = () => {
    return(
        <div className='home-page'>
    <section className="review">
        <div className='title'>
            <h2>User Reviews</h2>
            <div className='underline'></div>
        </div>
        <Usereview />
    </section>
        </div>
    );
}

export default HomePage;