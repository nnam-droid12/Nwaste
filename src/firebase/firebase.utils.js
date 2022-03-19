import firebase from '.firebase/compat/app';
import '.firebase/compat/firestore';
import '.firebase/compat/auth';

const config = {
    apiKey: "AIzaSyCs0bSO5QHHRgyRFiijo8nsVdEy79T9MLo",
    authDomain: "nwaste-db.firebaseapp.com",
    projectId: "nwaste-db",
    storageBucket: "nwaste-db.appspot.com",
    messagingSenderId: "248207425573",
    appId: "1:248207425573:web:c6eea7012a94f9bccbbfcc",
    measurementId: "G-VJ2ECETJ3B"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
