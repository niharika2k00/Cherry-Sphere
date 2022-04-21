import firebase from "firebase"; // this name is used in line 19

const firebaseConfig = {
  apiKey: "AIzaSyAzVxY2Sufc03v6Us_Jm6vAxLxBhoSyYb0",
  authDomain: "cherry-sphere-4f130.firebaseapp.com",
  projectId: "cherry-sphere-4f130",
  storageBucket: "cherry-sphere-4f130.appspot.com",
  messagingSenderId: "716080417311",
  appId: "1:716080417311:web:77bca2f513bf3bfc4aa32a",
  measurementId: "G-S1SBQF0P2G",
};

// Initialize Firebase

//  ----------      Version 9 [syntax, but Im using V8]    --------------------
// const app = initializeApp(firebaseConfig);
// export const firestore = getFirestore(app);

const app = firebase.initializeApp(firebaseConfig);
// export const auth = app.auth();
export const firestore = app.firestore();

export default app;
