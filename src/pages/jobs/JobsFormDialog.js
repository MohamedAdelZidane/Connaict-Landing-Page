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
import TinyMceForm from "../../components/TinyMceForm";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";

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
      departments: [],
      ID: null,
      ArabicName: "",
      EnglishName: "",
      EnglishAbout: "",
      ArabicAbout: "",
      EnglishRequirement: "",
      ArabicRequirement: "",
      IsPublished: false,
      DepartmentID: "",
      errors: {
        ArabicName: [],
        EnglishName: [],
        EnglishAbout: [],
        ArabicAbout: [],
        EnglishRequirement: [],
        ArabicRequirement: [],
        DepartmentID: []
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

    if (nextProps.departments != this.state.departments)
      this.setState({ departments: nextProps.departments });

    if (nextProps.errors != this.state.errors)
      this.setState({ errors: nextProps.errors });

    if (nextProps.item != null) {
      let item = nextProps.item;
      this.setState({
        ID: item.ID,
        ArabicName: item.ArabicName,
        EnglishName: item.EnglishName,
        EnglishAbout: item.EnglishAbout,
        ArabicAbout: item.ArabicAbout,
        EnglishRequirement: item.EnglishRequirement,
        ArabicRequirement: item.ArabicRequirement,
        IsPublished: item.IsPublished,
        DepartmentID: item.DepartmentID
      });
    }
  }

  handleReset = () => {
    this.setState({
      ID: null,
      ArabicName: "",
      EnglishName: "",
      EnglishAbout: "",
      ArabicAbout: "",
      EnglishRequirement: "",
      ArabicRequirement: "",
      IsPublished: false,
      DepartmentID: "",
      errors: {
        ArabicName: [],
        EnglishName: [],
        EnglishAbout: [],
        ArabicAbout: [],
        EnglishRequirement: [],
        ArabicRequirement: [],
        DepartmentID: []
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
    this.setState({ ArabicName: value, errors: errors });
  };

  handleEnglishNameChange = event => {
    let value = event.target.value;
    let errors = this.state.errors;
    if (value == "") errors.EnglishName = ["Please Enter Valid Value"];
    else errors.EnglishName = "";
    this.setState({ EnglishName: value, errors: errors });
  };

  handleArabicAboutChange = value => {
    let errors = this.state.errors;
    if (value == "") errors.ArabicAbout = ["Please Enter Valid Value"];
    else errors.ArabicAbout = "";
    this.setState({ ArabicAbout: value, errors: errors });
  };

  handleEnglishAboutChange = value => {
    let errors = this.state.errors;
    if (value == "") errors.EnglishAbout = ["Please Enter Valid Value"];
    else errors.EnglishAbout = "";
    this.setState({ EnglishAbout: value, errors: errors });
  };

  handleArabicRequirementChange = value => {
    let errors = this.state.errors;
    if (value == "") errors.ArabicRequirement = ["Please Enter Valid Value"];
    else errors.ArabicRequirement = "";
    this.setState({ ArabicRequirement: value, errors: errors });
  };

  handleEnglishRequirementChange = value => {
    let errors = this.state.errors;
    if (value == "") errors.EnglishRequirement = ["Please Enter Valid Value"];
    else errors.EnglishRequirement = "";
    this.setState({ EnglishRequirement: value, errors: errors });
  };

  handlePublishedChange = event => {
    let checked = event.target.checked ? 1 : 0;
    this.setState({ IsPublished: checked });
  };

  handleDepartmentChange = event => {
    let value = event.target.value;
    this.setState({ DepartmentID: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("ArabicName", this.state.ArabicName);
    formData.append("EnglishName", this.state.EnglishName);
    formData.append("ArabicAbout", this.state.ArabicAbout);
    formData.append("EnglishAbout", this.state.EnglishAbout);
    formData.append("ArabicRequirement", this.state.ArabicRequirement);
    formData.append("EnglishRequirement", this.state.EnglishRequirement);
    formData.append("IsPublished", this.state.IsPublished);
    formData.append("DepartmentID", this.state.DepartmentID);
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
    const {
      ArabicName,
      EnglishName,
      ArabicAbout,
      EnglishAbout,
      ArabicRequirement,
      EnglishRequirement
    } = this.state;
    if (
      ArabicName === "" ||
      EnglishName === "" ||
      ArabicAbout === "" ||
      EnglishAbout === "" ||
      ArabicRequirement === "" ||
      EnglishRequirement === ""
    ) {
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
                        this.state.errors.ArabicName[0]
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
                        this.state.errors.EnglishName[0]
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.addMargins}>
                  <Grid item xs={6}>
                    <TextField
                      select
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      fullWidth={true}
                      label="Department"
                      value={this.state.DepartmentID}
                      onChange={event => this.handleDepartmentChange(event)}
                      error={
                        this.state.errors.DepartmentID &&
                        this.state.errors.DepartmentID.length > 0
                      }
                      helperText={
                        this.state.errors.DepartmentID &&
                        this.state.errors.DepartmentID[0]
                      }
                    >
                      <MenuItem value="">Please Select Department</MenuItem>
                      {this.state.departments.map(department => {
                        return (
                          <MenuItem
                            key={department.ID}
                            value={department.ID}
                            selected={this.state.DepartmentID == department.ID}
                          >
                            {department.EnglishName}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="IsPublished"
                          onChange={this.handlePublishedChange}
                          checked={this.state.IsPublished == 1 ? true : false}
                        />
                      }
                      label="IsPublished"
                    />
                  </Grid>
                </Grid>
                <TinyMceForm
                  title="Arabic About"
                  data={this.state.ArabicAbout}
                  handleChange={this.handleArabicAboutChange}
                  error={
                    this.state.errors.ArabicAbout &&
                    this.state.errors.ArabicAbout.length > 0
                  }
                  helperText={
                    this.state.errors.ArabicAbout &&
                    this.state.errors.ArabicAbout[0]
                  }
                />
                <TinyMceForm
                  title="English About"
                  data={this.state.EnglishAbout}
                  handleChange={this.handleEnglishAboutChange}
                  error={
                    this.state.errors.EnglishAbout &&
                    this.state.errors.EnglishAbout.length > 0
                  }
                  helperText={
                    this.state.errors.EnglishAbout &&
                    this.state.errors.EnglishAbout[0]
                  }
                />
                <TinyMceForm
                  title="Arabic Requirement"
                  data={this.state.ArabicRequirement}
                  handleChange={this.handleArabicRequirementChange}
                  error={
                    this.state.errors.ArabicRequirement &&
                    this.state.errors.ArabicRequirement.length > 0
                  }
                  helperText={
                    this.state.errors.ArabicRequirement &&
                    this.state.errors.ArabicRequirement[0]
                  }
                />
                <TinyMceForm
                  title="English Requirement"
                  data={this.state.EnglishRequirement}
                  handleChange={this.handleEnglishRequirementChange}
                  error={
                    this.state.errors.EnglishRequirement &&
                    this.state.errors.EnglishRequirement.length > 0
                  }
                  helperText={
                    this.state.errors.EnglishRequirement &&
                    this.state.errors.EnglishRequirement[0]
                  }
                />
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
