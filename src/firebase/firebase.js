
import firebase from "firebase";   // this name is used in line 19


const firebaseConfig = {
    apiKey: "AIzaSyDixzWEkQuSTBpq-GzeiqOCHJsO0K6MNwM",
    authDomain: "tpp-explore.firebaseapp.com",
    projectId: "tpp-explore",
    storageBucket: "tpp-explore.appspot.com",
    messagingSenderId: "1096276593065",
    appId: "1:1096276593065:web:8114ff425f27ed59335cb8",
    measurementId: "G-HCJKGQVVTV"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// export const auth = app.auth();
export const firestore = app.firestore();



export default app;