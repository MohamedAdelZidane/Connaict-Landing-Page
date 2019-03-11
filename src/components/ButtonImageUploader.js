import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    overflow: "hidden",
    height: "200px"
    // backgroundColor: theme.palette.background.paper
  },
  single: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "center",
    overflow: "hidden",
    height: "200px"
    // backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "wrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: "#fffff"
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  main: {
    // backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  uploadInput: {
    display: "none"
  },
  buttonUpload: {}
});

class ButtonImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.images != this.state.images) {
      this.setState({ images: nextProps.images });
    }
  }

  handleImageChange = event => {
    let images = this.state.images;
    let files = event.target.files;
    if (files.length > 0) {
      if (this.props.multiple) {
        Array.from(files).forEach(file => {
          console.log(file);
          images.push(file);
        });
      } else {
        images[0] = files[0];
      }
    }
    this.setState({ images: images }, () => {
      this.props.handleImagesUpload(images);
    });
  };

  handleRemoveClicked = index => {
    this.props.handleRemoveClicked(index);
  };

  render() {
    const { classes } = this.props;
    const images = this.state.images;
    return (
      <Grid container spacing={24} className={classes.main}>
        <Grid item xs={2}>
          <input
            accept="image/*"
            className={classes.uploadInput}
            id="contained-button-file"
            multiple={this.props.multiple}
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
        </Grid>
        <Grid item xs={10}>
          {images.length > 0 && (
            <div
              className={this.props.multiple ? classes.root : classes.single}
            >
              <GridList
                cellHeight={160}
                className={classes.gridList}
                cols={this.props.multiple ? 4 : 1}
              >
                {images.map((image, index) => {
                  let src = "";
                  if (image.src) src = image.src;
                  else src = URL.createObjectURL(image);

                  if (this.props.multiple) {
                    return (
                      <GridListTile key={image.name}>
                        <img src={src} alt={image.name} />
                        <GridListTileBar
                          title={image.name}
                          classes={{
                            root: classes.titleBar,
                            title: classes.title
                          }}
                          actionIcon={
                            <IconButton
                              className={classes.title}
                              onClick={() => this.handleRemoveClicked(index)}
                            >
                              <CloseIcon />
                            </IconButton>
                          }
                        />
                      </GridListTile>
                    );
                  } else {
                    return (
                      <GridListTile key={image.name}>
                        <img src={src} alt={image.name} />
                        <GridListTileBar
                          title={image.name}
                          classes={{
                            root: classes.titleBar,
                            title: classes.title
                          }}
                        />
                      </GridListTile>
                    );
                  }
                })}
              </GridList>
            </div>
          )}
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(ButtonImageUploader);
