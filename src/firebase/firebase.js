import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase
const config = {
    apiKey            : "AIzaSyDpn0zqfE0eBl8zio7e1oHwqSXPD5z1vVY",
    authDomain        : "blog-bc21c.firebaseapp.com",
    databaseURL       : "https://blog-bc21c.firebaseio.com",
    projectId         : "blog-bc21c",
    storageBucket     : "blog-bc21c.appspot.com",
    messagingSenderId : "316176858135"
  };

if ( !firebase.apps.length ) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
