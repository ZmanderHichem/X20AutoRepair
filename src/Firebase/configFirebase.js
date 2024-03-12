// configFirebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signOut  } from 'firebase/auth';
import { getFirestore, db } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';  // Import the storage service
import { getDatabase } from 'firebase/database';

const firebaseConfig = {  
  apiKey: "AIzaSyCEIoKiPIgYaV0wHC4Tltx_XQPzypBib18",
  authDomain: "x20autorepair.firebaseapp.com",
  projectId: "x20autorepair",
  storageBucket: "x20autorepair.appspot.com",
  messagingSenderId: "352263692196",
  appId: "1:352263692196:web:65f650c44dfbdd58606b31",
  measurementId: "G-374R3VK3VR"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
export const storage = getStorage(app);  // Export the storage service

const database = getDatabase(app);

export { auth,  getFirestore, firestore, database, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail,
  signOut, };
