// Import statements
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import './RendezVous.css';
import emailjs from 'emailjs-com';
import { firestore } from '../../Firebase/configFirebase';

// Component definition
const RendezVous = () => {
  // State declarations
  const [nom, setNom] = useState('');
  const [modeleVoiture, setModeleVoiture] = useState('');
  const [immatriculation, setImmatriculation] = useState('');
  const [kilometrage, setKilometrage] = useState('');
  const [dateTime, setDateTime] = useState(''); // Updated state for date and time
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');

  // Function to send email
  const sendEmail = (nom, modeleVoiture, immatriculation, kilometrage, dateTime, telephone, email) => {
    // Replace these values with your own
    const serviceID = 'service_eeuerzw';
    const templateID = 'template_u8192kh';
    const userID = '045MKDooB2Thc1kTN';

    return emailjs.send(serviceID, templateID, {
      to_name: 'Nom du destinataire',
      from_name: 'Votre Nom',
      message: `Nom: ${nom}\nModèle de voiture: ${modeleVoiture}\nImmatriculation: ${immatriculation}\nKilométrage actuel: ${kilometrage}\nDate et heure: ${dateTime}\nTéléphone: ${telephone}\nE-mail: ${email}`,
    }, userID);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sending email to the administrator
    sendEmail(
      nom,
      modeleVoiture,
      immatriculation,
      kilometrage,
      dateTime,
      telephone,
      email
    )
      .then((response) => {
        console.log('E-mail sent to the administrator successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending email to the administrator:', error);
      });

    // Sending email to the client
    sendEmail(
      'Admin', // Administrator's name
      nom, // Client's name
      'Your appointment request is being processed. We will contact you soon.'
    )
      .then((response) => {
        console.log('E-mail sent to the client successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending email to the client:', error);
      });

    // Add data to the "RendezVous" collection in Firestore
    const rendezVousCollection = collection(firestore, 'RendezVous');
    await addDoc(rendezVousCollection, {
      nom,
      modeleVoiture,
      immatriculation,
      kilometrage,
      dateTime,
      telephone,
      email,
    });

    // Resetting form fields
    setNom('');
    setModeleVoiture('');
    setImmatriculation('');
    setKilometrage('');
    setDateTime('');
    setTelephone('');
    setEmail('');
  };

  // JSX content
  return (
    <div>
      <h2>Prenez un Rendez-vous</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom:</label>
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />

        <label>Modèle de voiture:</label>
        <input type="text" value={modeleVoiture} onChange={(e) => setModeleVoiture(e.target.value)} />

        <label>Immatriculation:</label>
        <input type="text" value={immatriculation} onChange={(e) => setImmatriculation(e.target.value)} />

        <label>Kilométrage actuel:</label>
        <input type="text" value={kilometrage} onChange={(e) => setKilometrage(e.target.value)} />

        <label>Date et heure:</label>
        <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />

        <label>Téléphone:</label>
        <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} />

        <label>E-mail:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <button type="submit">Prendre un Rendez-vous</button>
      </form>
    </div>
  );
};

// Export the component
export default RendezVous;