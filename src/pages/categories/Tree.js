import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { API_URL } from "../../constants/Constants";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import "react-sortable-tree/style.css";
import SortableTree from "react-sortable-tree";

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
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      data: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }

    if (nextProps.data != this.state.data) {
      this.setState({ data: nextProps.data });
    }
  }

  handleClose = () => {
    this.setState({ isOpen: false });
    this.props.handleClose();
  };

  handleDataChange = data => {
    this.setState({ data: data });
  };

  handleSubmit = () => {
    this.setState({ isOpen: false });
    this.props.handleTreeDataChanged(this.state.data);
  };

  render() {
    const { classes } = this.props;
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
                disabled={false}
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div style={{ height: "100%" }}>
            <SortableTree
              treeData={this.state.data}
              onChange={data => this.handleDataChange(data)}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(Tree);
