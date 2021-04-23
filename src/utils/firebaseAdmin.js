// import * as admin from "firebase-admin";
// import { NextApiRequest } from "next";

// const verifyIdToken= () => {
//     const firebasePrivateKey = process.env.firebase_private_key;


//     if (!admin.apps.length) {
//     admin.initializeApp({
//       credential: admin.credential.cert({
//         projectId: process.env.finnikky-a405e,
//         clientEmail: process.env.firebase_client_email,
//         privateKey: firebasePrivateKey.replace(/\\n/g, "\n"),
//       }),
//     });
//   }

//  return admin
//     .auth()
//     .verifyIdToken(token)
//     .catch(() => null);
// }