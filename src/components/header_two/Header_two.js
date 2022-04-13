import React, { useState, useEffect } from 'react'
import { FaSistrix } from "react-icons/fa";
// import { AiOutlineClose } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import Logo from '../../assets/logo1.png';
import { GoThreeBars } from "react-icons/go";
import { getTokenOrRefresh } from '../../token_utils';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import { BsMicFill } from 'react-icons/bs';
import './Header_two.scss';

const speechsdk = require('microsoft-cognitiveservices-speech-sdk')


const HeaderTwo = ({ products,handleFilter, searchName, clrBtn, currentUser }) => {

    const[micspeak, setMicSpeak] = useState({displayText:'Be ready to test speech...'})

    useEffect(() =>{
        const getTokenFromApi = async () =>{
           const tokenRes = await getTokenOrRefresh();
           if (tokenRes.authToken === null) {
               setMicSpeak(micspeak);
            }
        }
        getTokenFromApi()
    }, [])


    const sttFromMic = async () => {
        const tokenObj = await getTokenOrRefresh();
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'en-US';
        
        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        setMicSpeak({displayText:'you can speak now'})

        recognizer.recognizeOnceAsync(result => {
            let micspeak;
            if (result.reason === ResultReason.RecognizedSpeech) {
                micspeak.displayText = `RECOGNIZED: Text=${result.text}`
            } else {
                micspeak.displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            }

            setMicSpeak(micspeak);
        });
    }

    return ( 
        <nav>
         <div className="nav-container">
            <Link to='/'>
             <div> 
                <div className='logo-container' title='Go to home page!'>
                    <div className='col'>
                    <img className='logo' alt='logo' src={Logo} style={{height: '65px', width: '65px'}}/> 
                    <div className='text col'>
                        Nwaste
                    </div>
                </div>
                </div>    
            </div> 
            </Link>

            <div className="search">
             {
                <BsMicFill onClick={sttFromMic} />?
                <input
                type='search'
                value={micspeak.displayText}
                onChange={handleFilter}
                className="input" 
                placeholder="Search products"
                /> :
                <input
                type='search'
                value={searchName}
                onChange={handleFilter}
                className="input" 
                placeholder="Search products"
                />
             }
                
                <div className="search-icon">
                <BsMicFill onClick={sttFromMic} />
                    {
                        <FaSistrix /> 
                    }
                </div>
            </div>

            <input type="checkbox" className="nav-toggle" id='nav-toggle'/>
            <label htmlFor='nav-toggle' className='nav-toggle-label'>
                    <span style={{color: 'dodgerblue'}}>
                        <GoThreeBars className='hamburger-btn' size='32px' />
                    </span>
            </label>
            <div className='options'>
                <Link className='option' to='/about'>
                    ABOUT
                </Link>
                <Link className='option' to='/faq' >
                    FAQ
                </Link>
                <Link className='option' to='/loan' >
                    LOAN
                </Link>
                {
                    currentUser?
                    <div className='option' onClick={() => auth.signOut(window.location = '/')} >
                            LOGOUT
                        </div>
                    :
                    <Link className='option' to='/signin'>
                    LOGIN
                    </Link>
                    
                }
               
            </div>
          </div>
        </nav>
     );
}
 
export default HeaderTwo;