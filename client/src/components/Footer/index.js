import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCompass, faPhone, faClock, faEnvelope } from '@fortawesome/fontawesome-free-solid';


const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">
          Waves
        </div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact information</h2>
            <div className="business_nfo">
              <div className="tag">
                <FontAwesomeIcon 
                  icon={faCompass}
                  className="icon"
                />
                <div className="nfo">
                  <div>Adress</div>
                  <div>Kramer 3231</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon 
                  icon={faPhone}
                  className="icon"
                />
                <div className="nfo">
                  <div>Phone</div>
                  <div>+1 854 22 33</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon 
                  icon={faClock}
                  className="icon"
                />
                <div className="nfo">
                  <div>Working Hours</div>
                  <div>+1 854 22 33</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon 
                  icon={faEnvelope}
                  className="icon"
                />
                <div className="nfo">
                  <div>Email</div>
                  <div>info@waves.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h2>Be the first to know</h2>
            <div>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;

