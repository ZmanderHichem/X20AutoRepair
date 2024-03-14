// UserNavbarHook.jsx

import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "../../Firebase/configFirebase";
import { getAuth } from 'firebase/auth';
import { IoClose, IoMenu } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import "./UserNavbarHook.css";
import logoImage from "../../assets/images/x20 Logo.png"; // Assurez-vous de remplacer le chemin par le chemin réel de votre image.

const auth = getAuth();

const UserNavbarHook = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Erreur de déconnexion :", error.message);
    }
  };

  const renderNavLinks = () => {
    const listClassName = isMobile ? "nav__list" : "nav__list__web";
    const linkClassName = "nav__link";
    const buttonClassName = "nav__cta";

    return (
      <ul className={listClassName}>
        <li>
          <NavLink to="/RendezVous" className={linkClassName} onClick={closeMobileMenu}>RendezVous</NavLink>
        </li>
        <li>
          <NavLink to="/ContactUs" className={linkClassName} onClick={closeMobileMenu}>ContactUs</NavLink>
        </li>
        <li>
          <NavLink to="/MesInterventions" className={linkClassName} onClick={closeMobileMenu}>Mes Interventions</NavLink>
        </li>
        <li>
          <NavLink to="/Profile" className={`${linkClassName} `} onClick={closeMobileMenu}>{user ? "Profil" : "Login"}</NavLink>
        </li>
        <li>
          <NavLink to="/Logout" className={`${linkClassName} ${buttonClassName}`} onClick={handleSignOut}>Logout</NavLink>
        </li>
      </ul>
    );
  };

  return (
    <header className="header">
      <nav className="nav container">
        <NavLink to="/" className="nav__logo">
          <img src={logoImage} alt="Navigation Bar" />
        </NavLink>

        {isMobile && (
          <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
            <IoMenu />
          </div>
        )}

        {isMobile ? (
          <div className={`nav__menu  ${isMenuOpen ? "show-menu" : ""}`} id="nav-menu">
            {renderNavLinks()}
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </div>
        ) : (
          renderNavLinks()
        )}
      </nav>
    </header>
  );
};

export default UserNavbarHook;
