import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import NavbarHook from "./NavbarHook/NavbarHook";
import AdminNavBarHook from "./NavbarHook/Admin/AdminNavbarHook";
import Home from "./pages/Home";
import News from "./pages/News";
import Login from "./pages/Login/Login";
import RendezVous from "./pages/RendezVous/RendezVous";
import About from "./pages/About/About";
import ContactUs from "./pages/contactUs/contactUs";
import Register from "./pages/Register/Register";
import LesRendezVous from "./EspaceAdmin/Pages/LesRendezVous/LesRendezVous";
import HomeUser from "./EspaceUser/HomeUser/HomeUser";
import MesInterventions from"./EspaceUser/Intervention/MesInterventions";
import IndexHome from "./IndexHome/IndexHome";

import { AuthContextProvider, useAuth } from "./IndexHome/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <AppContent />
      </AuthContextProvider>
    </Router>
  );
};

const AppContent = () => {
  const { currentUser } = useAuth();

  // if (currentUser === null) {
  //   navigate('/');
  //   return null;
  // }

  return (
    <>
      {currentUser ? <AdminNavBarHook /> : <NavbarHook />}
      <main className="main-content">
        <Routes>
      <Route path="/" element={<IndexHome />} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/HomeUser" element={<HomeUser />} />
      <Route path="/MesInterventions/:userEmail" element={<MesInterventions />} />
      <Route path="/login" element={<Login />} />
      <Route path="/RendezVous" element={<RendezVous />} />
      <Route path="/About" element={<About />} />
      <Route path="/contactUs" element={<ContactUs />} />
      <Route path="register" element={<Register />} />
      <Route path="LesRendezVous" element={<LesRendezVous />} />


      

{/* 
          

private for user
          

          private for admin


          <Route path="/LesInterventions" element={<LesInterventions />} />
          <Route path="/LesRendezVous" element={<LesRendezVous />} />
          <Route path="/promos" element={<Promos />} />
          <Route path="/ajouterService" element={<AjouterService />} />
         <Route path="/HomeAdmin" element={<HomeAdmin/>} />
          <Route path="/OffreEmploi" element={<OffreEmploi/>} /> */}

          
</Routes>
      </main>
    </>
  );
};

export default App;