// LesInterventions.jsx

import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../Firebase/configFirebase';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './LesInterventions.css'


const LesInterventions = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedService, setSelectedService] = useState(null);
  
    useEffect(() => {
      const fetchServices = async () => {
        const servicesCollection = collection(firestore, 'services');
        const servicesSnapshot = await getDocs(servicesCollection);
        const servicesData = servicesSnapshot.docs.map(doc => doc.data());
        setServices(servicesData);
      };
  
      fetchServices();
    }, []);
  
    useEffect(() => {
      const filtered = services.filter(service =>
        service.nomProprietaire.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.immatriculation.toLowerCase().includes(searchTerm.toLowerCase())
      );
        
      
      setFilteredServices(filtered);
    }, [services, searchTerm]);
  
    const handleServiceClick = (service) => {
      setSelectedService(service);
    };
  
    const handleSearchTermChange = (e) => {
      const term = e.target.value;
      setSearchTerm(term);
      setSelectedService(null); 
    };
  
    return (
      <div>



        <h2>Les Interventions</h2>
  
        {/* Barre de recherche */}
        <input
  type="text"
  placeholder="Rechercher par nom du propriétaire ou immatriculation"
  value={searchTerm}
  onChange={handleSearchTermChange}
/>
  
        {/* Liste des noms filtrés */}
        <div className="formContainer custom">
  <div className="formWrapper custom">       
          {searchTerm && filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <div key={index} onClick={() => handleServiceClick(service)}>

              <p>Date du Service: {service.dateRealisation}</p>
              <p>Nom du propriétaire: {service.nomProprietaire}</p>
              <p>Immatriculation: {service.immatriculation}</p>
              <p>E-mail du client: {service.email}</p>
              <p>Service: {service.serviceRealise}</p>

                <hr />
              </div>
            ))
          ) : (
            <p>Aucun résultat trouvé.</p>
          )}
        </div>
  
        </div>

      </div>
    );
  };
  
  export default LesInterventions;