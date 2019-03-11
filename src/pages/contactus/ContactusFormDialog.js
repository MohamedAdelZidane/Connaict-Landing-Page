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

class ContactusFormDialog extends Component{
    state = {
        isOpen: this.props.isOpen,
        ID: null,
        Name: "",
        Email: "",
        Phone: "",
        Message: "",
      };

    componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) {
        this.setState({ isOpen: nextProps.isOpen });
    }

    let { currContactus } = nextProps;

    this.setState({
        ID: currContactus !== null ? currContactus.ID : null,
        Name: currContactus !== null ? currContactus.Name : "",
        Email: currContactus !== null ? currContactus.Email : "",
        Phone: currContactus !== null ? currContactus.Phone : "",
        Message: currContactus !== null ? currContactus.Message : "",
    });
    }

    handleClose = () => {
        this.setState({ isOpen: false }, () => {
          this.props.handleClose();
        });
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
                </Toolbar>
              </AppBar>
              <div className={classes.root}>
                <form id="viewForm" action="/">
                  <Grid container spacing={24} className={classes.container}>
                    <Grid item lg={6} md={6} xs={12}>
                      <TextField
                        id="Name"
                        name="Name"
                        label="Name"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        value={this.state.Name}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <TextField
                        id="Email"
                        name="Email"
                        label="Email"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        type="email"
                        value={this.state.Email}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <TextField
                        id="Phone"
                        name="Phone"
                        label="Phone"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        value={this.state.Phone}
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <TextField
                        id="Message"
                        name="Message"
                        label="Message"
                        placeholder="Message"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        value={this.state.Message}
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

ContactusFormDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool,
    dialogTitle: PropTypes.string.isRequired,
    currContactus: PropTypes.object
  };

  export default withStyles(styles)(ContactusFormDialog);
