// AdminDashboard.js

import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../../Firebase/configFirebase';
import './LesRendezVous.css';


const LesRendezVous= () => {
  const [rendezVousList, setRendezVousList] = useState([]);

  useEffect(() => {
    // Function to fetch and update the rendez-vous list
    const fetchRendezVousList = async () => {
      const rendezVousCollection = collection(firestore, 'RendezVous');
      const querySnapshot = await getDocs(rendezVousCollection);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Sort the list by date and time
      const sortedData = data.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

      setRendezVousList(sortedData);
    };

    // Fetch rendez-vous list when the component mounts
    fetchRendezVousList();
  }, []);

  const handleDeleteRendezVous = async (id) => {
    try {
      // Delete rendez-vous from Firestore
      const rendezVousRef = doc(firestore, 'RendezVous', id);
      await deleteDoc(rendezVousRef);

      // Update the rendez-vous list
      const updatedList = rendezVousList.filter((rendezVous) => rendezVous.id !== id);
      setRendezVousList(updatedList);
    } catch (error) {
      console.error('Error deleting rendez-vous:', error);
    }
  };

  return (
    <div>
      <h2>LesRendezVous</h2>
      {rendezVousList.map((rendezVous) => (
        <div key={rendezVous.id} className="rendezvous-card">
          <p>Nom: {rendezVous.nom}</p>
          <p>Modèle de voiture: {rendezVous.modeleVoiture}</p>
          <p>Immatriculation: {rendezVous.immatriculation}</p>
          <p>Kilométrage actuel: {rendezVous.kilometrage}</p>
          <p>Date et heure: {rendezVous.dateTime}</p>
          <p>Téléphone: {rendezVous.telephone}</p>
          <p>E-mail: {rendezVous.email}</p>
          <button onClick={() => handleDeleteRendezVous(rendezVous.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default LesRendezVous;
