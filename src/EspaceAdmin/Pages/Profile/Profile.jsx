import React, { useState, useEffect } from "react";
import { getAuth, updateProfile, reauthenticateWithCredential, EmailAuthProvider, updateEmail, updatePassword } from "firebase/auth";

import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../Firebase/configFirebase"; 
import "./Profile.css";
const Profile = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const auth = getAuth();
  
    useEffect(() => {
      const user = auth.currentUser;
      if (user) {
        setDisplayName(user.displayName || '');
        setEmail(user.email || '');
        setPhoneNumber(user.phoneNumber || '');
      }
    }, [auth]);
  
    const handleUpdateProfile = async () => {
      try {
        const user = auth.currentUser;
        await updateProfile(user, {
          displayName: displayName,
        });
        console.log("Profil mis à jour avec succès !");
      } catch (error) {
        console.error("Erreur lors de la mise à jour du profil :", error.message);
      }
    };
  
    const handleChangeEmail = async () => {
      try {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(user, credential);
        await updateEmail(user, newEmail);
        const userDocRef = doc(firestore, 'users', user.uid);
        await updateDoc(userDocRef, { email: newEmail });
        console.log("Adresse e-mail mise à jour avec succès !");
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'adresse e-mail :", error.message);
      }
    };
  
    const handleChangePassword = async () => {
      try {
        if (newPassword !== confirmPassword) {
          throw new Error("Les nouveaux mots de passe ne correspondent pas !");
        }
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        console.log("Mot de passe mis à jour avec succès !");
      } catch (error) {
        console.error("Erreur lors de la mise à jour du mot de passe :", error.message);
      }
    };

  return (
    <div className="formWrapper">     
     <h2>Profil de l'utilisateur</h2>
      <div>
        <label>Nom d'utilisateur:</label>
        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} disabled />
        <button onClick={handleChangeEmail}>Modifier l'adresse e-mail</button>
      </div>
      <div>
        <label>Nouvelle adresse e-mail:</label>
        <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
      </div>
      <div>
        <label>Mot de passe:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Nouveau mot de passe:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <div>
        <label>Confirmer le nouveau mot de passe:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <div>
        <label>Numéro de téléphone:</label>
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
     
      <button onClick={handleUpdateProfile}>Mettre à jour le profil</button>
      <button onClick={handleChangePassword}>Modifier le mot de passe</button>
    </div>
  );
};

export default Profile;
