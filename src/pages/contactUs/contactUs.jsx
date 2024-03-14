// ContactUs.jsx

import React from 'react';
import garage from '../../assets/images/garage.png';
import facebook from '../../assets/images/facebook.png';
import instagram from '../../assets/images/instagram.png';
import tiktok from '../../assets/images/tiktok.png';

import './contactUs.css';

const ContactUs = () => {
  return (
    <div className="page-container">
      <div className="contact-section">
        <div className="contact-info">
          <h3>Coordonnées</h3>
          <h5>Nom de l'entreprise: X20 Auto Repair</h5>
          <h5>Adresse: x20</h5>
          <h5>Nizar:</h5>
          <h5>Numéro de téléphone: +216 26 889 117</h5>
          <h5>Adnen:</h5>
          <h5>Numéro de téléphone: +216 22 919 778</h5>
        </div>
        <div className="contact-image">
          <img src={garage} alt="Image de contact" />
        </div>
      </div>

      <div>
        <div className="social-media-icons">
          <a href="https://www.facebook.com/X20autorepair/" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="lien_instagram" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" />
          </a>
          <a href="lien_tiktok" target="_blank" rel="noopener noreferrer">
            <img src={tiktok} alt="TikTok" />
          </a>
        </div>

        <div className="location">
          <h3>Nous localiser</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12770.14733417625!2d10.136772!3d36.8535672!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd3343d82e69bf%3A0x8d4c75cb7a9d74e2!2sX20%20auto%20repair!5e0!3m2!1sen!2stn!4v1710369860518!5m2!1sen!2stn
            "
            style={{
              width: '100%',
              height: '400px',
              border: 0,
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
