import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useAuth } from './AuthContext';

const IndexHome = () => {
  const { userEmail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && userEmail) {
        // User is logged in and userEmail is defined
        const isAdmin = user.email.endsWith('@bosch.com');
        if (isAdmin) {
          navigate('/HomeAdmin');
        } else {
          navigate('/HomeUser');
        }
      } else {
        // User is not logged in, redirect to home
        navigate('/Home');
        console.log('home');
      }
    });

    return () => unsubscribe();
  }, [navigate, userEmail]); // Ajout de userEmail comme dépendance

  // Cette composante peut ne rien retourner de spécifique puisque la navigation est gérée dans la logique ci-dessus
  return null;
};

export default IndexHome;
