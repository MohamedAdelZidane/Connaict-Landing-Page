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
import './Style.css';
import MenuIcon from '@material-ui/icons/Menu';
import {  InputGroup,Jumbotron,Button, Nav, NavDropdown,Navbar,Form,FormControl,Container, Row, Col } from 'react-bootstrap';

// const variantIcon = {
//   success: CheckCircleIcon,
//   warning: WarningIcon,
//   error: ErrorIcon,
//   info: InfoIcon
// };


const styles = theme => ({


  button: {
    margin: theme.spacing.unit,
    fontFamily: font,
  },
  tabRoot: {
    // fontFamily: font,
    minWidth: 2,
    // '&:hover': {
    //   color: '#40a9ff',
    //   opacity: 6,
    // },
    // '&$tabSelected': {
    //   color: '#1890ff',
    // },
    // '&:focus': {
    //   color: '#40a9ff',
    // },
  },
  mainFeaturedPostContent: {
    // paddingBottom: `${theme.spacing.unit * 20}px`,
    paddingTop: `${theme.spacing.unit * 20}px`,
    // [theme.breakpoints.up('md')]: {
    //   paddingRight: 0,
    // },
    height: "60vh"
  },
  // cardMedia: {
  //   width: 160,
  // },
  // footer: {
  //   backgroundColor: "#111",
  //   fontFamily: font,
  //   color: "#fff",
  //   height: "40vh"
  //   // paddingTop: `${theme.spacing.unit * 50}px 0`,
  // },
});

const font = "'Raleway', sans-serif"; 

class Login extends Component {

  handleChange = (event, value) => {
    this.setState({ value });
  };
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      value: 0,
      password: "",
      submitting: false,
      snackbarMessage: "",
      snackbarOpen: false,
      emailError: false,
      passwordError: false
    };
  }

  render() {
    const { value, opp } = this.state;
    const { classes } = this.props;
    return (
        <div className={classes.layout}>


<Container align="center">
  <Row>
  <div className="col-md-6">
  Connaict LOGO
  </div>
  
  <div className="col-md-6">
  Already signed up?
  <button>login</button>
  </div>
  </Row>
</Container>

<Jumbotron align="center">
  <h3>The Egypt First</h3>
  <h1>
  Talent Match-Making Platform
  </h1>
  <h4>for Recruiters & Job Seekers</h4>
  
  <Link to="/candidates">
  <button  id="btnSubmit" class="btn btn-primary btn-sm mr-1" >
  
  <p align="center"><b>Candidates </b><br/>I'm looking for a job </p>
  
  </button></Link>

  <Link to="/admins">
  <button  id="btnSubmit" class="btn btn-primary btn-sm mr-1" >
  
  <p align="center"><b>Companies</b> <br/>I want to learn more </p>
  
  </button>
  </Link>
</Jumbotron>

<Container>
 

                                     <div>
                                            <Row >
                                                <div className="col-md-4">
                                                        <p><b>LOGO</b></p>
                                                </div>
                                                <div className="col-md-4" >
                                                    <p ><b>COMPANY</b></p>
                                                    <p><a href="#">Career Resources</a></p>
                                                    <p><a href="#">About Us</a></p>
                                                    <p><a href="#">Careers</a></p>
                                                    <p><a href="#">Enterprise Portal</a></p>
                                                    <p><a href="#">Security</a></p>
                                                    
                                                </div>
                                                <div className="col-md-3">
                                                    <p><b>SUPPORT</b></p>
                                                    <p><a href="#">Contact Us</a></p>
                                                    <p><a href="#">Terms of Use</a></p>
                                                    <p><a href="#">Privacy Policy</a></p>
                                                    <p><a href="#">FAQ</a></p>
                                                </div>
                                            </Row>
                                            <hr/>
                                        </div>

                                        <div class="container">
                                            <div class="row">
                                                <div class="col-md-12" align="center">
                                                        <p>Connaict &copy; 2019 </p>
                                                </div>
                                            </div>
                                   
                                            </div>
                                            </Container>


</div>
    );
  }
}

export default withStyles(styles)(Login);
