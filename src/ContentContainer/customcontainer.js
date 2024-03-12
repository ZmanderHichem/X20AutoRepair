import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './customcontainer.css'; // Importez vos styles
import OffreCard from '../home/OffreCard';
import experience from '../../../assets/images/+10 Years Experience.jpg';
import affiche2 from '../../../assets/images/affiche2.jpg';
import { InView } from 'react-intersection-observer';

const CustomContainer = ({ promos, offresEmploi }) => {
  const handleIntersection = (inView, entry) => {
    if (inView) {
      entry.target.classList.add('show');
    }
  }; 
  return (
    <Container className="custom-container-wrapper">
    <InView as="div" onChange={handleIntersection} className="custom-container_content_test">
        <div className="custom-title">
          <h1>Hello World</h1>
        </div>
        <div className="custom-par">
          <p>
            Cupiditate alias odio omnis minima veritatis saepe porro, repellendus natus vitae, sequi exercitationem ipsam, qui possimus sit eveniet laborum sapiente quisquam quae neque velit?
          </p>
        </div>    </InView>
    </Container>
  );
};


export default CustomContainer;



