import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import FilterListIcon from "@material-ui/icons/FilterList";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
/*
  1- This Component Should Recieve 2 props:
    a. Data to be Filtered
    b. Array of filters

  2- Structure Of Filter Object
      a.Field:
        This Field Value Should be the same case as name of the field in the table
      
      b.Type:
        This will affect the rendering of the table
        ["TEXT" , "NUMBER_RANGE" , "DATE_RANGE" , "SELECT"]

      c.Values:
        This should be left empty for ( text and numeric values ) or Empty Array for ( Range Types )
        
      d.Operator:
        This will be used to compare between the Field and the Values
        ["EQUALS" , "TEXT_EQUAL" , "DATE_BETWEEN" ]

      e.Options:
        This Should be used for SELECT type
          The Structure of the options is array of objects , the object should follow the same format {value: , title: }
*/
const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  root3: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      allData: [],
      filters: [],
      snackBarOpen: false,
      snackBarMessage: ""
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      allData: props.allData,
      filters: props.filters,
      data: props.allData
    });
  }

  filter = () => {
    let filtered = this.state.allData.flexFilter(this.state.filters);
    this.setState({ filtered: filtered }, () => {
      this.props.handleDataChange(filtered);
    });
  };

  handleFilterInput = (index, dataIndex = null, event) => {
    let filters = this.state.filters;
    let value = event.target.value;
    switch (filters[index]["Type"]) {
      case "DATE_RANGE":
        let temp = filters[index]["Values"];
        if (dataIndex === "end") {
          if (this.checkDates(temp["start"], value)) {
            temp[dataIndex] = value;
          } else {
            temp[dataIndex] = temp["start"];
            // this.setState({
            //   snackBarOpen: true,
            //   snackBarMessage: "End Date Should be less than Start Date"
            // });
            // temp[dataIndex] = null;
          }
        } else {
          temp[dataIndex] = value;
        }
        filters[index]["Values"] = temp;
        break;

      case "NUMBER_RANGE":
        let current = filters[index]["Values"];
        if (dataIndex === "max") {
          if (this.checkNumbers(current["min"], value)) {
            current[dataIndex] = value;
          } else {
            this.setState({
              snackBarOpen: true,
              snackBarMessage: "Max Number Should be less than Min Number"
            });
            current[dataIndex] = null;
          }
        } else {
          current[dataIndex] = value;
        }
        filters[index]["Values"] = current;
        break;

      default:
        filters[index]["Values"] = value;
        break;
    }
    this.setState({ filters: filters }, () => {
      this.filter();
    });
  };

  checkDates = (start, end) => {
    if (start !== "" && end !== "") {
      start = new Date(start.replace(/-/g, "/"));
      end = new Date(end.replace(/-/g, "/"));
      if (start <= end) return true;
      else return false;
    }
    return true;
  };

  checkNumbers = (start, end) => {
    if (start && end) {
      if (start <= end) return true;
      else return false;
    }
    return true;
  };

  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    const { classes } = this.props;
    let filtersView = this.state.filters.map((filter, index) => {
      switch (filter.Type) {
        case "TEXT":
          return (
            <FormControl className={classes.formControl}>
              <TextField
                label={filter["Field"]}
                className={classes.textField}
                value={this.state.filters[index]["Values"]}
                onChange={event => this.handleFilterInput(index, null, event)}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>
          );
        case "NUMBER_RANGE":
          return (
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.textField}
                  value={this.state.filters[index]["Values"]["min"]}
                  type="number"
                  label={filter["Field"] + " Min:"}
                  onChange={event =>
                    this.handleFilterInput(index, "min", event)
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.textField}
                  value={this.state.filters[index]["Values"]["max"]}
                  type="number"
                  label={filter["Field"] + " Max:"}
                  onChange={event =>
                    this.handleFilterInput(index, "max", event)
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </FormControl>
            </div>
          );
        case "DATE_RANGE":
          return (
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.textField}
                  type="date"
                  label={filter["Field"] + " Start:"}
                  value={this.state.filters[index]["Values"]["start"]}
                  onChange={event =>
                    this.handleFilterInput(index, "start", event)
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.textField}
                  type="date"
                  label={filter["Field"] + " End:"}
                  value={this.state.filters[index]["Values"]["end"]}
                  onChange={event =>
                    this.handleFilterInput(index, "end", event)
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </FormControl>
            </div>
          );
        case "SELECT":
          return (
            <div>
              <FormControl className={classes.formControl}>
                <TextField
                  select
                  label={filter["Field"]}
                  className={classes.textField}
                  value={this.state.filters[index]["Values"]}
                  onChange={event =>
                    this.handleFilterInput(index, "end", event)
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {filter.Options.map(option => {
                    return (
                      <MenuItem value={option.value}>{option.title}</MenuItem>
                    );
                  })}
                </TextField>
              </FormControl>
            </div>
          );

        default:
          return <div />;
      }
    });

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<FilterListIcon color="primary" />}>
          <Typography className={classes.heading}>Filters</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.root3}>{filtersView}</div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
