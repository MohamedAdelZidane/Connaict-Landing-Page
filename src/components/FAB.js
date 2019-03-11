import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed"
  }
});

function FloatingActionButton(props) {
  const { classes, callback } = props;

  return (
    <div>
      <Button
        variant="fab"
        color="primary"
        aria-label="Add"
        className={classes.button}
        onClick={callback}
      >
        <AddIcon />
      </Button>
    </div>
  );
}

FloatingActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
  callback: PropTypes.func.isRequired
};

export default withStyles(styles)(FloatingActionButton);
