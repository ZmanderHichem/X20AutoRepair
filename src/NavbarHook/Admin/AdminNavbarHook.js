import React, { useState } from "react";

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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [redirectTo, setRedirectTo] = useState(null);
    const [userRole, setUserRole] = useState(null);


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
          await auth.signOut();
          setUser(null);
          navigate('/');
          console.log ("logout");
                } catch (error) {
          console.error('Erreur de déconnexion :', error.message);
        }
      };
  
    const renderNavLinks = () => {
      const listClassName = isMobile ? "nav__list" : "nav__list__web";
      const linkClassName = "nav__link";
      const buttonClassName = "nav__cta";
  
      return (
      <ul className={listClassName}>
        <li>
          <NavLink to="/" className={linkClassName} onClick={closeMobileMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/RendezVous"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            RendezVous
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ContactUs"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
           ContactUs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorite"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Favorite
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/location"
            className={linkClassName}
            onClick={closeMobileMenu}
          >
            Location
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Logout"
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
