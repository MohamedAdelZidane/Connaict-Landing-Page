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
      currency: 'EUR',
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
          <div className="col-md-6 col-12" id="leftColumn">
            <h2>Get shortlisted</h2>
            
            {/* <Link to="/form">
                <Button id="startedBtn">GET STARTED, IT'S FREE</Button></Link> */}


            <div class="shadow-lg p-3 mb-5 bg-white rounded">
            <h5>Join Connaict<br/>Register your interest in becoming a Connaict partner</h5>
              <form
                id="loginForm"
                autoComplete="off"
              >



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
                {/* <div className="col-md-12 col-12 textField">
                  <TextField
                    id="email"
                    name="email"
                    label="University"
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
                    label="Graduation Year"
                    type="mail"
                    value={this.state.name}
                    fullWidth
                    onChange={event => this.handleEmailChange(event)}
                    margin="normal"
                    variant="outlined"
                    error={this.state.emailError}
                  />
                </div> */}

                {/* <div className="col-md-12 col-12 textField">
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    onChange={event => this.handlePasswordChange(event)}
                    autoComplete="current-password"
                    margin="normal"
                    error={this.state.passwordError}
                    variant="outlined"
                  />
                </div> */}

                
<div className="col-md-12 col-12 textField">
                  <TextField
                    id="email"
                    name="email"
                    label="Your Average Monthly Candidate Volume"
                    type="mail"
                    value={this.state.name}
                    fullWidth
                    onChange={event => this.handleEmailChange(event)}
                    margin="normal"
                    variant="outlined"
                    error={this.state.emailError}
                  />
                </div>



              </form>
              <Row align="center">

                <div className="col-md-12 col-12 ">
                  <Button
                    disabled={this.checkEmpty() ? true : false}
                    onClick={event => this.handleSubmit(event)}
                    color="primary"
                    variant="contained"
                    id="CreateAccBtn"
                  >
                    Register your interest
              </Button>

                </div>
              </Row>


            </div>


          </div>


          <div className='col-md-6 col-6 d-none d-sm-block' >
            <Row id="features">

              <div className="col-2" >
                <img src={"./tailoredjobs.png"} style={{width:"70px", height:"60px"}} />
              </div>
              <div className="col-10">
                <h4>Intelligent Screening</h4>
                <p>Analyze your <br/> with suitable jobs based on your interest</p>

              </div>
            </Row>

            <Row id="features">

              <div className="col-2">
                <img src={"./careerGrowth.png"} style={{width:"70px", height:"60px"}}/>
              </div>

              <div className="col-10">
                <h4>Intelligent Automation</h4>
                <p>We recommend you suitable courses based<br/> on your interest</p>

              </div>
            </Row>

            <Row id="features">

              <div className="col-2">
                <img src={"./application.png"} style={{width:"70px", height:"60px"}}/>
              </div>

              <div className="col-10">
                <h4>One application</h4>
                <p>Stop wasting time applying in irrelevant jobs<br/> we creates and submits your application in<br/> seconds</p>

              </div>
            </Row>


          </div>


          <div className='col-12 d-lg-none .d-xl-block' id="mobileFeatures">


            <Row>

              <div className="col-3">
                <img src={"./test.svg"} />
              </div>

              <div className="col-9">
                <h4>Private and exclusive</h4>
                <p>Nobody can see that you're on the<br /> market and you get access to jobs<br /> never published online</p>

              </div>
            </Row>


            <Row>

              <div className="col-3">
                <img src={"./test.svg"} />
              </div>

              <div className="col-9">
                <h4>Private and exclusive</h4>
                <p>Nobody can see that you're on the<br /> market and you get access to jobs<br /> never published online</p>

              </div>
            </Row>

            <Row>

              <div className="col-3">
                <img src={"./test.svg"} />
              </div>

              <div className="col-9">
                <h4>Private and exclusive</h4>
                <p>Nobody can see that you're on the<br /> market and you get access to jobs<br /> never published online</p>

              </div>
            </Row>




          </div>

        </Row>

        <Footer/>
      </div>
    );
  }
}

export default withStyles(styles)(Recruiters);