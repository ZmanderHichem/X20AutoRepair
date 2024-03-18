// Import statements
import React, { useState, useEffect } from 'react';
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
  const [service, setService] = useState('');
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
      service,
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
      service,
      dateTime,
      telephone,
      email,
    });

    // Resetting form fields
    setNom('');
    setModeleVoiture('');
    setImmatriculation('');
    setKilometrage('');
    setService('');
    setDateTime('');
    setTelephone('');
    setEmail('');
  };

  // Add a useEffect to apply the animation class when the component mounts
  useEffect(() => {
    const formElement = document.querySelector('.rendez-vous-form');
    if (formElement) {
      formElement.classList.add('form-show');
    }
  }, []);

  // JSX content
  return (
    
    <div>
          <div className="rendez-vous-page">

      <h2>Prenez un Rendez-vous</h2>
      <form className="rendez-vous-form" onSubmit={handleSubmit}>
        <label className="RV-label">Nom: </label>
        <input type="text" placeholder="Nom & Prénom*" value={nom} onChange={(e) => setNom(e.target.value)} />

        <label className="RV-label">Téléphone:</label>
        <input type="text" placeholder="Votre Numero de Téléphone*" value={telephone} onChange={(e) => setTelephone(e.target.value)} />

        <label className="RV-label">E-mail:</label>
        <input type="email" placeholder="Votre E-mail*" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="RV-label">Modèle de voiture:</label>
        <input type="text" placeholder="Votre Modèle de voiture* " value={modeleVoiture} onChange={(e) => setModeleVoiture(e.target.value)} />

        <label className="RV-label">Immatriculation:</label>
        <input type="text" placeholder="Immatriculation de votre Voiture*" value={immatriculation} onChange={(e) => setImmatriculation(e.target.value)} />

        <label className="RV-label">Kilométrage actuel:</label>
        <input type="text" placeholder="Kilométrage actuel de votre Voiture*" value={kilometrage} onChange={(e) => setKilometrage(e.target.value)} />

        <label className="RV-label">Service Demandé:</label>
        <input type="text" placeholder="Service Demandé*" value={service} onChange={(e) => setService(e.target.value)} />

        <label className="RV-label">Date et heure:</label>
        <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} />



        <button type="submit">Prendre un Rendez-vous</button>
      </form>
    </div>
    </div>

  );
};

// Export the component
export default RendezVous;
