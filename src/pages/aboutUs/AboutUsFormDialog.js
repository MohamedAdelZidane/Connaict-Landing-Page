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
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AboutUsFormDialog extends Component {
  state = {
    isOpen: this.props.isOpen,
    ID: null,
    Title_en: "",
    Title_ar: "",
    Description_en: "",
    Description_ar: "",
    IsPublished: true,
    errors:{
      Title_en:[],
      Title_ar:[],
      Description_en:[],
      Description_ar:[]
    }

  };

  componentWillReceiveProps(nextProps) {

    if(nextProps.reset){
      this.handleReset();
    }
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }

    if (nextProps.errors != this.state.errors)
      this.setState({ errors: nextProps.errors });

    let { currAboutUs } = nextProps;
    if(nextProps.currAboutUs){
      this.setState({
        ID: currAboutUs.ID,
        Title_en: currAboutUs.Title_en,
        Title_ar: currAboutUs.Title_ar,
        Description_en: currAboutUs.Description_en,
        Description_ar: currAboutUs.Description_ar,
        IsPublished: currAboutUs.IsPublished
      });
    }else{
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
      IsPublished: true
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
  handleIsPublishedChange = event => {
    let checked = event.target.checked ? 1 : 0;
    this.setState({ IsPublished: checked });
  };

  handleSubmit = event => {
    event.preventDefault();

    let formData = new FormData(document.getElementById("aboutusForm"));
    formData.set("IsPublished", formData.has("IsPublished") ? "1" : "0");


    if (this.state.ID) {
      formData.append("ID", this.state.ID);
      this.props.handleClose();
      this.props.handleUpdateAboutUS(formData);
    } else {
      this.props.handleClose();
      this.props.handleSubmitAboutUs(formData);
    }
  };

  render() {
    const { classes } = this.props;

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
              <Button color="inherit" onClick={this.handleSubmit}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.root}>
            <form id="aboutusForm" action="/" onSubmit={this.handleSubmit}>
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
                    value={this.state.Title_en}
                    onChange={this.handleEnglishTitleChange}
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
                    value={this.state.Title_ar}
                    onChange={this.handleArabicTitleChange}
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
                    value={this.state.Description_en}
                    onChange={this.handleEnglishDescriptionChange}
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
                    value={this.state.Description_ar}
                    onChange={this.handleArabicDescriptionChange}
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="IsPublished"
                        onChange={this.handleIsPublishedChange}
                        checked={this.state.IsPublished == 1 ? true : false}
                      />
                    }
                    label="Published"
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

AboutUsFormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  dialogTitle: PropTypes.string.isRequired,
  aboutus: PropTypes.object
};

export default withStyles(styles)(AboutUsFormDialog);
