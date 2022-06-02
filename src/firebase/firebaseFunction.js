<<<<<<< HEAD
import { firestore } from './firebase.utils';
=======
import {firestore} from './firebase.utils';
>>>>>>> 3c2449f0b1ae2cce487af3dc29b722ce188cc9df

import { setDoc, doc } from 'firebase/firestore';
//save new items

export const saveItem = async (data) => {
  console.log('is it this data ', data)
    await setDoc(doc(firestore, "foodBank", `${Date.now()}`), data, {
      merge: true,
    });
  };


  //getting food items

