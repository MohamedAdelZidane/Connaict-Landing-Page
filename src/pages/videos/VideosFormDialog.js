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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { isImage } from "../../components/FileValidation";
import { BASE_URL } from "../../constants/Constants.js";

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
      ArabicTitle: "",
      EnglishTitle: "",
      SortNumber: 0,
      Source: "",
      Thumbnail: "",
      IsPublished: false,
      uploadedImage: "",
      errors: {
        ArabicTitle: [],
        EnglishTitle: [],
        SortNumber: [],
        Source: [],
        Thumbnail: []
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

    if (nextProps.item != null) {
      let item = nextProps.item;
      this.setState({
        ID: item.ID,
        ArabicTitle: item.ArabicTitle,
        EnglishTitle: item.EnglishTitle,
        SortNumber: item.SortNumber,
        Source: item.Source,
        Thumbnail: item.Thumbnail,
        IsPublished: item.IsPublished
      });
    }
  }

  handleReset = () => {
    this.setState({
      ID: null,
      ArabicTitle: "",
      EnglishTitle: "",
      SortNumber: 0,
      Source: "",
      Thumbnail: "",
      IsPublished: false,
      errors: {
        ArabicTitle: [],
        EnglishTitle: [],
        SortNumber: [],
        Source: [],
        Thumbnail: []
      }
    });
  };

  handleClose = () => {
    this.props.handleClose();
  };

  handleArabicTitleChange = event => {
    let value = event.target.value;
    let errors = this.state.errors;
    if (value == "") errors.ArabicTitle = ["Please Enter Valid Value"];
    else errors.ArabicTitle = "";
    this.setState({ ArabicTitle: value, errors: errors });
  };

  handleEnglishTitleChange = event => {
    let value = event.target.value;
    let errors = this.state.errors;
    if (value == "") errors.EnglishTitle = ["Please Enter Valid Value"];
    else errors.EnglishTitle = "";
    this.setState({ EnglishTitle: value, errors: errors });
  };

  handleSourceChange = event => {
    let value = event.target.value;
    let errors = this.state.errors;
    if (value == "") errors.Source = ["Please Enter Valid Value"];
    else errors.Source = "";
    this.setState({ Source: value, errors: errors });
  };

  handleSortNumberChange = event => {
    let value = event.target.value;
    let errors = this.state.errors;
    if (value == "") errors.SortNumber = ["Please Enter Valid Value"];
    else if (value <= 0) {
      errors.SortNumber = ["Sort number must be greater than 0 "];
      value = 1;
    } else errors.SortNumber = "";
    this.setState({ SortNumber: value, errors: errors });
  };

  handlePublishedChange = event => {
    let checked = event.target.checked ? 1 : 0;
    this.setState({ IsPublished: checked });
  };

  handleImageChange = event => {
    let errors = this.state.errors;
    let file = event.target.files[0];
    if (file) {
      if (isImage(file)) {
        errors.Image = [];
        this.setState({
          Thumbnail: file,
          uploadedImage: file
        });
      } else {
        errors.Image = ["Please Upload Valid Image"];
      }
    } else {
      errors.Image = ["Nothing is Uploaded"];
    }
    this.setState({ errors: errors });
  };

  handleSubmit = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("ArabicTitle", this.state.ArabicTitle);
    formData.append("EnglishTitle", this.state.EnglishTitle);
    formData.append("SortNumber", this.state.SortNumber);
    formData.append("IsPublished", this.state.IsPublished);
    formData.append("Source", this.state.Source);
    if (this.state.uploadedImage) {
      formData.append("Thumbnail", this.state.uploadedImage);
    }
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
    let mainImage = "";
    if (this.state.uploadedImage)
      mainImage = URL.createObjectURL(this.state.uploadedImage);
    else if (this.state.Thumbnail) mainImage = BASE_URL + this.state.Thumbnail;
    else mainImage = mainImage = "temp.png";

    let disabled = false;
    const { ArabicTitle, EnglishTitle, Source, Thumbnail } = this.state;
    if (
      ArabicTitle === "" ||
      EnglishTitle === "" ||
      Source === "" ||
      Thumbnail === ""
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
              id="VideosForm"
              onSubmit={event => this.handleSubmit(event)}
              className={classes.root}
            >
              <div className={classes.container}>
                <Grid container spacing={24} className={classes.addMargins}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth={true}
                      label="Arabic Title"
                      value={this.state.ArabicTitle}
                      onChange={event => this.handleArabicTitleChange(event)}
                      error={
                        this.state.errors.ArabicTitle &&
                        this.state.errors.ArabicTitle.length > 0
                      }
                      helperText={
                        this.state.errors.ArabicTitle &&
                        this.state.errors.ArabicTitle[0]
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth={true}
                      label="English Title"
                      value={this.state.EnglishTitle}
                      onChange={event => this.handleEnglishTitleChange(event)}
                      error={
                        this.state.errors.EnglishTitle &&
                        this.state.errors.EnglishTitle.length > 0
                      }
                      helperText={
                        this.state.errors.EnglishTitle &&
                        this.state.errors.EnglishTitle[0]
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.addMargins}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth={true}
                      label="Sort Number"
                      type="number"
                      min="0"
                      value={this.state.SortNumber}
                      onChange={event => this.handleSortNumberChange(event)}
                      error={
                        this.state.errors.SortNumber &&
                        this.state.errors.SortNumber.length > 0
                      }
                      helperText={
                        this.state.errors.SortNumber &&
                        this.state.errors.SortNumber[0]
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth={true}
                      label="Video Source"
                      value={this.state.Source}
                      onChange={event => this.handleSourceChange(event)}
                      error={
                        this.state.errors.Source &&
                        this.state.errors.Source.length > 0
                      }
                      helperText={
                        this.state.errors.Source && this.state.errors.Source[0]
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.addMargins}>
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
                  <Grid item xs={6}>
                    <input
                      accept="image/*"
                      className={classes.uploadInput}
                      id="contained-button-file"
                      type="file"
                      onChange={event => this.handleImageChange(event)}
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="extendedFab"
                        component="span"
                        className={classes.buttonUpload}
                        color="secondary"
                      >
                        Upload Image
                      </Button>
                    </label>
                    <img className={classes.preview} src={mainImage} />
                    {this.state.errors.Image && (
                      <Typography
                        variant="subheading"
                        gutterBottom
                        color="error"
                        className={classes.imageError}
                      >
                        {this.state.errors.Image[0]}
                      </Typography>
                    )}
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
