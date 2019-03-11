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

class FaqFormDialog extends Component {
  state = {
    isOpen: this.props.isOpen,
    ID: null,
    Question_en: "",
    Question_ar: "",
    Answer_en: "",
    Answer_ar: "",
    IsActive: true,
    errors: {
      Question_en: [],
      Question_ar: [],
      Answer_en: [],
      Answer_ar: []
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

    let { faq } = nextProps;
    if (nextProps.faq) {
      this.setState({
        ID: faq.ID,
        Question_en: faq.Question_en,
        Question_ar: faq.Question_ar,
        Answer_en: faq.Answer_en,
        Answer_ar: faq.Answer_ar,
        IsActive: faq.IsActive
      });
    } else {
      this.handleReset();
    }
  }
  handleReset = () => {
    this.setState({
      ID: null,
      Question_en: "",
      Question_ar: "",
      Answer_en: "",
      Answer_ar: "",
      IsActive: true
    });
  };

  // handleInputChange = (id, event, index, payload) => {
  //   const isSelectField = payload !== undefined;
  //
  //   if (isSelectField) {
  //     this.setState({
  //       [id]: payload
  //     });
  //   } else {
  //     const target = id.target;
  //     const value =
  //       target.type === "checkbox" ? Number(target.checked) : target.value;
  //     const name = target.name;
  //
  //     this.setState({
  //       [name]: value
  //     });
  //   }
  // };

  handleClose = () => {
    this.setState({ isOpen: false }, () => {
      this.props.handleClose();
    });
  };

  handleEnglishQuestionChange = event => {
    // this.setState({ Question_en:  event.target.value });
    let value = event.target.value;
    let errors = this.state.errors;
    if (value == "") errors.Question_en = ["Please Enter Valid Value"];
    else errors.Question_en = "";
    this.setState({ Question_en: value });
  };

  handleArabicQuestionChange = event => {
    // this.setState({ Question_ar:  event.target.value });
    let value = event.target.value;
    let errors = this.state.errors;
    if (value == "") errors.Question_ar = ["Please Enter Valid Value"];
    else errors.Question_ar = "";
    this.setState({ Question_ar: value });
  };

  handleEnglishAnswerChange = event => {
    // this.setState({ Answer_en:  event.target.value });
    let value = event.target.value;
    let errors = this.state.errors;
    if (value == "") errors.Answer_en = ["Please Enter Valid Value"];
    else errors.Answer_en = "";
    this.setState({ Answer_en: value });
  };

  handleArabicAnswernChange = event => {
    // this.setState({ Answer_ar:  event.target.value });
    let value = event.target.value;
    let errors = this.state.errors;
    if (value == "") errors.Answer_ar = ["Please Enter Valid Value"];
    else errors.Answer_ar = "";
    this.setState({ Answer_ar: value });
  };

  handleIsActiveChange = event => {
    let checked = event.target.checked ? 1 : 0;
    this.setState({ IsActive: checked });
  };

  handleSubmit = event => {
    event.preventDefault();

    let formData = new FormData(document.getElementById("faqsForm"));
    formData.set("IsActive", formData.has("IsActive") ? "1" : "0");

    if (this.state.ID) {
      formData.append("ID", this.state.ID);
      this.props.handleClose();
      this.props.handleUpdateFaq(formData);
    } else {
      this.props.handleClose();
      this.props.handleSubmitFaq(formData);
    }
  };

  render() {
    const { classes } = this.props;

    let disabled = false;
    const { Answer_ar, Answer_en, Question_ar, Question_en } = this.state;
    if (
      Answer_ar === "" ||
      Answer_en === "" ||
      Question_ar === "" ||
      Question_en === ""
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
            <form id="faqsForm" action="/" onSubmit={this.handleSubmit}>
              <Grid container spacing={24} className={classes.container}>
                <Grid item lg={6} md={6} xs={12}>
                  <TextField
                    id="Question_en"
                    name="Question_en"
                    label="Question English"
                    placeholder="Question English"
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                    onChange={this.handleEnglishQuestionChange}
                    value={this.state.Question_en}
                    error={
                      this.state.errors.Question_en &&
                      this.state.errors.Question_en.length > 0
                    }
                    helperText={
                      this.state.errors.Question_en &&
                      this.props.errors.Question_en[0]
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <TextField
                    id="Question_ar"
                    name="Question_ar"
                    label="Question Arabic"
                    placeholder="Question Arabic"
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                    onChange={this.handleArabicQuestionChange}
                    value={this.state.Question_ar}
                    error={
                      this.state.errors.Question_ar &&
                      this.state.errors.Question_ar.length > 0
                    }
                    helperText={
                      this.state.errors.Question_ar &&
                      this.props.errors.Question_ar[0]
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <TextField
                    id="Answer_en"
                    name="Answer_en"
                    label="Answer English"
                    placeholder="Answer English"
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                    onChange={this.handleEnglishAnswerChange}
                    value={this.state.Answer_en}
                    error={
                      this.state.errors.Answer_en &&
                      this.state.errors.Answer_en.length > 0
                    }
                    helperText={
                      this.state.errors.Answer_en &&
                      this.props.errors.Answer_en[0]
                    }
                  />
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                  <TextField
                    id="Answer_ar"
                    name="Answer_ar"
                    label="Answer Arabic"
                    placeholder="Answer Arabic"
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                    onChange={this.handleArabicAnswernChange}
                    value={this.state.Answer_ar}
                    error={
                      this.state.errors.Answer_ar &&
                      this.state.errors.Answer_ar.length > 0
                    }
                    helperText={
                      this.state.errors.Answer_ar &&
                      this.props.errors.Answer_ar[0]
                    }
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

FaqFormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  dialogTitle: PropTypes.string.isRequired,
  faq: PropTypes.object
};

export default withStyles(styles)(FaqFormDialog);
