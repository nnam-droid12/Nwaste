import React, { useState, useEffect } from 'react';
import {db} from '../../firebase/firebase.utils';
import { collection, getDocs } from 'firebase/firestore';
import HeaderTwo from "../header_two/Header_two";
import { FarmProducts } from '../products/FarmProducts';
import { FaMapMarkerAlt } from "react-icons/fa";
import Footer from '../footer/Footer';
import "tachyons";
import './Farmers.scss';


const Farmer = () => {
    const [products, setProducts] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState(FarmProducts);
    const [searchName, setSearchName] = useState('');
    
      const productsCollectionRef = collection(db, "products");

    useEffect(() => {
        const getProducts = async () =>{
            const data = await getDocs(productsCollectionRef)
            setProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            console.log(data);
        }
        getProducts()
    }, [])

    const clrBtn = ()=>{
      setSearchName("")
      setFilteredProduct(FarmProducts)
    }
    
    const handleFilter =(event)=> {
      const searchWord = event.target.value;
      setSearchName(searchWord)
      const filteredWord = FarmProducts.filter(val=>{
        return val.name.toLowerCase().includes(searchWord.toLowerCase());
      });
      setFilteredProduct(filteredWord);
    }

    return(
        <div>
        <HeaderTwo
        clrBtn={clrBtn} 
        searchName={searchName}
        filteredProduct={filteredProduct}
        handleFilter={handleFilter} />
        <div className='farmer-card ml4'>
         {
         filteredProduct.map((product) =>{
           return (
             <main className='farm-products dib grow'>
              
                  <a href="facebook.com" target='_blank'>
                    <img src={product.imgUrl} alt="images" 
                    className="img" />
                     <div className='product-detail ml3'>
                       <h3 className='name'> {product.name}</h3>
                       <div className='flex-wrapper'>
                       <FaMapMarkerAlt className='location'/>
                       <span><h4>{product.location}</h4></span>
                       </div>
                      <h4 className='price'>{product.price}</h4>
                    </div>
                 </a>
           </main>);
         }
         
         )
       }
       </div>  
        <footer className="position-footer">
        <Footer /> 
        </footer>     
       </div>
    );
}

export default Farmer;