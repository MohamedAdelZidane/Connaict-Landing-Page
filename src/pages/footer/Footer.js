import React, { Component } from "react";
import {  Container, Row } from 'react-bootstrap';
import './Style.css'


class Footer extends Component {

    
  
    render() {
      return (
        <div >
            
              <Row id="footer" >
                <div className="col-md-5 d-none d-lg-block d-md-block" id="aboutInNavigation">
                  <p>Connaict is an AI company aims to connect recruiters<br/> with qualified candidates using AI, also helping<br/> candidates developing in their career path.</p>
                  <p >&copy; 2019 Connaict, All rights reserved  </p>
                </div>
                <div className="col-md-3 col-6 linksColor" >
                  <p id="aboutInNavigation"><b>COMPANY</b></p>
                  <p><a href="#">Career Resources</a></p>
                  <p><a href="#">About Us</a></p>
                  <p><a href="#">Careers</a></p>
                  <p><a href="#">Enterprise Portal</a></p>
                  <p><a href="#">Security</a></p>
                </div>
  
                <div className="col-md-3 col-6 linksColor">
                  <p id="aboutInNavigation"><b>SUPPORT</b></p>
                  <p><a href="#">Contact Us</a></p>
                  <p><a href="#">Terms of Use</a></p>
                  <p><a href="#">Privacy Policy</a></p>
                  <p><a href="#">FAQ</a></p>
                </div>
  
                <div className="col-sm-12 d-lg-none d-md-none .d-xl-block" id="aboutInNavigation">
                <p>Connaict is an AI company aims to connect recruiters with qualified candidates using AI, also helping candidates developing in their career path.</p>
                  <p >&copy; 2019 Connaict, All rights reserved  </p>
                  
                </div>
              </Row>
        </div>
  
      );
    }
  }
  
  export default Footer;