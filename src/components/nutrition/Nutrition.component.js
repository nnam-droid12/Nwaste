import React, { useState } from 'react';
import Header from '../header/Header';
import axios from 'axios';
import './Nutrition.scss';


const Nutrition = (props) =>{


  const [query, setquery] = useState("");

      const getNutrient = async () => {
        const response = await axios.get('https://api.calorieninjas.com/v1/nutrition?',{
          method: 'GET',
           headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json',
               'X-Api-Key': 'YOUR_API_KEY'
            }
          });
        const result = await response.json();
        console.log(result);
        setquery(result);
      };

    const onSubmit = (e) => {
      e.preventDefault();
      getNutrient();
    }

  return(
      <div>
        <Header currentUser={props.currentUser}  />
        <div>
         <form onclick={onSubmit}>
           <input 
           type='search' 
           placeholder='search food to get nutrients'
           onChange={(e) => setquery(e.target.value)}
           value={query} />
           <input 
           type='submit' 
           value='search'
            />
         </form>
         </div>
      </div>
  )
}

export default Nutrition;