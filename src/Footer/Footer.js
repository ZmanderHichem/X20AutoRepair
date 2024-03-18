import React from 'react';
import './Footer.css';
import AdressLogo from "../assets/images/adresse.png";
import telLogo from "../assets/images/tel.png";
import facebook from "../assets/images/facebook.png";
import instagram from "../assets/images/instagram.png";
import tiktok from "../assets/images/tiktok.png";

const Footer = () => {
  return (
    <div id="footer">
      <div className="container-footer">
        <footer>
          <div className="row bgblue">
            <div className="col-sm-4">
              <div className="menufooter">
                <span>LIENS RAPIDES</span>
                <ul>
                  <li><a href="/Home">Home</a></li>
                  <li><a href="/RendezVous">Prenez un Rendez-Vous</a></li>
                  <li><a href="/ContactUs">Nous Localiser</a></li>
                  <li><a href="/Login">Se Connecter</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="menufooter">
                <div className="contact-item2">
                  <span>Nous Contacter</span>
                  <div>
                    <img src={telLogo} alt="telLogo" className="logo" />
                    <p className="contact-text2">+216 26 889 117 (Nizar)</p>
                  </div>
                  <div>
                    <img src={telLogo} alt="telLogo" className="logo" />
                    <p className="contact-text2">+216 22 919 778 (Adnen)</p>
                  </div>
                  <div>
                    <img src={AdressLogo} alt="AdressLogo" className="logo" />
                    <p className="contact-text2">Autoroute X20</p>
                  </div>
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
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FX20autorepair&tabs=timeline&width=340&height=300&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=true&appId=710446006005513"
                width="340"
                height="300"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
