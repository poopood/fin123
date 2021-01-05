import * as firebase from 'firebase';
import "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.db_apiKey,
    authDomain: process.env.db_authDomain,
    databaseURL: process.env.db_databaseURL,
    projectId: process.env.db_projectId,    
    storageBucket: process.env.db_storageBucket,
    messagingSenderId: process.env.db_messagingSenderId,
    appId: process.env.db_appId,
    measurementId: process.env.db_measurementId
    
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }
 
const db = firebase.database();
const auth = firebase.auth();



export {auth,firebase, db as default };


