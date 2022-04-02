import React, { useState, useEffect } from 'react';
import {db} from '../../firebase/firebase.utils';
import { collection, getDocs } from 'firebase/firestore';
import './Farmers.scss';


const Farmers = () => {
    const [products, setProducts] = useState([]);

   
      const productsCollectionRef = collection(db, "products");

    useEffect(() => {
        const getProducts = async () =>{
            const data = await getDocs(productsCollectionRef)
            setProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            console.log(data);
        }
        getProducts()
    }, [])

    return(

        <div className='farmer-card' style={{marginTop: '100px'}}>
         {
         products.map((product) =>{
           return (<div>
                <h2>{product.name}</h2>
                <h2>{product.location}</h2>
                <h2>{product.price}</h2>
           </div>);
         })
       }
                  
         </div>
    );
}

export default Farmers;