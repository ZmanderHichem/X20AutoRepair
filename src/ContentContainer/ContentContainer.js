// ContentContainer.jsx

import React, { useEffect, useState } from 'react';
import { Container, Carousel } from 'react-bootstrap';
import styles from './customcontainer.css'; 

// import '../home/home.css'; // Include your global styles
import OffreCard from '../IndexHome/OffreCard';
import experience from '../assets/images/+10 Years Experience.jpg';
import affiche2 from '../assets/images/affiche2.jpg';
import { InView } from 'react-intersection-observer';

const ContentContainer = ({ promos, offresEmploi }) => {
  const handleIntersection = (inView, entry) => {
    if (inView) {
      entry.target.classList.add('show');
    }
  }; 
  return (
    <Container>
      <div className="limite-marquee">
        <div className="scrolling-text marquee-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae metus nec massa
            ultricies tincidunt. Nullam lacinia, odio eu fermentum tristique, elit lectus lacinia
            elit, ut consectetur arcu justo in elit. Pellentesque sit amet volutpat elit.
          </p>
        </div>
      </div>

      <div className="custom-container-wrapper">
    <InView as="div" onChange={handleIntersection} className="custom-container_content_test">
        <div className="custom-title">
          <h1>Hello World</h1>
        </div>
        <div className="custom-par">
          <p>
            Cupiditate alias odio omnis minima veritatis saepe porro, repellendus natus vitae, sequi exercitationem ipsam, qui possimus sit eveniet laborum sapiente quisquam quae neque velit?
          </p>
        </div>    </InView>
      <div className="container custom-section">
        </div>


        <Carousel>
          {promos.map((promo, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={promo.imageURL} alt={`Promo ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>

        <img src={experience} alt="experience" style={{ maxWidth: 'auto', height: 'auto', margin: '20px auto' }} />
        <img src={affiche2} alt="affiche2" style={{ maxWidth: 'auto', height: 'auto', margin: '20px auto' }} />

        {/* Your existing code for offresEmploi */}
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
