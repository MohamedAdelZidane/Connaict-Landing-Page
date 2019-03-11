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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
    paddingLeft: theme.spacing.unit * 20,
    paddingRight: theme.spacing.unit * 20
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
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
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class NewsFormDialog extends Component {
  state = {
    isOpen: this.props.isOpen,
    ID: null,
    Title_en: "",
    Title_ar: "",
    Description_en: "",
    Description_ar: "",
    IsActive: true,
    Image: "",
    imageUpload: "",
    PublishDate: "",
    errors: {
      Title_en: [],
      Title_ar: [],
      Image: [],
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

      if (nextProps.errors != this.state.errors)
        this.setState({ errors: nextProps.errors });
    }

    let { news } = nextProps;

    if (nextProps.news) {
      this.setState({
        ID: news.ID,
        Title_en: news.Title_en,
        Title_ar: news.Title_ar,
        Description_en: news.Description_en,
        Description_ar: news.Description_ar,
        IsActive: news.IsActive,
        Image: news.Image,
        PublishDate: news.PublishDate
      });
    } else {
      this.handleReset();
    }
    // this.setState({
    //   ID: news !== null ? news.ID : null,
    //   Title_en: news !== null ? news.Title_en : "",
    //   Title_ar: news !== null ? news.Title_ar : "",
    //   Description_en: news !== null ? news.Description_en : "",
    //   Description_ar: news !== null ? news.Description_ar : "",
    //   IsActive: news !== null ? news.IsActive : true,
    //   Image: news !== null ? news.Image : "",
    //   PublishDate: news !== null ? news.PublishDate : ""
    // });
  }

  handleReset = () => {
    this.setState({
      ID: null,
      Title_en: "",
      Title_ar: "",
      Description_en: "",
      Description_ar: "",
      IsActive: true,
      Image: "",
      PublishDate: "",
      imageUpload: ""
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

  handlePublishDateChange = event => {
    this.setState({ PublishDate: event.target.value });
  };

  handleImageChange = event => {
    let errors = this.state.errors;
    let file = event.target.files[0];
    if (file) {
      if (isImage(file)) {
        errors.Image = [];
        this.setState({
          Image: file,
          imageUpload: URL.createObjectURL(file)
        });
      } else {
        errors.Image = ["Please Upload Valid Image"];
      }
    } else {
      errors.Image = ["Nothing is Uploaded"];
    }
    this.setState({ errors: errors });
  };

  handleIsActiveChange = event => {
    let checked = event.target.checked ? 1 : 0;
    this.setState({ IsActive: checked });
  };

  handleSubmit = event => {
    event.preventDefault();

    let formData = new FormData(document.getElementById("newsForm"));
    formData.append("Image", this.state.Image);
    if (this.state.imageUpload) formData.append("Image", this.state.Image);
    formData.set("IsActive", formData.has("IsActive") ? "1" : "0");

    if (this.state.ID) {
      formData.append("ID", this.state.ID);
      this.props.handleClose();
      this.props.handleUpdateNews(formData);
    } else {
      this.props.handleClose();
      this.props.handleSubmitNews(formData);
    }
  };

  render() {
    const { classes } = this.props;
    let mainImage = "";
    if (this.state.imageUpload) mainImage = this.state.imageUpload;
    else if (this.state.Image) mainImage = BASE_URL + this.state.Image;
    else mainImage = mainImage = "temp.png";

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
                disabled={disabled}
                onClick={this.handleSubmit}
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.root}>
            <form id="newsForm" action="/" onSubmit={this.handleSubmit}>
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
                      this.props.errors.Title_en[0]
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
                      this.props.errors.Title_ar[0]
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
                      this.props.errors.Description_en[0]
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
                      this.props.errors.Description_ar[0]
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
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
                <Grid item lg={6} md={6} xs={12}>
                  <TextField
                    id="PublishDate"
                    name="PublishDate"
                    label="PublishDate"
                    placeholder="yyyy-MM-dd"
                    className={classes.textField}
                    type="datetime-local"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    onChange={this.handlePublishDateChange}
                    value={this.state.PublishDate}
                  />
                </Grid>
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

NewsFormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  dialogTitle: PropTypes.string.isRequired,
  news: PropTypes.object
};

export default withStyles(styles)(NewsFormDialog);
