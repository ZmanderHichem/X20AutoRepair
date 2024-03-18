// ContentContainer.jsx

import React, { useEffect, useState } from 'react';
import { Container, Carousel, Card } from 'react-bootstrap';
import './customcontainer.css'; 
import OffreCard from '../IndexHome/OffreCard';
import experience from '../assets/images/+10 Years Experience.jpg';
import { InView } from 'react-intersection-observer';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../Firebase/configFirebase';
// import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./styles.css";

const ContentContainer = ({ promos, offresEmploi }) => {
  const [photos, setPhotos] = useState([]);

  const handleIntersection = (inView, entry) => {
    if (inView) {
      entry.target.classList.add('show');
    }
  }; 
  // const breakPoints = [
  //   { width: 1, itemsToShow: 1 },
  //   { width: 550, itemsToShow: 2 },
  //   { width: 768, itemsToShow: 3 },
  //   { width: 1200, itemsToShow: 4 },
  // ];

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
        <h2>Galerie de Photos</h2>
        <div className="gallery-container d-flex flex-wrap">
        {photos.map(image => (
          <Card key={image.id} style={{ width: '200px', margin: '0.5rem' }}>
            <Card.Img variant="top" src={image.imageURL} alt={`Image ${image.id}`} />
         
          </Card>
        ))}
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
     