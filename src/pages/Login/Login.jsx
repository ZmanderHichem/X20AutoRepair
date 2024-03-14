import React, { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate  } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { firestore } from '../../Firebase/configFirebase';
import './Login.css';
// import { useAuth } from '../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  const [userRole, setUserRole] = useState(null);
  // const { updateUserEmail } = useAuth();
  const auth = getAuth();
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      const userId = user.uid;
      const userRole = await getUserRole(userId);
      // updateUserEmail(user.email);

      navigate("/");
    } catch (err) {
      console.error(err);
      setErr(true);
    }
  };

  const getUserRole = async (userId) => {
    // Obtenez une référence à la base de données Firestore
    const db = getFirestore();
  
    try {
      // Essayez de récupérer le document utilisateur dans la collection des administrateurs
      const userDocAdmin = await getDoc(doc(db, 'admins', userId));
  
      // Vérifiez si le document utilisateur existe dans la collection des administrateurs
      if (userDocAdmin.exists()) {
        // Si l'utilisateur est trouvé dans la collection des administrateurs, retournez 'admin'
        return 'admin';
      }
  
      // Si l'utilisateur n'est pas un admin, vérifiez s'il existe dans la collection des utilisateurs normaux
      const userRef = doc(firestore, 'users', userId);
      const userDoc = await getDoc(userRef);
  
      // Vérifiez si le document utilisateur existe dans la collection des utilisateurs normaux
      if (userDoc.exists()) {
        // Si l'utilisateur est trouvé dans la collection des utilisateurs, retournez 'normal'
        return 'normal';
      } else {
        // Si le document utilisateur n'est trouvé dans aucune des collections, affichez une erreur
        console.error('User document not found in Firestore for user ID:', userId);
        return null;
      }
    } catch (error) {
      // En cas d'erreur lors de la récupération du rôle de l'utilisateur, affichez une erreur
      console.error('Error getting user role:', error.message);
      return null;
    }
  };

  const handleResetPassword = async () => {
    try {
      // Add your password reset logic here
    } catch (error) {
      console.error('Reset password error:', error.message);
    }
  };


  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        const userId = user.uid;
        getUserRole(userId).then((role) => {
          setUserRole(role);
        });
      } else {
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div>

      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Connectez-vous</span>
          <span className="title">Login</span>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Sign in</button>
            {err && <span>Something went wrong</span>}
            <button onClick={handleResetPassword}>Forgot Password?</button>

            <p>
              You don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
