import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAq5bzzM0Ep7d1OA3hAYgVxKcdxe-8X0yY",
    authDomain: "locatesp-a7e1f.firebaseapp.com",
    databaseURL: "https://locatesp-a7e1f.firebaseio.com",
    projectId: "locatesp-a7e1f",
    storageBucket: "locatesp-a7e1f.appspot.com",
    messagingSenderId: "535602580954",
    appId: "1:535602580954:web:82d63bc5aa0893961c44e3",
    measurementId: "G-HD8EFC4FQ0"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;