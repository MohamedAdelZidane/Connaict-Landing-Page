import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  root: {
    color: green[600],
    "&$checked": {
      color: green[500]
    }
  },
  checked: {}
});
class GreenCheckBox extends Component {
  render() {
    const { classes } = this.props;
    return (
      <FormControlLabel
        label={this.props.text}
        control={
          <Checkbox
            checked={this.props.checked}
            onChange={this.props.onChange}
            classes={{
              root: classes.root,
              checked: classes.checked
            }}
          />
        }
      />
    );
  }
}
export default withStyles(styles)(GreenCheckBox);
