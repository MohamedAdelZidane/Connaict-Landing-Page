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
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
import { Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import {  InputGroup,Jumbotron, Nav, NavDropdown,Navbar,Form,FormControl,Container, Row, Col } from 'react-bootstrap';
import './Style.css'; 
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationBar from "../navigationBar/NavigationBar";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000063",
      contrastText: "#FFF"
    },
    secondary: indigo
  }
});

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles = theme => ({
  card: {
    // width: "50%",
    margin: "auto",
    paddingTop: 40,
    paddingBottom: 40
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  container: {
    textAlign: "center",
    alignContent: "center",
    WebkitBoxAlign: "center",
    MsFlexAlign: "center",
    alignItems: "center",
    display: "flex",
    height: "100vh"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
 
  pos: {
    marginBottom: 12
  },
  btn: {
    width: "40%",
    // textTransform: 'capitalize',
    height: "10vh"
  },
  loginBtn: {
    // align: "center",
    // width: "80%",
    // textTransform: 'capitalize',
    // alignContent: "right",
  },
  container2: {
    // display: "flex",
    // flexWrap: "wrap"
  },
  leftIcon: {
    textAlign: "left",
  },
  button:{
    
  },
  progress: {
    position: "relative",
    margin: "auto",
    display: "block"
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
});

class Forms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // email: "",
      // password: "",
      submitting: false,
      snackbarMessage: "",
      snackbarOpen: false,
      // emailError: false,
      // passwordError: false
    };
  }

  // componentDidMount() {
  //   if (isLoggedIn()) {
  //     window.location.href = "/";
  //   } else {
  //     window.history.pushState({ login: "login" }, "login page", "login");
  //   }
  // }

  handleRequestClose = () => {
    this.setState({ snackbarOpen: false });
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

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

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
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  _handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleSubmit(e);
    }
  };
  render() {
    const { classes } = this.props;
    return (

      
      <MuiThemeProvider theme={theme}>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="error"
            message={this.state.snackbarMessage}
          />
        </Snackbar>
        
        <div >
        <NavigationBar/>
        
        
        <Card className={classes.card} id="card" onKeyPress={this._handleKeyPress}>
        
        <Row align="center">
          <div className="col-md-12" >
          <Typography  component="h1" variant="h2">
          TEST
          </Typography>
          </div>
          <div className="col-md-12">
          <Typography  variant="h4">
          TEST Log in 
          </Typography>
          </div>
          
        </Row>
        
        {this.state.submitting && (
        <CircularProgress className={classes.progress} />
        )}
        
        <Row align="center">
          <div className="col-md-12 col-12" id="LinkedInCol" >
          <Button  variant="contained" id="LinkedInBtn" color="secondary" className={classes.button}>
          Sign up with LinkedIn
          </Button>
          </div>
        </Row>

        {/* <Row>
          <div className="col-md-12 col-12" style={{color:"#707070"}}>
          <p  >
          or sign up with your email address
          </p>
          </div>
        </Row> */}

        <Row>
          <div className="col-md-12 col-12 " align="center">
         
        <div id="SpanLine" >
         <span  id="SpanText">
         or
         </span>
         </div>
         </div>
        </Row>
        
        <Row>
          <div className="col-md-12 ">
          <form
          id="loginForm"
          className={classes.container2}
          autoComplete="off"
          >
          <div className="col-md-12 col-12 textField" >
          <TextField

           id="email"
           name="email"
           label="Email"
           className={classes.textField}
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
                   className={classes.textField}
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
                    id="password"
                    name="password"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    fullWidth
                    onChange={event => this.handlePasswordChange(event)}
                    autoComplete="current-password"
                    margin="normal"
                    error={this.state.passwordError}
                    variant="outlined"
                  />
          </div>

          
                  
                  
                </form>
              </div>
            </Row>

            <Row align="center"> 

            <div className="col-md-12 col-12 ">
          <Button
                  disabled={this.checkEmpty() ? true : false}
                  onClick={event => this.handleSubmit(event)}
                  className={classes.btn}
                  color="primary"
                  variant="contained"
                  id="CreateAccBtn"
                >
                  Create Account
              </Button>
                
              </div>
            </Row>

            

            <Row align="center">
              <div className="col-md-12 col-12" id="haveAccount">
                <p>Already have an account? <a href="#">Login</a></p>
              </div>


            </Row>

              


          </Card>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(Forms);
