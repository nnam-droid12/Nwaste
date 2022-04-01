import React, { useState, useEffect } from 'react';
import {db} from '../../firebase/firebase.utils';
import { collection, getDocs } from 'firebase/firestore';
import './Farmers.scss';

const Farmers = () => {


    const [products, setProducts] = useState([]);
    const productsCollectionRef = collection(db, "products")

   useEffect(() => {
       const getProducts = async() =>{
           const data = await getDocs(productsCollectionRef)
           setProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
           console.log(data);
       }
       getProducts()
   }, [])

    return(
        <div className='farmer-card' style={{marginTop: '200px'}}>
        <input type='text' placeholder='product name' />
        <input type='text' placeholder='product name' />
        <input type='text' placeholder='product name' />

            {
                products.map((product) =>{
                    return <div>
                    <h2>Product name {product.name}</h2>
                    <h4>price {product.price}</h4>
                    <h4>location {product.location}</h4>                    
                    </div>
                })
            }

            </div>
    );
}

export default Farmers;