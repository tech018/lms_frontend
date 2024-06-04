import firebase from "firebase/app"
import "firebase/auth"

  var firebaseConfig = {
    apiKey: "AIzaSyCPmYbMUZIu3aY2OJw0yuatf24V7dqrIIg",
    authDomain: "lso-lms.firebaseapp.com",
    projectId: "lso-lms",
    storageBucket: "lso-lms.appspot.com",
    messagingSenderId: "101342134927",
    appId: "1:101342134927:web:2c9707dd33104066eba6fa",
    measurementId: "G-LNS5T81CKH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  
  export const auth = firebase.auth()
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();