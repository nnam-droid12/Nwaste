import React, { useState } from 'react';
import data from '../../faqdata/data';
import SingleQuestion from '../faqcomponent/FaqPage.components';

const QuestionCollection = () =>{
    const [questions] = useState(data);
    return(
        <main>
           <div className='container'>
              <h3>Questions and Answers On How to Use Nwaste</h3>
              <section className='info'>
               {questions.map((question) => {
                return (
                    <SingleQuestion key={question.id} {...question}></SingleQuestion>
                );
                   })}
              </section>
           </div>
        </main>
    );
}

export default QuestionCollection;

