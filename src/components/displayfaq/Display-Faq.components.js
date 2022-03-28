import React from 'react';
import QuestionCollection from '../allquestion/QuestionCard';
import './Display-Faq.components.scss';

const DisplayFaq = () =>{
    return(
        <div className='display-faq'>

        <QuestionCollection />

        </div>
    );
}

export default DisplayFaq;