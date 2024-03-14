import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../Firebase/configFirebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Nouvel état pour stocker le rôle de l'utilisateur

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("AuthContext - Current User:", user);

      // Vous pouvez ajouter votre logique de détermination du rôle de l'utilisateur ici
      if (user) {
        // Par exemple, vérifiez si l'utilisateur a un rôle administrateur
        // Remplacez cette logique par la vôtre
        setIsAdmin(user.email.endsWith('@bosch.com'));
      } else {
        setIsAdmin(false); // Réinitialiser isAdmin si l'utilisateur se déconnecte
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log("AuthContext - Context Provider Rendered");

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("useAuth must be used within an AuthContextProvider");
    return null;
  }
  return context;
};
