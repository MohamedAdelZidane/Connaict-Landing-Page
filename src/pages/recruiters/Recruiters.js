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
import './RecruitersStyle.css';
import NavigationBar from "../navigationBar/NavigationBar";
import Forms from "../candidateForm/Forms";
import Footer from "../footer/Footer";
import MenuItem from '@material-ui/core/MenuItem';




const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const font = "'Raleway', sans-serif";

class Recruiters extends Component {

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

<Row>
  <div className="col-md-12" id="slogan">
  <h2>A new adventure begins 2019-05-05</h2>
  <h2>Save Time. Reduce Cost. Find Talent.</h2>
            <h3>We goes beyond keyword matches</h3>
  </div>
  </Row>
        {/* <Row id="content">
          <div className="col-md-12 col-12" id="slogan">
            <h2>Save Time. Reduce Cost. Find Talent.</h2>
            <h3>We goes beyond keyword matches</h3>
          </div>
        </Row> */}

          <Row id="secondFeatures">
            <div className="col-lg-4 col-md-6 col-12 col-sm-6" >
              <div className="col-md-12" align="center">
                <img src={"./reduceCost.png"}  style={{ width: "70px", height: "60px" }} />
              </div>
              <div className="col-md-12 featureTitle">
              Reduce Recruiting Budget. Increase Talent Pool
            </div>
              <div className="col-md-12 featureText">
                Our AI algorithms will source you top talents on-demand
                and you pay / right match. Prevent paying for ads and inefficient sourcing costs
            </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12 col-sm-6" >
              <div className="col-md-12" align="center">
                <img src={"./intelligentFilter.png"} style={{ width: "70px", height: "60px" }} />
              </div>
              <div className="col-md-12 featureTitle">
                Intelligent Filter
            </div>
              <div className="col-md-12 featureText">
                Never get overwhelmed by volume. our AI algorithms match you with top talents based on your criteria automatically, in real-time, with speed and incredible accuracy
            </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12 col-sm-6">
              <div className="col-md-12" align="center">
                <img src={"./candidateSummary.png"} style={{ width: "70px", height: "60px" }} />
              </div>
              <div className="col-md-12 featureTitle">
                Intelligent Candidate Summaries
            </div>
              <div className="col-md-12 featureText">
                our AI algorithms will parse and extracts helpful details from candidate profile and CV like skills set, management level and work experience
            </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12 col-sm-6 d-lg-none d-none d-sm-block">
              <div className="col-md-12" align="center">
                <img src={"./candidateResponse.png"} style={{ width: "70px", height: "60px" }} />
              </div>
              <div className="col-md-12 featureTitle">
                Increase Candidate Response Rate
            </div>
              <div className="col-md-12 featureText">
                eliminate phone screen and reach candidates through their preferred method of contacts
            </div>
            </div>

          </Row>

          <Row id="secondFeatures">
            <div className="col-lg-4 col-md-6 col-12 col-sm-6 d-md-none d-lg-block d-sm-none" >
              <div className="col-md-12" align="center">
                <img src={"./candidateResponse.png"} style={{ width: "70px", height: "60px" }} />
              </div>
              <div className="col-md-12 featureTitle">
                Increase Candidate Response Rate
            </div>
              <div className="col-md-12 featureText">
                eliminate phone screen and reach candidates through their preferred method of contacts
            </div>
            </div>
            

            <div className="col-lg-4 col-md-6 col-12 col-sm-6">
              <div className="col-md-12" align="center">
                <img src={"./qualifyCandidates.png"} style={{ width: "70px", height: "60px" }} />
              </div>
              <div className="col-md-12 featureTitle">
                Efficiently Qualify Candidates
            </div>
              <div className="col-md-12 featureText">
                asking candidates custom questions through In-App chat
            </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12 col-sm-6">
              <div className="col-md-12" align="center">
                <img src={"./candidateExperience.png"} style={{ width: "70px", height: "60px" }} />
              </div>
              <div className="col-md-12 featureTitle">
                Improve Candidate Experience
            </div>
              <div className="col-md-12 featureText">
                Send valuable feedback to candidates in minutes through efficient In-Feedback system
            </div>
            </div>
          </Row>

          {/* <Row >
            <div className="col-md-12 col-12 col-sm-12 col-lg-12">
              <div className="col-md-12" align="center">
                <img src={"./tailoredjobs.png"} style={{ width: "70px", height: "60px" }} />
              </div>
              <div className="col-md-12 featureTitle">
                Reduce Your Recruiting Budget
            </div>
              <div className="col-md-12 featureText">
                talent platform that provides you with a talent pool so you can pay / right match and prevent paying for ads and inefficient sourcing costs
            </div>
            </div>
          </Row> */}


        <Row id="form">
          <div className="col-md-12">
            <h4>Notify me at launch!</h4>
          </div>
          <div class="shadow-lg p-3 mb-5 bg-white rounded col-md-12" id="Recruitersform">
            <form
              id="loginForm"
              autoComplete="off"
            >
              <div className="col-md-12 col-12 textField" >
                <TextField
                  id="email"
                  name="email"
                  label="Your Name"
                  type="mail"
                  value={this.state.name}
                  fullWidth
                  onChange={event => this.handleEmailChange(event)}
                  margin="normal"
                  variant="outlined"
                  error={this.state.emailError}
                />
              </div>
              <div className="col-md-12 col-12 textField" >
                <TextField
                  id="email"
                  name="email"
                  label="Your Email Address"
                  type="mail"
                  value={this.state.name}
                  fullWidth
                  onChange={event => this.handleEmailChange(event)}
                  margin="normal"
                  variant="outlined"
                  error={this.state.emailError}
                />
              </div>
              <div className="col-md-12 col-12 textField" >
                <TextField
                  id="email"
                  name="email"
                  label="Your Title"
                  type="mail"
                  value={this.state.name}
                  fullWidth
                  onChange={event => this.handleEmailChange(event)}
                  margin="normal"
                  variant="outlined"
                  error={this.state.emailError}
                />
              </div>
              <div className="col-md-12 col-12 textField" >
                <TextField
                  id="email"
                  name="email"
                  label="Your Company"
                  type="mail"
                  value={this.state.name}
                  fullWidth
                  onChange={event => this.handleEmailChange(event)}
                  margin="normal"
                  variant="outlined"
                  error={this.state.emailError}
                />
              </div>
              <div className="col-md-12 col-12 textField" >
                <TextField
                  id="email"
                  name="email"
                  label="Your Phone Number"
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
                  label="Avg Monthly Candidate Volume"
                  type="mail"
                  value={this.state.name}
                  fullWidth
                  onChange={event => this.handleEmailChange(event)}
                  margin="normal"
                  variant="outlined"
                  error={this.state.emailError}
                />
              </div>

              <div className="col-md-12 col-12 ">
                <Button
                  disabled={this.checkEmpty() ? true : false}
                  onClick={event => this.handleSubmit(event)}
                  color="primary"
                  variant="contained"
                  id="CreateAccBtn"
                >
                  notify me
              </Button>

              </div>

            </form>
            </div>
              
     

            </Row>

            

        

        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(Recruiters);