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
import TinyMceForm from "../../components/TinyMceForm";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import ImageUploader from "../../components/ImageUploader";
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

  halfLength: {
    margin: theme.spacing.unit * 2,
    minWidth: "calc(50% - 32px)"
  },
  fullLength: {
    marginTop: theme.spacing.unit * 2,
    minWidth: "100%"
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
  addMargins: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ProductsFormDialog extends Component {
  state = {
    isOpen: false,
    ID: null,
    ArabicName: "",
    EnglishName: "",
    ArabicDescription: "",
    EnglishDescription: "",
    SortNumber: 0,
    IsPublished: false,
    IsFeatured: false,
    Image: "",
    AllImages: [],
    BrandID: "",
    CategoryID: "",
    uploadedImage: null,
    categories: [],
    brands: [],
    removedImages: [],
    errors: {
      ArabicName: [],
      EnglishName: [],
      SortNumber: [],
      Image: [],
      CategoryID: [],
      BrandID: [],
      ArabicDescription: [],
      EnglishDescription: []
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

    if (nextProps.categories != this.state.categories)
      this.setState({ categories: nextProps.categories });

    if (nextProps.brands != this.state.brands)
      this.setState({ brands: nextProps.brands });

    if (nextProps.errors != this.state.errors)
      this.setState({ errors: nextProps.errors });

    if (nextProps.product != null) {
      let product = nextProps.product;
      let AllImages = [];
      if (product.AllImages && product.AllImages.length > 0) {
        product.AllImages.forEach((singeImage, index) => {
          let item = {
            ID: singeImage.ID,
            name: "ProductImage_" + (index + 1),
            src: BASE_URL + singeImage.Image
          };
          AllImages.push(item);
        });
      }
      this.setState({
        ID: product.ID,
        BrandID: product.BrandID,
        CategoryID: product.CategoryID,
        ArabicName: product.ArabicName,
        EnglishName: product.EnglishName,
        ArabicDescription: product.ArabicDescription,
        EnglishDescription: product.EnglishDescription,
        SortNumber: product.SortNumber,
        IsPublished: product.IsPublished,
        IsFeatured: product.IsFeatured,
        Image: product.Image,
        AllImages: AllImages
      });
    } else {
      this.handleReset();
    }
  }

  handleReset = () => {
    this.setState({
      ID: null,
      ArabicName: "",
      EnglishName: "",
      BrandID: "",
      CategoryID: "",
      ArabicDescription: "",
      EnglishDescription: "",
      SortNumber: 0,
      IsPublished: false,
      IsFeatured: false,
      Image: "",
      AllImages: [],
      removedImages: [],
      uploadedImage: null
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

  handleArabicDescriptionChange = value => {
    this.setState({ ArabicDescription: value });
  };

  handleEnglishDescriptionChange = value => {
    this.setState({ EnglishDescription: value });
  };

  handleCategoryChange = event => {
    let value = event.target.value;
    this.setState({ CategoryID: value });
  };

  handleBrandChange = event => {
    let value = event.target.value;
    this.setState({ BrandID: value });
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
    let file = event.target.files[0];
    let errors = this.state.errors;
    if (file) {
      if (isImage(file)) {
        errors.Image = [];
        this.setState({
          Image: file,
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

  handleAllImagesChange = images => {
    this.setState({ AllImages: images });
  };

  handlePublishedChange = event => {
    let checked = event.target.checked ? 1 : 0;
    this.setState({ IsPublished: checked });
  };

  handleFeaturedChange = event => {
    let checked = event.target.checked ? 1 : 0;
    this.setState({ IsFeatured: checked });
  };

  handleRemoveClicked = index => {
    let AllImages = this.state.AllImages;
    let removedImage = AllImages[index];
    if (removedImage.src) {
      let removedImages = this.state.removedImages;
      removedImages.push(removedImage.ID);
      this.setState({ removedImages: removedImages });
    }
    AllImages.splice(index, 1);
    this.setState({ AllImages: AllImages });
  };

  handleSubmit = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("ArabicName", this.state.ArabicName);
    formData.append("EnglishName", this.state.EnglishName);
    formData.append("ArabicDescription", this.state.ArabicDescription);
    formData.append("EnglishDescription", this.state.EnglishDescription);
    formData.append("SortNumber", this.state.SortNumber);
    formData.append("IsPublished", this.state.IsPublished);
    formData.append("IsFeatured", this.state.IsFeatured);
    formData.append("CategoryID", this.state.CategoryID);
    formData.append("BrandID", this.state.BrandID);

    if (this.state.removedImages.length > 0) {
      formData.append(
        "RemovedImages",
        JSON.stringify(this.state.removedImages)
      );
    }
    if (this.state.AllImages && this.state.AllImages.length > 0) {
      this.state.AllImages.forEach(singleImage => {
        if (!singleImage.src) {
          formData.append("AllImages[]", singleImage);
        }
      });
    }
    if (this.state.uploadedImage) {
      console.log(this.state.uploadedImage);
      formData.append("Image", this.state.uploadedImage);
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

    let disabled = false;
    const {
      ArabicName,
      EnglishName,
      ArabicDescription,
      EnglishDescription,
      CategoryID,
      BrandID
    } = this.state;
    if (
      ArabicName === "" ||
      EnglishName === "" ||
      ArabicDescription === "" ||
      EnglishDescription === "" ||
      CategoryID === "" ||
      BrandID === ""
    ) {
      disabled = true;
    }

    let mainImage = "";
    if (this.state.uploadedImage)
      mainImage = URL.createObjectURL(this.state.uploadedImage);
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
                disabled={disabled}
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div>
            <form
              id="productForm"
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
                        this.state.errors.SortNumber[0]
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu
                        }
                      }}
                      fullWidth={true}
                      label="Category"
                      value={this.state.CategoryID}
                      onChange={event => this.handleCategoryChange(event)}
                      error={
                        this.state.errors.CategoryID &&
                        this.state.errors.CategoryID.length > 0
                      }
                      helperText={
                        this.state.errors.CategoryID &&
                        this.state.errors.CategoryID[0]
                      }
                    >
                      <MenuItem value="">Please Select Category</MenuItem>
                      {this.state.categories.map(category => {
                        return (
                          <MenuItem
                            key={category.ID}
                            value={category.ID}
                            selected={category.ID == this.state.CategoryID}
                          >
                            {category.EnglishName}
                          </MenuItem>
                        );
                      })}
                    </TextField>
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
                      label="Brand"
                      value={this.state.BrandID}
                      onChange={event => this.handleBrandChange(event)}
                      error={
                        this.state.errors.BrandID &&
                        this.state.errors.BrandID.length > 0
                      }
                      helperText={
                        this.state.errors.BrandID &&
                        this.state.errors.BrandID[0]
                      }
                    >
                      <MenuItem>Please Select Brand</MenuItem>
                      {this.state.brands.map(brand => {
                        return (
                          <MenuItem
                            key={brand.ID}
                            value={brand.ID}
                            selected={this.state.BrandID == brand.ID}
                          >
                            {brand.EnglishName}
                          </MenuItem>
                        );
                      })}
                    </TextField>
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
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="IsFeatured"
                          onChange={this.handleFeaturedChange}
                          checked={this.state.IsFeatured == 1 ? true : false}
                        />
                      }
                      label="IsFeatured"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.addMargins}>
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
                      >
                        {this.state.errors.Image[0]}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
                <Typography variant="subheading" gutterBottom>
                  Upload Product Pictures
                </Typography>
                <ImageUploader
                  multiple={true}
                  images={this.state.AllImages}
                  handleImagesUpload={this.handleAllImagesChange}
                  handleRemoveClicked={this.handleRemoveClicked}
                />
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
                    this.state.errors.ArabicDescription[0]
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
                    this.state.errors.EnglishDescription[0]
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

ProductsFormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  dialogTitle: PropTypes.string.isRequired
};

export default withStyles(styles)(ProductsFormDialog);
