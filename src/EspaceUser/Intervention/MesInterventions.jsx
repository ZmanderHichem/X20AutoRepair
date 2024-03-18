import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../IndexHome/AuthContext';
import { firestore } from '../../Firebase/configFirebase';

const MesInterventions = () => {
  const [userData, setUserData] = useState(null);
  const [services, setServices] = useState([]);
  const { currentUser } = useAuth(); // Assurez-vous d'avoir une méthode currentUser dans votre AuthContext

  useEffect(() => {
    const fetchServices = async () => {
      if (currentUser) {
        // Récupérer les données de l'utilisateur depuis Firestore
        const userRef = collection(firestore, 'users');
        const userQuery = query(userRef, where('email', '==', currentUser.email));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setUserData(userData);
          console.log('UserData:', userData); // Vérifiez les données utilisateur dans les logs

          // Récupérer les services de l'utilisateur depuis Firestore
          const servicesCollection = collection(firestore, 'services');
          const servicesQuery = query(servicesCollection, where('immatriculation', '==', userData.immatriculation));
          const servicesSnapshot = await getDocs(servicesQuery);

          const servicesData = servicesSnapshot.docs.map(doc => doc.data());
          // Tri des services par date décroissante
          servicesData.sort((a, b) => new Date(b.dateRealisation) - new Date(a.dateRealisation));
          setServices(servicesData);
          console.log('ServicesData:', servicesData); 
        }
      }
    };

    fetchServices();
  }, [currentUser]);

  return (
    <div>
      <h1>Vos Services</h1>
      <div className="formContainer custom">
        <div className="formWrapper custom"> 
          {userData && (
            <div>
              {services.map((service, index) => (
                <div key={index}>
                  <p>Service réalisé : {service.serviceRealise.join(' - ')}</p>
                  <p>Date du Service : {service.dateRealisation}</p>
                  {index < services.length - 1 && <hr />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MesInterventions;
