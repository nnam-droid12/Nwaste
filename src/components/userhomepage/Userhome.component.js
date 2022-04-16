import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import { Chart as ChartJS, LineElement,LinearScale, CategoryScale, PointElement } from 'chart.js';
import {Line} from 'react-chartjs-2';
import { IoMdContact } from "react-icons/io";
import { Link } from 'react-router-dom';
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

  useEffect(() => {
    const getSoilData = async () => {
      const response = await fetch('https://nwaste-api.herokuapp.com/soil',{
        method: 'GET',
         headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json'
          }
        });
      const jsonData = await response.json();
      console.log(jsonData);
      setUserSoil(jsonData);
    };
    getSoilData();
    
  }, []);

  useEffect(() => {
    const getPolygonShape = async () => {
      const shape_response = await fetch('https://nwaste-api.herokuapp.com/shape',{
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
    labels: polyshape?.map(y => y.name),
    datasets: [{
        label: `${polyshape.length} graph available`,
        data: polyshape?.map(x => x.area),
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
      <Header currentUser={props.currentUser} />
        <div className='user-home'>
        <div className='user'>
        <div className="contact-icon"><IoMdContact /></div>
        <div className='username'>
        <button type='submit' className='button'><Link to='/productform'>Submit Products</Link></button>
        {props.currentUser && <h1>Welcome {props.currentUser.displayName}</h1>}
        </div>
        </div>

         <div className='soil-params'>
          <div>
          <h4>Temperature on the 10 centimeters depth: {usersoil.t10}K</h4>
          <h4>Soil moisture: {usersoil.moisture}m2/m3</h4>
          <h4> Surface temperature: {usersoil.t0}K</h4>
          </div>
         </div>
              <section>
              <div className="chart-size" >
                <Line
                  data={data}
                  options={options}
                />
              </div>
            </section>
           
        </div>
        </div>
    );
}

export default UserHomePage;
