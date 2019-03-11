import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  container: {
    height: "100%",
    width: "100%"
  },
  loader: {
    margin: theme.spacing.unit,
    top: "auto",
    right: "auto",
    bottom: 20,
    left: 100,
    position: "fixed",
    zIndex: 1500
  }
});

function SimpleLoader(props) {
  const { classes } = props;

  return (
    <div>
      <CircularProgress className={classes.loader} />
    </div>
  );
}

SimpleLoader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleLoader);
