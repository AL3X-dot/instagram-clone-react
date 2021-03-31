import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCNDYYn2sM-5N9d5uUpwknAl-sMSOFJk2M",
    authDomain: "twitter-app-clone-2a617.firebaseapp.com",
    projectId: "twitter-app-clone-2a617",
    storageBucket: "twitter-app-clone-2a617.appspot.com",
    messagingSenderId: "915062125651",
    appId: "1:915062125651:web:0e8e8c03157f995b1442a6",
    measurementId: "G-EVJVK6W064"
});

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()

export {db,auth,storage}