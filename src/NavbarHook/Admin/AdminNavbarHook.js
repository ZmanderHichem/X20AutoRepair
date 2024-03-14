import React, { useState, useEffect } from "react";

import { NavLink, Link, useNavigate } from "react-router-dom";
import { signOut   } from "../../Firebase/configFirebase";
import { getAuth} from 'firebase/auth';

import { IoClose, IoMenu } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import "./AdminNavbarHook.css";
import logoImage from "../../assets/images/x20 Logo.png"; // Assurez-vous de remplacer le chemin par le chemin réel de votre image.


const auth = getAuth();

const AdminNavbarHook = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
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
          <NavLink
            to="/AjouterService"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Ajouter Service
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/LesRendezVous"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Les Rendez-Vous
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/LesInterventions"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Interventions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Promos"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Promos
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/OffreEmploi"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Offre Emploi
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to="/Profile"
            className={`${linkClassName} `}
            onClick={closeMobileMenu}
          >
            {user ? "Profil" : "Login"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={`${linkClassName} ${buttonClassName}`}
            onClick={handleSignOut}
          >
            Logout
          </NavLink>
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
          <div
            className={`nav__menu  ${isMenuOpen ? "show-menu" : ""}`}
            id="nav-menu"
          >
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

export default AdminNavbarHook;