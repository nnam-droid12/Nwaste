import React, { useState } from 'react';
import reviews from '../../reviewdata/Review-Data';
import { MdArrowRightAlt, MdShoppingCart } from "react-icons/md";
import { HiAcademicCap, HiArrowsExpand } from "react-icons/hi";
import { WiCloudUp } from "react-icons/wi";
import { Link } from 'react-router-dom';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import Footer from '../footer/Footer';
import './HomePage.scss';

const HomePage = () => {
    // The beginning of the nexting and previewing function
    const [index, setIndex] = useState(3);
    const {name, job, text} = reviews[index];

    // limit setting
   const checkNumber =(number) =>{
       if(number > reviews.length - 1){
           return 0;
       }
       if(number < 0){
           return reviews.length - 1;
       }
       return number;
   }

   //nexting function
    const nextPerson = () =>{
        setIndex((index)=>{
            let newIndex = index + 1;
            return checkNumber(newIndex);
        });
   }

    //previewing function
   const prePerson = () =>{
    setIndex((index)=>{
        let newIndex = index - 1;
        return checkNumber(newIndex);
        });
    }
    //The end of the nexting and previewing function

    return(
        <div >
          <div className='container'>
              <div className='outer'>
                <div className='details'>
                    <h1>Nwaste the game changer is helping the farmers getting the most from their harvest and making farmers happy.</h1>
                    <p>Our Mission is Zero Hunger in 2030</p>
                    <Link to='/signin'><button 
                    className='get-started'>
                    <span className='get-started-btn'>Get Started</span>
                    <span 
                    className="get-started-icon"
                    size='30px'
                    ><MdArrowRightAlt /></span>
                    </button>
                    </Link>
                </div>
              </div>
          </div>

          
          {/* The beginning of service*/}
          <section className="service">
            <h1 className='service-title' >What We Do</h1>
            <div className="service-container">  
                <div className="container-item">
                <WiCloudUp 
                    className="service-icon"
                    size="70px"
                />
                <p>Ensusring that the wether condition is compartible with the farmer soil</p>
                </div>
            <div className="container-item">
                <HiArrowsExpand 
                    className="service-icon"
                    size="70px"
                />
                <p>Ensusring that the wether condition is compartible with the farmer soil</p>
            </div>
            <div className="container-item">
                <MdShoppingCart 
                    className="service-icon"
                    size="70px"
                />
                <p>Reducing the billions of food wasted every year from adverse weather condition</p>
            </div>
            <div className="container-item">
                <HiAcademicCap 
                    className="service-icon"
                    size="70px"
                />
                <p >Reducing the billions of food wasted every year from adverse weather condition</p>
            </div>
        </div>
    </section>
    {/* end of the service */}
            
    {/* the beginning of user reviews */}
    <section className="review">
        <div className="user-reviews">
            <div  className='userss'>

                <FaChevronLeft size='50px' onClick={prePerson} />
             <div className='img-container'>
                <h1>User Reviews</h1>
                <h2 className='info'>{text}</h2>
                <h4 className='name'>{name}</h4>
                <p className='job'>{job}</p>
              </div>
                   <FaChevronRight size='50px' onClick={nextPerson} />
            </div>
        </div>
    </section>
        {/* the end of user reviews */}

        {/* future plan beginning */}
      <section className='future-plan'>
            <h1>Our Future Plan</h1>
        <div className='mission'>
            <p>Out of the Billions of food wasted every year, pershable foods have been identified to be the most paramount, which has been due to inefficient and uneffective method of preservation, as result NWASTE plan to address this problem by creating the most effective preservation method as our mission strongly tie to this, which is zero hunger in 2030.</p>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXgsj5dNoXh4EhBkYAP_SEDWDnJ3YRaQ-spg&usqp=CAU' alt='' ></img>
        </div>
        <div className='mission'>
          <p>
              As NWASTE  is committed to keeping to its future plan which is zero hunger in 2030, we plan th help farmers with crop data decision, what deos this mean? Basedon the crop the farmer wish to plant in aparticular season, farmers get toknow if their crop is compartible with the soil tupe and weather condition before, during and after planting. But for the mean time our solution solely address soil type, current weather condition, forecast and historical weather data.
            </p>
              <img src='data:image/jpeg;base64,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' alt='' />
        </div>
      </section>
      <Footer />
      {/* future plan ending */}
    </div>
    );
}

export default HomePage;



