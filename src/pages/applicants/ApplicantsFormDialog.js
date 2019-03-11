import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import { BASE_URL } from "../../constants/Constants";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  container: {
    padding: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  halfLength: {
    margin: theme.spacing.unit * 2,
    minWidth: "calc(50% - 32px)"
  },
  fullLength: {
    marginTop: theme.spacing.unit * 2,
    minWidth: "100%"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  uploadInput: {
    display: "none"
  },
  addMargins: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  preview: {
    color: "white",
    maxWidth: "100%",
    width: "120px !important",
    maxHeight: "initial",
    padding: "0px !important",
    paddingTop: "-100% !important",
    position: "relative !important",
    marginBottom: " -40px",
    marginLeft: "20px"
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      ID: null,
      FirstName: "",
      LastName: "",
      Email: "",
      JobID: "",
      CV: "",
      Message: "",
      Job: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }

    if (nextProps.item) {
      this.setState({
        FirstName: nextProps.item.FirstName,
        LastName: nextProps.item.LastName,
        Email: nextProps.item.Email,
        JobID: nextProps.item.JobID,
        CV: nextProps.item.CV,
        Message: nextProps.item.Message,
        Job: nextProps.item.Job[0]
      });
    }
  }

  handleReset = () => {
    this.setState({
      ID: null,
      FirstName: "",
      LastName: "",
      Email: "",
      JobID: "",
      CV: "",
      Message: ""
    });
  };

  handleClose = () => {
    this.handleReset();
    this.props.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.isOpen}
          onClose={() => this.handleClose()}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() => this.handleClose()}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                {this.props.dialogTitle}
              </Typography>
            </Toolbar>
          </AppBar>
          <div>
            <form
              id="departmentForm"
              onSubmit={event => this.handleSubmit(event)}
              className={classes.root}
            >
              <div className={classes.container}>
                <Grid container spacing={24} className={classes.addMargins}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth={true}
                      label="First Name"
                      value={this.state.FirstName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth={true}
                      label="Last Name"
                      value={this.state.LastName}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.addMargins}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth={true}
                      label="Email"
                      value={this.state.Email}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth={true}
                      label="Job"
                      value={this.state.Job.EnglishName}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.addMargins}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    value={this.state.Message}
                  />
                </Grid>
                <Grid container spacing={24} className={classes.addMargins}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      target="_blank"
                      href={BASE_URL + this.state.CV}
                    >
                      Download CV
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  dialogTitle: PropTypes.string.isRequired
};

export default withStyles(styles)(FormDialog);
