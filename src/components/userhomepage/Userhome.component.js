import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import { Chart as ChartJS, LineElement,LinearScale, CategoryScale, PointElement } from 'chart.js';
import {Line} from 'react-chartjs-2';
import './Userhome.scss';



ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
)



const UserHomePage = (props) => {
    

    const [usersoil, setUserSoil] = useState({});
    const [userweather, setUserWeather] = useState({});
    const [polyshape, setPolyShape] = useState({});


  useEffect(() => {
      getCurrentWeather();
  }, []);

  useEffect(() => {
    getSoilData();
  }, []);

  useEffect(() => {
    getPolygonShape();
  }, []);

  const getCurrentWeather = async () =>{
      const weatherResponse = await fetch('http://localhost:5000/userweather');
      const weatherjsonData = await weatherResponse.json();
      setUserWeather(weatherjsonData);
  }

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
    console.log(polyjsonData[0].id)
    setPolyShape(polyjsonData);
  };
     

//   var data = {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [{
//         label: '# of Votes',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(255, 159, 64, 0.2)'
//         ],
//         borderColor: [
//             'rgba(255, 99, 132, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)'
//         ],
//         borderWidth: 1
//     }]
// }

// var options = {
//   maintainAspectRatio: false,
//   scales: {
//       y: {
//           beginAtZero: true
//       },
//       legend: {
//         labels: {
//           fontSize: 26
//         }
//       }
//     }
//   }
            
    return(
      <div>
      <Header />
        <div className='user-home'>
        {props.currentUser && <h1>welcome {props.currentUser.displayName}</h1>}
          
            <section>
              <button>
                 Get Current Weather
              </button>
            </section>
        </div>
        </div>
    );
}

export default UserHomePage;