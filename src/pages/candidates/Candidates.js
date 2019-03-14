import React, { Component } from "react";
import { isLoggedIn } from "../../components/AuthService";
import { API_URL } from "../../constants/Constants";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, nputGroup, Jumbotron, Nav, NavDropdown, Navbar, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import './Style.css';
import NavigationBar from "../navigationBar/NavigationBar";
import Forms from "../candidateForm/Forms";
import Footer from "../footer/Footer";


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const font = "'Raleway', sans-serif";

class Candidates extends Component {

  onFileLoad = (e, file) => console.log(e.target.result, file.name);

  handleChange = (event, value) => {
    this.setState({ value });
  };
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      snackbarMessage: "",
      snackbarOpen: false,
    };
  }

  checkEmpty = () => {
    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.emailError ||
      this.state.passwordError
    )
      return true;
    else return false;
  };

  

  handleEmailChange = event => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let error = false;
    if (!re.test(event.target.value)) {
      error = true;
    }
    this.setState({ email: event.target.value, emailError: error });
  };

  handlePasswordChange = event => {
    let error = false;
    if (event.target.value === "") error = true;
    this.setState({ password: event.target.value, passwordError: error });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.emailError || this.state.passwordError) {
      this.setState({
        snackbarMessage: "Please Enter Valid Data",
        snackbarOpen: true
      });
    } else {
      this.setState({ submitting: true });
      var loginForm = document.getElementById("loginForm");
      axios({
        method: "post",
        url: API_URL + "admins/login",
        mode: "cors",
        data: new FormData(loginForm)
      })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response;
          } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
          }
        })
        .then(responseData => {
          if (responseData.data.res === 0) {
            this.setState({
              submitting: false,
              snackbarOpen: true,
              snackbarMessage: responseData.data.message
            });
          } else {
            if (
              responseData.data.data !== undefined ||
              responseData.data.data != ""
            ) {
              localStorage.setItem("jwtToken", responseData.data.data);
              window.location.href = "/";
            } else {
              this.setState({
                submitting: false,
                snackbarOpen: true,
                snackbarMessage: "error"
              });
            }
          }
        })
        .catch(error =>
          console.log(
            "There has been a problem with your fetch operation: " +
            error.message
          )
        );
    }
  };

  render() {
    const { value, opp } = this.state;
    const { classes } = this.props;
    return (
      <div style={{overflowX: "hidden"}}>
        <NavigationBar />

        <Row id="content">
          <div className="col-md-12 col-lg-6 col-12" >
          <h2 id="CandidatesSlogan">A new adventure begins 2019-05-05</h2>
            <h2 id="CandidatesSlogan">Get shortlisted. Get Hired.</h2>


            <div class="shadow-lg p-3 mb-5 bg-white rounded " id="mobileForm" >
            <h5 id="mobileFormText">Notify me at launch!</h5>
              <form
                id="loginForm"
                autoComplete="off"
              >
                <div className="col-md-12 col-12 textField" >
                  <TextField

                    id="email"
                    name="email"
                    label="Email"
                    type="mail"
                    value={this.state.name}
                    fullWidth
                    onChange={event => this.handleEmailChange(event)}
                    margin="normal"
                    variant="outlined"
                    error={this.state.emailError}
                  />
                </div>
                <div className="col-md-12 col-12 textField">
                  <TextField
                    id="email"
                    name="email"
                    label="Name"
                    type="mail"
                    value={this.state.name}
                    fullWidth
                    onChange={event => this.handleEmailChange(event)}
                    margin="normal"
                    variant="outlined"
                    error={this.state.emailError}
                  />
                </div>

                <div className="col-md-12 col-12 textField">
                <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload your cv
        </Button>
      </label>
                </div>
                




              </form>
              <Row align="center">

                <div className="col-md-12 col-12 col-sm-12 btn">
                <Button
                    disabled={this.checkEmpty() ? true : false}
                    onClick={event => this.handleSubmit(event)}
                    color="primary"
                    variant="contained"
                  >
                    Submit
              </Button>
                  </div>
                  {/* <div className="col-md-6 col-6 col-sm-6 shareBtn">
                  <a href="https://www.facebook.com/sharer/sharer.php?s=100&p[url]=http://www.google.com&p[images][0]=&p[title]=Title%20Goes%20Here&p[summary]=Description%20goes%20here!" target="_blank" onclick="window.open(this.href,'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250'); return false"><Button type="button" class="btn btn-facebook btn-lg"><i className="fa fa-facebook fa-2"></i> Share</Button></a>

                  </div> */}
                  
              </Row>


            </div>


          </div>


          <div className='col-md-6 col-12 d-none d-lg-block' >
            <Row>
              <div className="col-2 iconImage" >
                <img src={"./tailoredjobs.png"} style={{width:"70px", height:"60px"}} />
              </div>

              <div className="col-10 iconText">
                <h4>Jobs tailored to you</h4>
                <p>Sophisticated matching algorithms pairs you with suitable jobs based on your interest</p>

              </div>
            </Row>

            <Row >

              <div className="col-2 iconImage">
                <img src={"./careerGrowth.png"} style={{width:"70px", height:"60px"}}/>
              </div>

              <div className="col-10 iconText">
                <h4>Career Development Plan</h4>
                <p>We recommend you suitable courses based on your interest</p>

              </div>
            </Row>

            <Row>

              <div className="col-2 iconImage">
                <img src={"./application.png"} style={{width:"70px", height:"60px"}}/>
              </div>

              <div className="col-10 iconText">
                <h4>One application</h4>
                <p>Stop wasting time applying in irrelevant jobs we creates and submits your application in seconds</p>

              </div>
            </Row>


          </div>


          <div className='d-lg-none .d-xl-block' id="mobileFeatures">


            <Row>
              <div className="col-12 col-sm-6 col-md-6 col-lg-12">
              <div className="featureIcon" align="center" >
              <img src={"./tailoredjobs.png"}  />
              </div>

              <div className="iconTitle">
              <h4>Jobs tailored to you</h4>
              </div>

              <div className="iconDescription">
              <p>Sophisticated matching algorithms pairs you with suitable jobs based on your interest</p>
              </div>
              </div>

              <div className="col-12 col-sm-6 col-md-6 col-lg-12">

            <div className="featureIcon" align="center">
            <img src={"./application.png"} id="featureIcon" />
              </div>

              <div className="iconTitle">
              <h4>One application</h4>
              </div>

              <div className="iconDescription">
              <p>Stop wasting time applying in irrelevant jobs we creates and submits your application in seconds</p>
              </div>
              </div>

            </Row>

            <Row>

<div className="col-12 col-sm-12 col-md-12 col-lg-12">

            <div className="featureIcon" align="center">
            <img src={"./careerGrowth.png"}  />
              </div>

              <div className="iconTitle2">
              <h4>Career development plan</h4>
              </div>

              <div className="iconDescription2">
              <p>We recommend you suitable courses based on your interest</p>
              </div>
              </div>
            </Row>




          </div>

        </Row>

        <Footer/>
      </div>
    );
  }
}

export default withStyles(styles)(Candidates);