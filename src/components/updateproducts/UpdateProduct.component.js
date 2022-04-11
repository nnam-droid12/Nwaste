import React from 'react'
import { updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase.utils';
import { ref } from 'firebase/storage'; 

const UpdateProduct = ({ id, imageUrl, title, location, price }) => {


    const handleUpdate = async () =>{
      try{
          await updateDoc(doc(db, "Products", id))
          const storageRef = ref(storage, imageUrl,title, location, price)
          await updateDoc(storageRef)
      } catch(error){
        console.log(error)
      }
    }
  return (
    <div><button onClick={handleUpdate}>Update Product</button></div>
  )
}

export default UpdateProduct;
