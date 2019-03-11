import React, { Component } from "react";
import TinyMCE from "react-tinymce";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { API_URL, BASE_URL } from "../constants/Constants";

const styles = theme => ({
  fullLength: {
    marginTop: theme.spacing.unit * 2,
    minWidth: "100%"
  }
});

const TINYMCE_CONFIG = {
  plugins: "autolink link image lists print preview",
  toolbar: "undo redo | bold italic | alignleft aligncenter alignright",
  images_upload_url: API_URL + "tinymce/UploadImage",
  images_upload_base_path: BASE_URL
};

class TinyMceForm extends Component {
  handleChange = event => {
    let value = event.target.getContent();
    this.props.handleChange(value);
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} className={classes.fullLength}>
        <Grid item xs={12}>
          <Typography variant="title" gutterBottom>
            {this.props.title}
          </Typography>
          <TinyMCE
            content={this.props.data}
            config={TINYMCE_CONFIG}
            onChange={this.handleChange}
          />
          {this.props.error && (
            <Typography variant="subheading" gutterBottom color="error">
              {this.props.helperText}
            </Typography>
          )}
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(TinyMceForm);
