import React, { Component } from "react";
import ImageUploader from "../components/ImageUploader";
import Imag from "../components/ButtonImageUploader";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const currencies = [
  {
    id: 1,
    name: "$"
  },
  {
    id: 2,
    label: "€"
  },
  {
    id: 3,
    label: "฿"
  },
  {
    id: 4,
    label: "¥"
  }
];

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      multiple: false,
      currency: ""
    };
  }

  handleRemoveClicked = index => {
    let images = this.state.images;
    images.splice(index, 1);
    this.setState({ images: images });
  };

  handleImagesUpload = images => {
    this.setState({ images: images });
  };

  handleChange = event => {
    let value = event.target.value;
    this.setState({ currency: value });
  };
  render() {
    const { classes } = this.props;
    return (
      <ImageUploader
        images={this.state.images}
        multiple={this.state.multiple}
        handleRemoveClicked={this.handleRemoveClicked}
        handleImagesUpload={this.handleImagesUpload}
      />
      // <TextField
      //   select
      //   label="Select"
      //   value={this.state.currency}
      //   onChange={event => this.handleChange(event)}
      //   SelectProps={{
      //     MenuProps: {
      //       className: classes.menu
      //     }
      //   }}
      //   margin="normal"
      // >
      //   {currencies.map(option => (
      //     <MenuItem key={option.id} value={option.id}>
      //       {option.label}
      //     </MenuItem>
      //   ))}
      // </TextField>
    );
  }
}
export default withStyles(styles)(Test);
