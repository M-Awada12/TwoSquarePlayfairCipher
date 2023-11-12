import React from 'react';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.css';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-item">
          <ul>
            <li><span className='sub'>EECE 455 Project</span></li>
            <li><span className='sub'>Done by:</span></li>
          </ul>
          <h2>Mohammad Awada</h2>
          <h2>Mahdi Ajroush</h2>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy;2023 Awada and Ajroush, All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
