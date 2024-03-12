import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../Firebase/configFirebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("AuthContext - Current User:", user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log("AuthContext - Context Provider Rendered");

  return (
    <AuthContext.Provider value={{ currentUser }}>
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