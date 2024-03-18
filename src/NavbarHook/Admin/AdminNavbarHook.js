import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { signOut } from "../../Firebase/configFirebase";
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { IoClose, IoMenu } from "react-icons/io5";
import { Dropdown } from "react-bootstrap"; // Ajoutez cette importation

import { useMediaQuery } from "react-responsive";
import "./AdminNavbarHook.css";
import logoImage from "../../assets/images/x20 Logo.png";

const auth = getAuth();
const firestore = getFirestore();

const AdminNavbarHook = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        try {
          const userDoc = doc(firestore, 'users', user.uid);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setUserName(userData.displayName); // Supposons que le nom de l'utilisateur est stocké dans le champ displayName
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des informations de l'utilisateur :", error.message);
        }
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
        {/* <NavLink to="/Promos" className="nav__link" onClick={closeMobileMenu}>
  Promos
</NavLink> */}
<Dropdown>
  <Dropdown.Toggle variant="link" id="dropdown-basic" className="nav__link">
    Gerer
  </Dropdown.Toggle>
  <Dropdown.Menu className="dropdown-menu">
    <Dropdown.Item href="/Promos" className="dropdown-item">Promos</Dropdown.Item>
    <Dropdown.Item href="/Gallerie" className="dropdown-item">Gallerie</Dropdown.Item>
    <Dropdown.Item href="/OffreEmploi" className="dropdown-item">OffreEmploi</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
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
            {user ? userName : "Login"}
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