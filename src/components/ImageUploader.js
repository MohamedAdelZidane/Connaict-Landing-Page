import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

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
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  imageUpload: {
    textAlign: "center",
    width: "100%"
  },
  dropzone: {
    width: "80%",
    margin: "auto",
    marginTop: "30px",
    marginBottom: "30px",
    display: "flex",
    textAlign: "center",
    alignContent: "center",
    webkitBoxAlign: "center",
    msFlexAlign: "center",
    alignItems: "center",
    height: "200px",
    border: "2px dashed #7d7d7d",
    borderRadius: "5px"
  },
  dropZoneInner: {
    margin: "auto"
  }
});

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      multiple: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.images != this.state.images) {
      this.setState({ images: nextProps.images });
    }

    if (nextProps.multiple != this.state.multiple) {
      this.setState({ multiple: nextProps.multiple });
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    let images = this.state.images;
    if (acceptedFiles.length > 0) {
      if (this.state.multiple) {
        acceptedFiles.forEach(file => {
          images.push(file);
        });
      } else {
        images[0] = acceptedFiles[0];
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
      <div className={classes.imageUpload}>
        <Dropzone
          onDrop={this.onDrop}
          multiple={this.state.multiple}
          accept="image/*"
          className={classes.dropzone}
        >
          <p className={classes.dropZoneInner}>
            <AddIcon style={{ fontSize: 40 }} color="primary" />
          </p>
        </Dropzone>
        {images.length > 0 && (
          <div className={this.state.multiple ? classes.root : classes.single}>
            <GridList
              cellHeight={160}
              className={classes.gridList}
              cols={this.state.multiple ? 4 : 1}
            >
              {images.map((image, index) => {
                let src = "";
                if (image.src) src = image.src;
                else src = URL.createObjectURL(image);
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
              })}
            </GridList>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(styles)(ImageUploader);
