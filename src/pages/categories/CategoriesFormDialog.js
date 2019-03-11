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
import MenuItem from "@material-ui/core/MenuItem";
import TinyMceForm from "../../components/TinyMceForm";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { BASE_URL } from "../../constants/Constants.js";
import { isImage } from "../../components/FileValidation";

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
  },
  uploadInput: {
    display: "none"
  },
  imageError: {
    marginTop: theme.spacing.unit * 3
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CategoriesFormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      categories: [],
      ID: null,
      ArabicName: "",
      EnglishName: "",
      ArabicDescription: "",
      EnglishDescription: "",
      SortNumber: 0,
      Image: "",
      uploadedImage: "",
      IsPublished: false,
      ParentID: "",
      errors: {
        ArabicName: [],
        EnglishName: [],
        SortNumber: [],
        Image: [],
        ParentID: [],
        ArabicDescription: [],
        EnglishDescription: []
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

    if (nextProps.categories != this.state.categories)
      this.setState({ categories: nextProps.categories });

    if (nextProps.category != null) {
      let category = nextProps.category;
      this.setState({
        ID: category.ID,
        ArabicName: category.ArabicName,
        EnglishName: category.EnglishName,
        ArabicDescription: category.ArabicDescription,
        EnglishDescription: category.EnglishDescription,
        SortNumber: category.SortNumber,
        Image: category.Image,
        IsPublished: category.IsPublished,
        ParentID: category.ParentID
      });
    }
  }

  handleReset = () => {
    this.setState({
      ID: null,
      ArabicName: "",
      EnglishName: "",
      ArabicDescription: "",
      EnglishDescription: "",
      SortNumber: 0,
      IsPublished: false,
      Image: "",
      uploadedImage: "",
      ParentID: ""
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

  handleArabicDescriptionChange = value => {
    this.setState({ ArabicDescription: value });
  };

  handleEnglishDescriptionChange = value => {
    this.setState({ EnglishDescription: value });
  };

  handleParentChange = event => {
    let value = event.target.value;
    this.setState({ ParentID: value });
  };

  handleSortNumberChange = event => {
    let value = event.target.value;
    if (value > 0) this.setState({ SortNumber: value });
    else {
      let errors = this.state.errors;
      errors.SortNumber = ["Sort number must be more than or equal 0"];
      this.setState({ errors: errors });
    }
  };

  handleImageChange = event => {
    let errors = this.state.errors;
    let file = event.target.files[0];
    if (file) {
      if (isImage(file)) {
        errors.Image = [];
        this.setState({
          Image: file,
          uploadedImage: URL.createObjectURL(file)
        });
      } else {
        errors.Image = ["Please Upload Valid Image"];
      }
    } else {
      errors.Image = ["Nothing is Uploaded"];
    }
    this.setState({ errors: errors });
  };

  handlePublishedChange = event => {
    let checked = event.target.checked ? 1 : 0;
    this.setState({ IsPublished: checked });
  };

  handleSubmit = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("ArabicName", this.state.ArabicName);
    formData.append("EnglishName", this.state.EnglishName);
    formData.append("ArabicDescription", this.state.ArabicDescription);
    formData.append("EnglishDescription", this.state.EnglishDescription);
    formData.append("SortNumber", this.state.SortNumber);
    formData.append("Image", this.state.Image);
    if (this.state.uploadedImage)
      formData.append("Image", this.state.uploadedImage);
    formData.append("IsPublished", this.state.IsPublished);
    if (this.state.ParentID) formData.append("ParentID", this.state.ParentID);
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
    if (this.state.uploadedImage) mainImage = this.state.uploadedImage;
    else if (this.state.Image) mainImage = BASE_URL + this.state.Image;
    else mainImage = mainImage = "temp.png";
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
                disabled={false}
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div>
            <form
              id="categoryForm"
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
                      label="Parent Category"
                      value={this.state.ParentID}
                      onChange={event => this.handleParentChange(event)}
                      error={
                        this.state.errors.ParentID &&
                        this.state.errors.ParentID.length > 0
                      }
                      helperText={
                        this.props.errors.ParentID &&
                        this.props.errors.ParentID[0]
                      }
                    >
                      <MenuItem value="">
                        Please Select Parent if exists
                      </MenuItem>
                      {this.state.categories.map(category => {
                        if (category.ID != this.state.ID)
                          return (
                            <MenuItem
                              key={category.ID}
                              value={category.ID}
                              selected={this.state.ParentID == category.ID}
                            >
                              {category.EnglishName}
                            </MenuItem>
                          );
                      })}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth={true}
                      label="Sort Number"
                      type="number"
                      value={this.state.SortNumber}
                      onChange={event => this.handleSortNumberChange(event)}
                      error={
                        this.state.errors.SortNumber &&
                        this.state.errors.SortNumber.length > 0
                      }
                      helperText={
                        this.state.errors.SortNumber &&
                        this.props.errors.SortNumber[0]
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
                </Grid>
                <Grid container spacing={24} className={classes.addMargins}>
                  <Grid item xs={6}>
                    <input
                      accept="image/*"
                      className={classes.uploadInput}
                      id="contained-button-file"
                      multiple
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
                    {this.props.errors.Image && (
                      <Typography
                        variant="subheading"
                        gutterBottom
                        color="error"
                        className={classes.imageError}
                      >
                        {this.props.errors.Image[0]}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <TinyMceForm
                  title="Arabic Description"
                  data={this.state.ArabicDescription}
                  handleChange={this.handleArabicDescriptionChange}
                  error={
                    this.state.errors.ArabicDescription &&
                    this.state.errors.ArabicDescription.length > 0
                  }
                  helperText={
                    this.state.errors.ArabicDescription &&
                    this.props.errors.ArabicDescription[0]
                  }
                />
                <TinyMceForm
                  title="English Description"
                  data={this.state.EnglishDescription}
                  handleChange={this.handleEnglishDescriptionChange}
                  error={
                    this.state.errors.EnglishDescription &&
                    this.state.errors.EnglishDescription.length > 0
                  }
                  helperText={
                    this.state.errors.EnglishDescription &&
                    this.props.errors.EnglishDescription[0]
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

CategoriesFormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  dialogTitle: PropTypes.string.isRequired
};

export default withStyles(styles)(CategoriesFormDialog);
