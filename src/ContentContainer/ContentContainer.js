// ContentContainer.jsx

import React, { useEffect, useState } from 'react';
import { Container, Carousel } from 'react-bootstrap';
import './customcontainer.css'; 
import OffreCard from '../IndexHome/OffreCard';
import experience from '../assets/images/+10 Years Experience.jpg';
import { InView } from 'react-intersection-observer';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../Firebase/configFirebase';

const ContentContainer = ({ promos, offresEmploi }) => {
  const [photos, setPhotos] = useState([]);

  const handleIntersection = (inView, entry) => {
    if (inView) {
      entry.target.classList.add('show');
    }
  }; 

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosCollection = collection(firestore, 'gallery');
        const photosSnapshot = await getDocs(photosCollection);
        const photosData = photosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPhotos(photosData);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
  
    fetchPhotos();
  }, []);

  return (
  
    <Container>
      <div className="custom-container-wrapper">
        <InView as="div" onChange={handleIntersection} className="custom-container_content_test">
          <div className="custom-title">
            <h1>Hello World</h1>
          </div>
          <div className="custom-par">
            <p>Cupiditate alias odio omnis minima veritatis saepe porro, repellendus natus vitae, sequi exercitationem ipsam, qui possimus sit eveniet laborum sapiente quisquam quae neque velit?</p>
          </div>
        </InView>
        <div className="container custom-section">
          {/* Votre code ici */}
        </div>

        <Carousel>
          {promos.map((promo, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={promo.imageURL} alt={`Promo ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="container custom-section2">

        <Carousel interval={3000} pause={false}>
      <Carousel.Item>
        <div className="d-flex">
          {photos.slice(0, 5).map((photo, index) => (
            <img key={index} className="img-fluid" src={photo.imageURL} alt={`Photo ${index + 1}`} />
          ))}
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="d-flex">
          {photos.slice(0, 10).map((photo, index) => (
            <img key={index} className="img-fluid" src={photo.imageURL} alt={`Photo ${index + 6}`} />
          ))}
        </div>
      </Carousel.Item>
    </Carousel>

        </div>

        <h2>Rejoignez Notre Equipe</h2>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {offresEmploi.map((offre) => (
            <OffreCard key={offre.id} offre={offre} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ContentContainer;   
     