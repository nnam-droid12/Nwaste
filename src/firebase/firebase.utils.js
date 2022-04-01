import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const config = {
    apiKey: "AIzaSyCs0bSO5QHHRgyRFiijo8nsVdEy79T9MLo",
    authDomain: "nwaste-db.firebaseapp.com",
    projectId: "nwaste-db",
    storageBucket: "nwaste-db.appspot.com",
    messagingSenderId: "248207425573",
    appId: "1:248207425573:web:c6eea7012a94f9bccbbfcc",
    measurementId: "G-VJ2ECETJ3B"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
  

    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

  export const userUploadedImageDocument = async (userAuth, additionalData) =>{
 


    if(!userAuth) return;
  
    const imageRef = firestore.doc(`images/${userAuth.id}`);
    const snapShot = await imageRef.get();
    

      const createdAt = new Date();

      

      try{

          await imageRef.collection('imageData').add({
            createdAt,
            ...additionalData
          });

        
      }catch(error){
        console.log('error creating image', error.message);
      }

    return imageRef;
  }


 export const fetchUserImageData = (userAuth) => {
    const getFromFirebase = firestore.collection('images');
    getFromFirebase.onSnapshot((querySnapShot) => {
      const saveFirebaseTodos = [];
      querySnapShot.forEach((doc) => {
        console.log(doc)
      });
    });
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const storage = firebase.storage();
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
