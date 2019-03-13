import React, { Component } from "react";

import { NavLink, Link } from "react-router-dom";


import {  InputGroup,Jumbotron,Button, Nav, NavDropdown,Navbar,Form,FormControl,Container, Row, Col } from 'react-bootstrap';
import './Style.css'
import NavigationBar from "../navigationBar/NavigationBar";
import Footer from "../footer/Footer";

const font = "'Raleway', sans-serif";


class Home extends Component {

  handleChange = (event, value) => {
    this.setState({ value });
  };
  constructor(props) {
    super(props);
    this.state = {
      snackbarMessage: "",
      snackbarOpen: false,
    };
  }

  render() {
    const { value, opp } = this.state;
    const { classes } = this.props;
    return (
      <div style={{overflowX: "hidden"}}>
        <NavigationBar/>
        {/* <Container className="NavBar" align="center">
          <Row>
            <div className="col-md-6">
              Connaict LOGO
            </div>
            <div className="col-md-6">
              Already signed up?
              <a href="#">Login</a>
            </div>
          </Row>
        </Container> */}
          
        {/* <Jumbotron id="jumbotronColor"> */}
        


        <Row id="jumbotronColor">

<div className="col-lg-6 col-md-12 col-sm-12 col-12">

<Row >
  <div className="col-12  col-md-12" >
    <h3>The Egypt First</h3>
  </div>
</Row>
<Row>
  <div className="col-12 col-md-12" >
    <h1>Talent Match-Making Platform</h1>
  </div>
</Row>
<Row>
  <div className="col-12 col-md-12" >
    <h4>for Recruiters & Job Seekers</h4>
  </div>
</Row>
<Row id="buttons">
    <div className="col-12 col-sm-12 col-md-12 col-lg-12" >

    <Link to="/candidates">
      <button id="CandbtnSubmit" class="btn" >
        Candidates
      </button>
    </Link>
    </div>
    <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
    <Link to="/recruiters">
      <button id="CombtnSubmit" class="btn" >
        Companies
      </button>
    </Link>
    
    </div>
    </Row>

</div>
<div className="col-md-6 d-none d-lg-block">
<img src={"./row1.png"} width="420px" height="300px"/>
</div>

<div className="col-sm-12 col-12 d-lg-none  .d-xl-block mobileImage">
<img src={"./row1.png"} className="homeImage"/>
{/* width="315px" height="169px" */}
                </div>

</Row>

          
      
          
              
        {/* </Jumbotron> */}
          
        <Footer/>
        </div>

    );
  }
}

export default Home;
