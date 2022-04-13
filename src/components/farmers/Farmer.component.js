import React, { useState, useEffect } from 'react';
import {db} from '../../firebase/firebase.utils';
import HeaderTwo from "../header_two/Header_two";
import { FaMapMarkerAlt } from "react-icons/fa";
import Footer from '../footer/Footer';
import "tachyons";
import './Farmers.scss';


const Farmer = (props) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
    useEffect(() => {
      const fetchData = async () => {
        const data = await db.collection("Products").get();
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log("the data", data)
      };
      fetchData();
    }, []);
    useEffect(() => {
        const filterHandler = products.filter(
          user => user.title.toLowerCase().includes(search.toLowerCase())           
        )
        setFilteredProducts(filterHandler)
    }, [search, products]);

  const clearBtn =()=> {
    setSearch('');
  }
   
    return (
        <div>
        <HeaderTwo
        search={ search }
        clearBtn={clearBtn}
        currentUser={props.currentUser}
        products={products}
        setSearch={setSearch} />
        <div className='farmer-card ml4'>
         {
          filteredProducts.map((i) =>{
           return (!products.length)?
           <h1>Loading...</h1> :
            (
             <main className='farm-products dib grow' key={i.id}>
               <div >
                    <img src={i.imageUrl} alt="images" 
                    className="img" />
                     <div className='product-detail ml3'>
                       <h3 className='name'> {i.title}</h3>
                       <div className='flex-wrapper'>
                       <FaMapMarkerAlt className='location'/>
                       <span><h4>{i.location}</h4></span>
                       </div>
                      <h4 className='price'>${i.price}</h4>
                    </div>
                 </div>

                  
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