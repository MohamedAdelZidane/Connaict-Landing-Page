import {  InputGroup,Jumbotron,Button, Nav, NavDropdown,Navbar,Form,FormControl,Container, Row, Col } from 'react-bootstrap';
import React, { Component } from "react";
import './Style.css'

class NavigationBar extends Component {
    render() {


        return (
    

          <Row >
            <div className="col-12 col-sm-12 col-md-12 col-lg-12" align="center"  id="navigationItems">
            <img src={"./logo.png"}   />
            </div>
            {/* <div className="col-md-4">
              Already signed up?
              <a href="#">Login</a>
            </div> */}
          </Row>

        );}
}

export default NavigationBar;