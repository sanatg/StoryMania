import firebase from 'firebase'
require("@firebase/firestore")


  var firebaseConfig = {
    apiKey: "AIzaSyD_IPIkgVJizK859seOUeFvuLJhDt1XNcM",
    authDomain: "story-hub-5293a.firebaseapp.com",
    databaseURL: "https://story-hub-5293a.firebaseio.com",
    projectId: "story-hub-5293a",
    storageBucket: "story-hub-5293a.appspot.com",
    messagingSenderId: "1068511537391",
    appId: "1:1068511537391:web:41d0fd5133cef93cff931a"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default  firebase.firestore()
