import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, LineElement,LinearScale, CategoryScale, PointElement } from 'chart.js';
import {Line} from 'react-chartjs-2';
import { storage, userUploadedImageDocument, fetchUserImageData } from '../../firebase/firebase.utils';
import './Userhome.scss';



ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
)



const UserHomePage = (props) => {
    

    const [usersoil, setUserSoil] = useState({});
    // const [setUserWeather] = useState({});
    const [polyshape, setPolyShape] = useState([]);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState([]);
    const [image, setImage] = useState(false);
    const [productname, setProductName] = useState([]);
    const [farmerlocation, setFarmerLocation] = useState([]);

  // useEffect(() => {
  //     getCurrentWeather();
  // });

  useEffect(() => {
    getSoilData();
    
  }, []);

  useEffect(() => {
    getPolygonShape();
  }, []);




  // const getCurrentWeather = async () =>{
  //     const weatherResponse = await fetch('http://localhost:5000/userweather');
  //     const weatherjsonData = await weatherResponse.json();
  //     setUserWeather(weatherjsonData);
  // }

  const getSoilData = async () => {
    const response = await fetch('http://localhost:5000/soil');
    const jsonData = await response.json();
    setUserSoil(jsonData);
  };

  const getPolygonShape = async () => {
    const shape_response = await fetch('http://localhost:5000/shape',{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    const polyjsonData = await shape_response.json();
    console.log(polyjsonData)
    setPolyShape(polyjsonData);
  };

  const handleImageChange = e =>{
    const file = e.target.files[0];
    if(file){
      setImage(file);
    }
  }

  const handleChange = event =>{
    const { value, name } = event.target;
    setProductName({ [name]: value });
    setFarmerLocation({ [name]: value});
  }


  const handleImageSubmit = () =>{
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed',
      (snapshot) => {

      },
      (error) =>{
        console.log(error);
      },
      () =>{
        storage.ref('images').child(image.name).getDownloadURL()
        .then((url) => {
          console.log(url);
          userUploadedImageDocument(props.currentUser,{
            imageUrl:url
           
            
          })
          setImage(image)
        })

      })
  }

     

  var data = {
    labels: polyshape.coordinates,
    datasets: [{
        label: '# of Votes',
        data: polyshape.center,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
}

var options = {
  maintainAspectRatio: false,
  scales: {
      y: {
          beginAtZero: true
      },
      legend: {
        labels: {
          fontSize: 26
        }
      }
    }
  }

  const fetchImages =  ()=>{
      const images =  fetchUserImageData(props.currentUser);
      setUrl(images);
      console.log(images)
  }
            
    return(
        <div className='user-home' style={{marginBottom: '5px'}}>
        
        {console.log('image render')}
        {props.currentUser && <h1>welcome {props.currentUser.displayName}</h1>}

                 <div>
                 <h3>Upload product image</h3>
                   <input type='file' onChange={handleImageChange} />
                   <button onClick={handleImageSubmit}>Upload image</button>
                   <button onClick={fetchImages}>Fetch data</button>
                   <img alt='product' src={image} height='300' width='400' />
                  
                   {/* <h4>{productname}</h4> */}
                    {/* <p>{farmerlocation}</p> */}
                 </div>
                <div className='farm-product'>
                 <form>
                 <input type='text' name='name'
                   placeholder='product name'
                   onChange={handleChange} />
                   <input type='text' name='name'
                   placeholder='location'
                   onChange={handleChange} />

                 </form>
                 <button> Submit Farm Products</button>
                 </div>

                <h4>Temperature on the 10 centimeters depth, {usersoil.t10}Kelvins</h4>
                <h4>Soil moisture, m3/m3 {usersoil.moisture}</h4>
                <h4> Surface temperature, Kelvins {usersoil.t0}</h4>
              <section>
              <div className="chart-size" >
                <Line
                  data={data}
                  options={options}
                />
              </div>
              <button>
                 Get Current Weather
              </button>
            </section>
            {url && url.map((image, idx)=>{
          const {imageUrl} = image;

          return (<img src={imageUrl} key={idx} alt=""/>);
        })}
        </div>
    );
}

export default UserHomePage;