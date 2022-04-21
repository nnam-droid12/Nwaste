import React from 'react';
import Header from '../header/Header';
import LoanData from '../../newsdata/NewsData';
import './News.scss';


const Loan = ({ id, imageUrl, title, desc, how_to_apply, linkUrl, currentUser }) =>{


    return (
        <div>
        <Header currentUser={currentUser} />
        <div className='news'>
        { LoanData.map(news=>{
        return (
           <div>
           <p>{ news.imageUrl}</p>
           <p className='news-title'>{news.title}</p>
           <p>{news.desc}</p>
           <p>
           <h4> HOW TO APPLY</h4>
           {news.how_to_apply}
           </p>
          <p onClick={()=>{window.location.href = news.linkUrl}}>aply</p>
           </div>
           );
    })}
      
        </div>
         </div>
    );
}

export default Loan;