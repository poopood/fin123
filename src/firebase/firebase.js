import * as firebase from 'firebase';
import { connectAdvanced } from 'react-redux';
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

// db.settings({timestampsInSnapshots: true});



// db.ref().set({
//     name: 'Shaun Sigera',
//     age: 30,
//     isSingle: true
// });

// db.ref('age').set(29);

// db.ref('attributes').set({
//     height: '174cm',
//     weight: '180lb'
// })

// db.ref('sdf')
// .remove()
// .then(() => {
//     console.log('date was removed')
// }).catch((e) => {
//     console.log('did not remove data', e)
// })

// db.ref().update({
//     name: 'Shanil'
// })

// db.ref()
// .once('value')
//     .then((snapshot) => {
//     const val = snapshot.val().transactions;
//     console.log(val);
// })
//     .catch((e) => {
//     console.log('error fetching data', e)
// })

// db.ref().on('value', (snapshot) => {
//     console.log(snapshot.val()); 
// })

// setTimeout(() => {
//     db.ref('age').set(32);
// }, 3000)

// db.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//     console.log(`${val.name} is ${val.isSingle}`)
// })

// db.ref('notes').push({
//     title: 'to do',
//     body: 'go for a run'
// })

// db.ref('notes')
// .once('value')
// .then((snapshot) => {
//     const notes = [];

//     snapshot.forEach((child) => {
//         notes.push({
//             id : child.key,
//             ...child.val()
//         })
//     })
//     console.log(notes);
// })

// db.ref('notes').on('value',(snapshot) => {
//     const notes = [];

//     snapshot.forEach((child) => {
//         notes.push({
//             id : child.key,
//             ...child.val()
//         })
//     })
//     console.log(notes);
// })

// db.ref('notes').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// })

//child_changed
//

export {auth,firebase, db as default };


// const libby = dbdb.then((val) => {
//     const transactions = [];

//     val.forEach((child) => {
//         transactions.push({
//             id: val.key,
//             ...val.val()
//         })
//     })
// // })