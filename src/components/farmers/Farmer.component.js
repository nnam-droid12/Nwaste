import React, { useState, useEffect } from 'react';
import {db} from '../../firebase/firebase.utils';
import HeaderTwo from "../header_two/Header_two";
import { FaMapMarkerAlt } from "react-icons/fa";
import Footer from '../footer/Footer';
// import { Spinner } from 'reactstrap';
import Loader from "../loader/Loader";
import { getTokenOrRefresh } from '../../token_utils';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import "tachyons";
import './Farmers.scss';
const speechsdk = require('microsoft-cognitiveservices-speech-sdk');


const Farmer = (props) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const[micspeak, setMicSpeak] = useState('');




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

    setMicSpeak('Listening...');
    recognizer.recognizeOnceAsync(result => {
        let micspeak;
        if (result.reason === ResultReason.RecognizedSpeech) {
            micspeak = `${(result.text.toLowerCase())}`
        }

        setMicSpeak(micspeak);
    });
}

  
    useEffect(() => {
      const fetchData = async () => {
        const data = await db.collection("Products").get();
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      };
      fetchData();
    }, []);

    useEffect(() => {
        const filterHandler = products.filter(
          user => user.title.toLowerCase().includes(search.toLowerCase())           
        )
        setFilteredProducts(filterHandler)
    }, [search, products, micspeak]);

  const clearBtn =()=> {
    setSearch('');
    setProducts(products);
  }
   
    return (
        <div>
        <HeaderTwo
        search={ search }
        clearBtn={clearBtn}
        currentUser={props.currentUser}
        products={products}
        setSearch={setSearch}
        sttFromMic={sttFromMic}
        micspeak={micspeak} />
        <div className='farmer-card ml4'>
         {
          products.length > 0 ?   
         ( filteredProducts.map((i) => 
             (<main className='farm-products dib grow' key={i.id}>
                    <div >
                        <img src={i.imageUrl} alt="images" 
                        className="img" />
                        <div className='product-detail ml3'>
                          <h3 className='name'> {i.title}</h3>
                          <div className='flex-wrapper'>
                          <FaMapMarkerAlt className='location'/>
                          <span><h4>{i.location}</h4></span>
                          </div>
                          <h4 className='price'>${i.price}</h4>
                        </div>
                    </div>
                  </main>)) ) : <div className='loading'><Loader /></div>
                  }
       </div> 
      
        <footer 
        className="position-footer"
        >
        <Footer /> 
        </footer>     
       </div>
    );
}

export default Farmer;