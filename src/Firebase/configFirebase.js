// configFirebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signOut  } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Importer getFirestore pour Firestore
import { getStorage } from 'firebase/storage';  
import { getDatabase } from 'firebase/database'; // Importer getDatabase pour la base de données en temps réel

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
const firestore = getFirestore(app); // Utiliser getFirestore pour Firestore
const storage = getStorage(app);
const database = getDatabase(app); // Utiliser getDatabase pour la base de données en temps réel

export { auth, firestore, database, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signOut };
