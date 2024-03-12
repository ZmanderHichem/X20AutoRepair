import React, { useEffect, useState } from 'react';
import { getFirestore, collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../../Firebase/configFirebase';

const AjouterService = () => {
  const [services, setServices] = useState([
    {
      immatriculation: '',
      numChassis: '',
      nomProprietaire: '',
      email: '',
      serviceRealise: [],
      dateRealisation: '',
    },
  ]);

  const [autreService, setAutreService] = useState('');
  const [optionsService, setOptionsService] = useState([]);

  useEffect(() => {
    const fetchOptionsService = async () => {
      const optionsServiceCollection = collection(firestore, 'optionsService');
      const querySnapshot = await getDocs(optionsServiceCollection);

      const options = [];
      querySnapshot.forEach((doc) => {
        options.push({ id: doc.id, ...doc.data() });
      });

      setOptionsService(options);
    };

    fetchOptionsService();
  }, []);

  const ajouterAutreService = async () => {
    if (autreService.trim() === '') {
      alert('Veuillez saisir une valeur pour "Autre Service"');
      return;
    }

    const existeDeja = optionsService.some((option) => option.nom === autreService);

    if (!existeDeja) {
      const optionsServiceCollection = collection(firestore, 'optionsService');
      const newOptionRef = doc(optionsServiceCollection);

      await setDoc(newOptionRef, { nom: autreService });

      setOptionsService([...optionsService, { id: newOptionRef.id, nom: autreService }]);
      alert(`Nouvelle option "${autreService}" ajoutée avec succès!`);

      setAutreService('');
    } else {
      alert(`L'option "${autreService}" existe déjà.`);
    }
  };

  const ajouterService = async (event) => {
    event.preventDefault();
    console.log('Fonction ajouterService() appelée.');

    const dernierService = services[services.length - 1];
    for (const key in dernierService) {
      if (Array.isArray(dernierService[key]) && dernierService[key].length === 0) {
        alert('Veuillez sélectionner au moins un service pour le service en cours avant d\'ajouter un nouveau service.');
        return;
      } else if (dernierService[key] === '') {
        alert('Veuillez remplir tous les champs pour le service en cours avant d\'ajouter un nouveau service.');
        return;
      }
    }

    const servicesCollection = collection(firestore, 'services');
    const newServiceRef = doc(servicesCollection);

    await setDoc(newServiceRef, {
      immatriculation: dernierService.immatriculation,
      numChassis: dernierService.numChassis,
      nomProprietaire: dernierService.nomProprietaire,
      email: dernierService.email,
      serviceRealise: dernierService.serviceRealise.includes('Autre') ? [...dernierService.serviceRealise, autreService] : dernierService.serviceRealise,
      dateRealisation: dernierService.dateRealisation,
    });

    console.log('Service ajouté avec succès.');

    // Mettre à jour uniquement le dernier service dans l'état
    setServices((prevServices) => {
      const updatedServices = [...prevServices];
      updatedServices[updatedServices.length - 1] = {
        immatriculation: '',
        numChassis: '',
        nomProprietaire: '',
        email: '',
        serviceRealise: [],
        dateRealisation: '',
      };
      return updatedServices;
    });
  };

  const handleServiceChange = (event, index) => {
    const { name, value, type, options } = event.target;
  
    setServices((prevServices) => {
      const updatedServices = [...prevServices];
  
      if (type === 'select-multiple') {
        // Gérer le champ de type "select-multiple"
        const selectedValues = Array.from(options)
          .filter((option) => option.selected)
          .map((option) => option.value);
  
        updatedServices[index][name] = selectedValues;
      } else {
        // Gérer les autres champs
        updatedServices[index][name] = value;
      }
  
      return updatedServices;
    });
  };
   
  const ajouterNouveauChamp = () => {
    // Ajouter un nouveau service vide dans l'état
    setServices([...services, {
      immatriculation: '',
      numChassis: '',
      nomProprietaire: '',
      email: '',
      serviceRealise: [],
      dateRealisation: '',
    }]);
  };

  return (
    <div>
      <div>
        <h2>Ajouter un nouveau service</h2>
        {/* Formulaire pour ajouter un ou plusieurs services */}
        {services.map((service, index) => (
          <form key={index} id={`serviceForm${index}`}>
            <label htmlFor={`immatriculation${index}`}>Immatriculation :</label>
            <input
              type="text"
              name="immatriculation"
              value={service.immatriculation}
              onChange={(e) => handleServiceChange(e, index)}
              required
            /><br />


            <label htmlFor={`nomProprietaire${index}`}>Nom du propriétaire :</label>
            <input
              type="text"
              name="nomProprietaire"
              value={service.nomProprietaire}
              onChange={(e) => handleServiceChange(e, index)}
              required
            /><br />

            <label htmlFor={`email${index}`}>E-mail du client :</label>
            <input
              type="email"
              name="email"
              value={service.email}
              onChange={(e) => handleServiceChange(e, index)}
              required
            /><br />

            <label htmlFor={`serviceRealise${index}`}>Service réalisé :</label>
            <select
              name="serviceRealise"
              multiple
              value={service.serviceRealise}
              onChange={(e) => handleServiceChange(e, index)}
              required
            >
              {optionsService.map((option) => (
                <option key={option.id} value={option.nom}>
                  {option.nom}
                </option>
              ))}
            </select>

            {service.serviceRealise.includes('Autre') && (
              <div>
                <label htmlFor={`autreService${index}`}>Autre service :</label>
                <input
                  type="text"
                  name="autreService"
                  value={autreService}
                  onChange={(e) => setAutreService(e.target.value)}
                  required
                />
                <button type="button" onClick={ajouterAutreService}>Ajouter "Autre" à la liste</button>
              </div>
            )}

            <label htmlFor={`dateRealisation${index}`}>Date de réalisation :</label>
            <input
              type="date"
              name="dateRealisation"
              value={service.dateRealisation}
              onChange={(e) => handleServiceChange(e, index)}
              required
            /><br />
          </form>
        ))}

        {/* Bouton pour ajouter un nouveau champ */}
        <button type="button" onClick={ajouterNouveauChamp}>Ajouter un nouveau champ</button>

        <button onClick={ajouterService}>Ajouter Service</button>
      </div>
    </div>
  );
};

export default AjouterService;
