import React, { useState } from 'react';
import {ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../firebase/firebase.utils';
import { collection, addDoc } from 'firebase/firestore';
import Header from '../header/Header';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const ProductForm = (props) =>{

    const [formData, setFormData] = useState({
        title: "",
        location: "",
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
        if(!formData.title || !formData.location || !formData.price || !formData.image){
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
                  price: formData.price,
                  imageUrl: url,
                })
                .then(() =>{
                  setFormData({
                    title: "",
                    location: "",
                    price: "",
                    image: "",
                  });
                  toast("Products submitted successfully, ready to viewed by potential buyers",{type: "success"});
                  setProgress(0);
                }).catch(error =>{
                   toast("error adding products", {type: "error"})
                })
              })
          }
          )
      }
  

    return (
   <div>
        <Header currentUser={props.currentUser} />
     <div style={{marginTop: '180px'}}>
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

               <input type='text' name='price'
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
                 {`uploading products ${progress}%`}
               </div>) }
               <button onClick={handleProducts}>Submit product</button>
            </form>
        </div>
   </div>
    );
}

export default ProductForm;