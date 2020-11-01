import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
const Footer = () => (
  <div style={{ display: "flex", justifyContent: "space-around", alignItems:"center" }} className="footer">
  <span>
  &copy; {new Date().getFullYear()} Petkovski - All Rights Reserved
  </span>
  <span>Optimized For Desktop Computers</span>  
  <span>E-mail: flp_petkovski@yahoo.com</span>
    <div>
      {" "}
      <div className="footer-social-icons" style={{display: "flex"}}>
      <a className="social_icon" href="https://github.com/flppetkovski?tab=repositories" target="_blank" ><FontAwesomeIcon icon={faGithub} style={{marginRight: "0.75rem"}} /></a>
     <a className="social_icon" href="https://www.linkedin.com/in/filip-petkovski-06766b100/" target="_blank"> <FontAwesomeIcon  icon={faLinkedin} /></a>
      
      </div>
    </div>
  </div>
);

export default Footer;
