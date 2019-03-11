import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { isImage, isDocument } from "../../components/FileValidation";
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
    paddingLeft: theme.spacing.unit * 20,
    paddingRight: theme.spacing.unit * 20
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  uploadInput: {
    display: "none"
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DownloadsFormDialog extends Component {
  state = {
    isOpen: this.props.isOpen,
    ID: null,
    Title_en: "",
    Title_ar: "",
    Description_en: "",
    Description_ar: "",
    file: "",
    uploadedFile: null,
    IsActive: true,
    errors: {
      Title_en: [],
      Title_ar: [],
      file: [],
      Description_en: [],
      Description_ar: []
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.reset) {
      this.handleReset();
    }
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }

    if (nextProps.errors != this.state.errors)
      this.setState({ errors: nextProps.errors });

    let { download } = nextProps;
    if (nextProps.download) {
      this.setState({
        ID: download.ID,
        Title_en: download.Title_en,
        Title_ar: download.Title_ar,
        Description_en: download.Description_en,
        Description_ar: download.Description_ar,
        file: download.file,
        IsActive: download.IsActive
      });
    } else {
      this.handleReset();
    }
  }
  handleReset = () => {
    this.setState({
      ID: null,
      Title_en: "",
      Title_ar: "",
      Description_en: "",
      Description_ar: "",
      IsActive: true,
      file: ""
    });
  };

  handleClose = () => {
    this.setState({ isOpen: false }, () => {
      this.props.handleClose();
    });
  };

  handleEnglishTitleChange = event => {
    // this.setState({ Title_en:  event.target.value });
    let value = event.target.value;
    let errors = this.state.errors;
    if (value == "") errors.Title_en = ["Please Enter Valid Value"];
    else errors.Title_en = "";
    this.setState({ Title_en: value });
  };

  handleArabicTitleChange = event => {
    // this.setState({ Title_ar:  event.target.value });
    let value = event.target.value;
    let errors = this.state.errors;
    if (value == "") errors.Title_ar = ["Please Enter Valid Value"];
    else errors.Title_ar = "";
    this.setState({ Title_ar: value });
  };

  handleEnglishDescriptionChange = event => {
    // this.setState({ Description_en:  event.target.value });
    let value = event.target.value;
    let errors = this.state.errors;
    if (value == "") errors.Description_en = ["Please Enter Valid Value"];
    else errors.Description_en = "";
    this.setState({ Description_en: value });
  };

  handleArabicDescriptionChange = event => {
    // this.setState({ Description_ar:  event.target.value });
    let value = event.target.value;
    let errors = this.state.errors;
    if (value == "") errors.Description_ar = ["Please Enter Valid Value"];
    else errors.Description_ar = "";
    this.setState({ Description_ar: value });
  };

  handleFileChange = event => {
    let file = event.target.files[0];
    let errors = this.state.errors;
    if (file) {
      if (isImage(file) || isDocument(file)) {
        errors.Image = [];
        this.setState({ file: file, uploadedFile: file });
      } else {
        errors.Image = ["Please Upload Valid Image/Documet"];
      }
    } else {
      errors.Image = ["Nothing is Uploaded"];
    }
  };

  handleIsActiveChange = event => {
    let checked = event.target.checked ? 1 : 0;
    this.setState({ IsActive: checked });
  };

  handleSubmit = event => {
    event.preventDefault();

    let formData = new FormData(document.getElementById("downloadsForm"));
    formData.set("IsActive", formData.has("IsActive") ? "1" : "0");
    if (this.state.uploadedFile)
      formData.append("file", this.state.uploadedFile);
    if (this.state.ID) {
      formData.append("ID", this.state.ID);
      this.props.handleClose();
      this.props.handleUpdateDownload(formData);
    } else {
      this.props.handleClose();
      this.props.handleSubmitDownload(formData);
    }
  };

  render() {
    const { classes } = this.props;
    let disabled = false;
    const { Title_en, Title_ar, Description_en, Description_ar } = this.state;
    if (
      Title_en === "" ||
      Title_ar === "" ||
      Description_en === "" ||
      Description_ar === ""
    ) {
      disabled = true;
    }

    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.isOpen}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
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
                // disabled={disabled}
                onClick={this.handleSubmit}
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.root}>
            <form id="downloadsForm" action="/" onSubmit={this.handleSubmit}>
              <Grid container spacing={24} className={classes.container}>
                <Grid item lg={6} md={6} xs={12}>
                  <TextField
                    id="Title_en"
                    name="Title_en"
                    label="Title English"
                    placeholder="Title English"
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                    onChange={this.handleEnglishTitleChange}
                    value={this.state.Title_en}
                    error={
                      this.state.errors.Title_en &&
                      this.state.errors.Title_en.length > 0
                    }
                    helperText={
                      this.state.errors.Title_en &&
                      this.state.errors.Title_en[0]
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <TextField
                    id="Title_ar"
                    name="Title_ar"
                    label="Title Arabic"
                    placeholder="Title Arabic"
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                    onChange={this.handleArabicTitleChange}
                    value={this.state.Title_ar}
                    error={
                      this.state.errors.Title_ar &&
                      this.state.errors.Title_ar.length > 0
                    }
                    helperText={
                      this.state.errors.Title_ar &&
                      this.state.errors.Title_ar[0]
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <TextField
                    id="Description_en"
                    name="Description_en"
                    label="Description English"
                    placeholder="Description English"
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                    onChange={this.handleEnglishDescriptionChange}
                    value={this.state.Description_en}
                    error={
                      this.state.errors.Description_en &&
                      this.state.errors.Description_en.length > 0
                    }
                    helperText={
                      this.state.errors.Description_en &&
                      this.state.errors.Description_en[0]
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <TextField
                    id="Description_ar"
                    name="Description_ar"
                    label="Description Arabic"
                    placeholder="Description Arabic"
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                    onChange={this.handleArabicDescriptionChange}
                    value={this.state.Description_ar}
                    error={
                      this.state.errors.Description_ar &&
                      this.state.errors.Description_ar.length > 0
                    }
                    helperText={
                      this.state.errors.Description_ar &&
                      this.state.errors.Description_ar[0]
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <input
                    accept="*"
                    className={classes.uploadInput}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={event => this.handleFileChange(event)}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="extendedFab"
                      component="span"
                      className={classes.buttonUpload}
                      color="secondary"
                    >
                      Upload File
                    </Button>
                  </label>
                  {this.state.errors.file && (
                    <Typography variant="subheading" gutterBottom color="error">
                      {this.state.errors.file[0]}
                    </Typography>
                  )}
                </Grid>
                {this.state.ID && (
                  <Grid item lg={6} md={6} xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      target="_blank"
                      href={BASE_URL + this.state.file}
                    >
                      Download
                    </Button>
                  </Grid>
                )}
                <Grid item lg={6} md={6} xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="IsActive"
                        onChange={this.handleIsActiveChange}
                        checked={this.state.IsActive == 1 ? true : false}
                      />
                    }
                    label="Active"
                  />
                </Grid>
              </Grid>
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}

DownloadsFormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  dialogTitle: PropTypes.string.isRequired,
  download: PropTypes.object
};

export default withStyles(styles)(DownloadsFormDialog);
