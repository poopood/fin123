import * as firebase from 'firebase';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBWOQx-CEVHDIxQ4J9b9v3R2Qzhcjsxw54",
    authDomain: "finnikky-a405e.firebaseapp.com",
    databaseURL: "https://finnikky-a405e.firebaseio.com",
    projectId: "finnikky-a405e",
    storageBucket: "finnikky-a405e.appspot.com",
    messagingSenderId: "751763113401",
    appId: "1:751763113401:web:0b5a4f537eb89f7615e268",
    measurementId: "G-1RP62DBYJB"
    
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }
 
const db = firebase.database();
const auth = firebase.auth();



export {auth,firebase, db as default };


