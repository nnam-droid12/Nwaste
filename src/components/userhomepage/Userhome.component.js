import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, LineElement,LinearScale, CategoryScale, PointElement } from 'chart.js';
import {Line} from 'react-chartjs-2';
import { storage, userUploadedImageDocument, fetchUserImageData } from '../../firebase/firebase.utils';
import {db} from '../../firebase/firebase.utils';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Farmers from '../farmers/Farmer.component';
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
    const [url, setUrl] = useState([]);
    const [image, setImage] = useState(false);
    const [products, setProducts] = useState([]);
    const [newName, setNewName] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newPrice, setNewPrice] = useState(0);

    const productsCollectionRef = collection(db, "products")
   



  useEffect(() => {
    const getSoilData = async () => {
      const response = await fetch('http://localhost:5000/soil');
      const jsonData = await response.json();
      setUserSoil(jsonData);
    };
    getSoilData();
    
  }, []);

  useEffect(() => {
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
    getPolygonShape();
  }, []);


  useEffect(() => {
    const getProducts = async() =>{
        const data = await getDocs(productsCollectionRef)
        setProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        console.log(data);
    }
    getProducts()
}, [])


const createUser = async () =>{
  await addDoc(productsCollectionRef, {name: newName, location:newLocation, price:newPrice});


}


  const handleImageChange = e =>{
    const file = e.target.files[0];
    if(file){
      setImage(file);
    }
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
                
                 </div>
                <div className='farm-product'>
                 <form>
                    <input type='text' placeholder='product name'
                    onChange={(event) => setNewName(event.target.value)} />
                    <input type='text' placeholder='Location'
                    onChange={(event) => setNewLocation(event.target.value)} />
                    <input type='text' placeholder='price' 
                    onChange={(event) => setNewPrice(event.target.value)}
                    />
                    <button onClick={createUser}>submit products</button>
               
                 </form>
                
                 </div>
                      {
                   products.map((product, idx) => {
                     return <Farmers 
                     key={idx}
                     name={product[idx].name}
                     location={product[idx].location}
                     price={product[idx].price} />
                   })
                       }

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
            {url ? url.map((image, idx)=>{
          const {imageUrl} = image;

          return (<img src={imageUrl} key={idx} alt=""/>);
        }) : undefined}
        </div>
    );
}

export default UserHomePage;