export default withStyles(styles)(Filters);

Array.prototype.flexFilter = function(info) {
  var matchesFilter,
    matches = [],
    count;

  matchesFilter = function(item) {
    count = 0;
    for (var n = 0; n < info.length; n++) {
      switch (info[n]["Operator"]) {
        case "EQUALS":
          if (info[n]["Values"] === "") {
            count++;
          } else {
            if (info[n]["Values"] == item[info[n]["Field"]]) {
              count++;
            }
          }
          break;

        case "TEXT_EQUAL":
          if (
            item[info[n]["Field"]]
              .toLowerCase()
              .includes(info[n]["Values"].toLowerCase())
          ) {
            count++;
          }
          break;
        case "LESS":
          if (info[n]["Values"] > item[info[n]["Field"]]) {
            count++;
          }
          break;

        case "LESS_EQUAL":
          if (info[n]["Values"] >= item[info[n]["Field"]]) {
            count++;
          }
          break;

        case "GREATER":
          if (info[n]["Values"] < item[info[n]["Field"]]) {
            count++;
          }
          break;

        case "GREATER_EQUAL":
          if (info[n]["Values"] <= item[info[n]["Field"]]) {
            count++;
          }
          break;

        case "DATE_BETWEEN":
          if (
            info[n]["Values"]["end"] &&
            info[n]["Values"]["start"] &&
            item[info[n]["Field"]]
          ) {
            if (
              new Date(info[n]["Values"]["start"].replace(/-/g, "/")) <=
                new Date(item[info[n]["Field"]].replace(/-/g, "/")) &&
              new Date(info[n]["Values"]["end"].replace(/-/g, "/")) >=
                new Date(item[info[n]["Field"]].replace(/-/g, "/"))
            ) {
              count++;
            }
          } else if (info[n]["Values"]["start"] && item[info[n]["Field"]]) {
            if (
              new Date(info[n]["Values"]["start"].replace(/-/g, "/")) <=
              new Date(item[info[n]["Field"].replace(/-/g, "/")])
            ) {
              count++;
            }
          } else count++;

          break;

        case "BETWEEN":
          if (info[n]["Values"]["min"] && info[n]["Values"]["max"]) {
            if (
              info[n]["Values"]["min"] <= item[info[n]["Field"]] &&
              info[n]["Values"]["max"] >= item[info[n]["Field"]]
            ) {
              count++;
            }
          } else if (info[n]["Values"]["min"]) {
            if (info[n]["Values"]["min"] <= item[info[n]["Field"]]) {
              count++;
            }
          } else if (info[n]["Values"]["max"]) {
            if (info[n]["Values"]["min"] >= item[info[n]["Field"]]) {
              count++;
            }
          } else count++;
          break;
      }
    }
    // If TRUE, then the current item in the array meets all the filter criteria
    return count === info.length;
  };

  // Loop through each item in the array
  for (var i = 0; i < this.length; i++) {
    // Determine if the current item matches the filter criteria
    if (matchesFilter(this[i])) {
      matches.push(this[i]);
    }
  }

  // Give us a new array containing the objects matching the filter criteria
  return matches;
};
