import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = {
  root: {
    flexGrow: 1,
    position: "fixed",
    height: "100%",
    top: 0,
    backgroundColor: "rgba(52, 52, 52, 0.3)",
    zIndex: 9999,
    width: "calc(100% + 20px)",
    left: "calc(0% - 20px)"
  },
  refresh: {
    top: 0
  }
};

function RefreshLoader(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress className={classes.refresh} />
    </div>
  );
}

RefreshLoader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RefreshLoader);
