import React from 'react';
import Header from '../header/Header';
import LoanData from '../../newsdata/NewsData';
import './News.scss';


const Loan = ({imageUrl, title, desc, how_to_apply, currentUser }) =>{


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
           </div>
           );
    })}
      
        </div>
         </div>
    );
}

export default Loan;