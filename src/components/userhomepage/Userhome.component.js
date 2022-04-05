import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import { Chart as ChartJS, LineElement,LinearScale, CategoryScale, PointElement } from 'chart.js';
import {Line} from 'react-chartjs-2';
import {ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../firebase/firebase.utils';
import { collection, addDoc } from 'firebase/firestore';
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
    const [formData, setFormData] = useState({
      title: "",
      location: "",
      description: "",
      price: "",
      image: "",

    });
    const [progress, setProgress] = useState(0);


    const handleChange = (e) =>{
      setFormData({ ...formData, [e.target.name]: e.target.value });

      
    }


    const handleImageChange = (e) =>{
      setFormData({ ...formData, image:e.target.files[0] })
    }


    const handleProducts = (e) =>{
      e.preventDefault();
      if(!formData.title || !formData.location || !formData.description || !formData.price || !formData.image){
          return;
        }
        const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
        const uploadImage = uploadBytesResumable(storageRef, formData.image);
        uploadImage.on('state_changed',
        (snapshot) =>{
          const progressPercent = Math.round((snapshot.bytesTransferred /snapshot.totalBytes) * 100);
          setProgress(progressPercent);
        },
        (error) =>{
          console.log(error)
        },
        () =>{
          
            getDownloadURL(uploadImage.snapshot.ref)
            .then(async (url) =>{
              const productRef = collection(db, "Products");
              console.log(productRef);
              console.log(formData);
               await addDoc(productRef, {
                title: formData.title,
                location: formData.location,
                description: formData.description,
                price: formData.price,
                imageUrl: url,
              })
              .then(() =>{
                setFormData({
                  title: "",
                  location: "",
                  description: "",
                  price: "",
                  image: "",
                });
                setProgress(0);
              }).catch(error =>{
                console.log(error)
              })
            })
        }
        )
    }


  useEffect(() => {
    const getSoilData = async () => {
      const response = await fetch('http://localhost:5000/soil');
      const jsonData = await response.json();
      console.log(jsonData);
      setUserSoil(jsonData);
    };
    getSoilData();
    
  }, []);

  useEffect(() => {
    const getPolygonShape = async () => {
      const shape_response = await fetch('http://localhost:5000/shape',{
         method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
      });
      const polyjsonData = await shape_response.json();
      console.log(polyjsonData)
      setPolyShape(polyjsonData);
    };
    getPolygonShape();
  }, []);
     

  var data = {
    labels: polyshape.map(y => y.name),
    datasets: [{
        label: `${polyshape.length} graph available`,
        data: polyshape.map(x => x.area),
        xAxisID: polyshape.center,
        yAxisID: polyshape.area ,
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

const options = {
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

            
    return(
      <div>
      <Header />
        <div className='user-home'>
        {props.currentUser && <h1>welcome {props.currentUser.displayName}</h1>}


                <h4>Temperature on the 10 centimeters depth, {usersoil.t10}K</h4>
                <h4>Soil moisture {usersoil.moisture}m2/m3</h4>
                <h4> Surface temperature {usersoil.t0}K</h4>
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
            <div className='submit product'>
            
              <form>
              <h2>Submit products</h2>
               <input type='text' name='title'
               placeholder='product name' 
               value={formData.title}
               onChange={(e)=>handleChange(e)}
               required />

               <input type='text' name='location'
               placeholder='location' 
               value={formData.location}
               onChange={(e)=>handleChange(e)}
               required />

              <input type='text' name='description'
              placeholder='product description' 
              value={formData.description}
               onChange={(e) =>handleChange(e)} 
                required
               />

               <input type='number' name='price'
               placeholder='price' 
               value={formData.price}
               onChange={(e) =>handleChange(e)}
               required
               />

               <input type='file' 
               name='image' 
               accept="image/*"
               onChange={(e) =>handleImageChange(e)} />

               {progress === 0 ? null :(
               <div className='progress-bar' style={{width: `${progress}%` }}>
                 {`uploading image ${progress}%`}
               </div>) }
               <button onClick={handleProducts}>Submit product</button>
              </form>
            </div>
           
        </div>
        </div>
    );
}

export default UserHomePage;


// http://api.agromonitoring.com/agro/1.0/polygons?appid=test