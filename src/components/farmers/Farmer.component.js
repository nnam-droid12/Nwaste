import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import {db} from '../../firebase/firebase.utils';
import './Farmers.scss';


const Farmers = () => {
 
  const [products, setProducts] = useState([]);


  useEffect(() =>{
    const productRef = collection(db, 'Products');
    const q = query(productRef);
    onSnapshot(q,(snapshot) =>{
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
      console.log(products);
    });
  }, [])
  

    return(

        <div className='farmer-card' style={{marginTop: '700px'}}>

<div>
              {
                products.length ===0 ?
               ( <p>No products submitted yet</p> ):
                (
                  products.map(({ id, title, location, description, price, imageUrl }) => (
                   <div key={id}>
                   <h2>{title}</h2>
                   <h4>{location}</h4>
                   <h2>{description}</h2>
                   <p>{price}</p>
                   <img src={imageUrl} height='180px' width='180px' alt='name' /> 
                   </div>
                  ))
                )
              }
            </div>
                  
         </div>
    );
}

export default Farmers;