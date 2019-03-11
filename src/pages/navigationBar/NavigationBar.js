import {  InputGroup,Jumbotron,Button, Nav, NavDropdown,Navbar,Form,FormControl,Container, Row, Col } from 'react-bootstrap';
import React, { Component } from "react";
import './Style.css'

class NavigationBar extends Component {
    render() {


        return (
    

          <Row id="navigationItems">
            <div className="col-md-8">
              Connaict LOGO
            </div>
            <div className="col-md-4">
              Already signed up?
              <a href="#">Login</a>
            </div>
          </Row>

        );}
}

export default NavigationBar;