import React, { Component } from "react";
import { isLoggedIn } from "../../components/AuthService";
import { API_URL } from "../../constants/Constants";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { inherits } from "util";
import SearchIcon from '@material-ui/icons/Search';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
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

<div className="col-md-6">
<div className="col-sm-12 d-lg-none .d-xl-block ">
<img src={"./row1.png"} width="315px" height="169px"/>
                  
                </div>
<Row >
  <div className="col-xs-12 col-md-12" >
    <h3>The Egypt First</h3>
  </div>
</Row>
<Row>
  <div className="col-xs-12 col-md-12" >
    <h1>Talent Match-Making Platform</h1>
  </div>
</Row>
<Row>
  <div className="col-xs-12 col-md-12" >
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
    <Link to="/admins">
      <button id="CombtnSubmit" class="btn" >
        Companies
      </button>
    </Link>
    
    </div>
    </Row>

</div>
<div className="col-md-6 d-none d-sm-block">
<img src={"./row1.png"} width="420px" height="300px"/>
</div>

</Row>

          
      
          
              
        {/* </Jumbotron> */}
          
        <Footer/>
        </div>

    );
  }
}

export default Home;
