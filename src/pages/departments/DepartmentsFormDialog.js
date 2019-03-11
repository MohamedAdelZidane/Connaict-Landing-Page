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

class DepartmentsFormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      ID: null,
      ArabicName: "",
      EnglishName: "",
      errors: {
        ArabicName: [],
        EnglishName: []
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.handleReset();
    }

    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }

    if (nextProps.errors != this.state.errors)
      this.setState({ errors: nextProps.errors });

    if (nextProps.department != null) {
      let department = nextProps.department;
      this.setState({
        ID: department.ID,
        ArabicName: department.ArabicName,
        EnglishName: department.EnglishName
      });
    }
  }

  handleReset = () => {
    this.setState({
      ID: null,
      ArabicName: "",
      EnglishName: "",
      errors: {
        ArabicName: [],
        EnglishName: []
      }
    });
  };
  handleClose = () => {
    this.props.handleClose();
  };

  handleArabicNameChange = event => {
    let value = event.target.value;
    let errors = this.state.errors;
    if (value == "") errors.ArabicName = ["Please Enter Valid Value"];
    else errors.ArabicName = "";
    this.setState({ ArabicName: value });
  };

  handleEnglishNameChange = event => {
    let value = event.target.value;
    let errors = this.state.errors;
    if (value == "") errors.EnglishName = ["Please Enter Valid Value"];
    else errors.EnglishName = "";
    this.setState({ EnglishName: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("ArabicName", this.state.ArabicName);
    formData.append("EnglishName", this.state.EnglishName);
    if (this.state.ID) {
      formData.append("ID", this.state.ID);
      this.props.handleUpdate(formData);
    } else {
      this.props.handleAdd(formData);
    }
    this.handleClose();
  };

  render() {
    const { classes } = this.props;

    let disabled = false;
    const { ArabicName, EnglishName } = this.state;
    if (ArabicName === "" || EnglishName === "") {
      disabled = true;
    }
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
              <Button
                color="inherit"
                onClick={event => this.handleSubmit(event)}
                disabled={disabled}
              >
                save
              </Button>
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
                      label="Arabic Name"
                      value={this.state.ArabicName}
                      onChange={event => this.handleArabicNameChange(event)}
                      error={
                        this.state.errors.ArabicName &&
                        this.state.errors.ArabicName.length > 0
                      }
                      helperText={
                        this.state.errors.ArabicName &&
                        this.props.errors.ArabicName[0]
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth={true}
                      label="English Name"
                      value={this.state.EnglishName}
                      onChange={event => this.handleEnglishNameChange(event)}
                      error={
                        this.state.errors.EnglishName &&
                        this.state.errors.EnglishName.length > 0
                      }
                      helperText={
                        this.state.errors.EnglishName &&
                        this.props.errors.EnglishName[0]
                      }
                    />
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

DepartmentsFormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  dialogTitle: PropTypes.string.isRequired
};

export default withStyles(styles)(DepartmentsFormDialog);
