import React, { Component, Fragment } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Filters from "../../components/Filters";
import DeleteIcon from "@material-ui/icons/Delete";
import Visibility from "@material-ui/icons/Visibility";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";
import { checkAuthorization } from "../../components/AuthService";

const columnData = [
  {
    id: "ID",
    numeric: false,
    disablePadding: true,
    label: "ID",
    sortable: true
  },
  {
    id: "Name",
    numeric: false,
    disablePadding: true,
    label: "Name",
    sortable: true
  },
  {
    id: "Email",
    numeric: false,
    disablePadding: true,
    label: "Email",
    sortable: true
  },
  {
    id: "Phone",
    numeric: false,
    disablePadding: true,
    label: "Phone",
    sortable: false
  },
  {
    id: "Message",
    numeric: false,
    disablePadding: true,
    label: "Message",
    sortable: false
  },
  {
    id: "CreatedOn",
    numeric: false,
    disablePadding: true,
    label: "CreatedOn",
    sortable: true
  },
  {
    id: "controls",
    numeric: false,
    disablePadding: true,
    label: "Controls",
    sortable: false
  }
];

let filters = [
  { Field: "Name", Type: "TEXT", Values: "", Operator: "TEXT_EQUAL" },
  { Field: "Email", Type: "TEXT", Values: "", Operator: "TEXT_EQUAL" }
];

function getSorting(order, orderBy) {
  if (orderBy === "ID") {
    return order === "desc"
      ? (a, b) => (parseInt(b[orderBy], 10) < parseInt(a[orderBy], 10) ? -1 : 1)
      : (a, b) =>
          parseInt(a[orderBy], 10) < parseInt(b[orderBy], 10) ? -1 : 1;
  } else if (orderBy === "CreatedOn") {
    return order === "desc"
      ? (a, b) => (new Date(b[orderBy]) < new Date(a[orderBy]) ? -1 : 1)
      : (a, b) => (new Date(a[orderBy]) < new Date(b[orderBy]) ? -1 : 1);
  } else {
    return order === "desc"
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
  }
}

class EnhancedTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? "none" : "default"}
                sortDirection={orderBy === column.id ? order : false}
              >
                {column.sortable ? (
                  <Tooltip
                    title="Sort"
                    placement={column.numeric ? "bottom-end" : "bottom-start"}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={order}
                      onClick={this.createSortHandler(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </Tooltip>
                ) : (
                  <div>{column.label}</div>
                )}
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  },
  root2: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  root3: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class EnhancedTableToolbar extends Component {
  state = {
    status: "All",
    start: "",
    end: "",
    open: false
  };

  handleStatusChange = event => {
    this.setState({ status: event.target.value, start: "", end: "" });
    this.props.handleStatus(event.target.value);
  };

  checkDates = (start, end) => {
    if (start !== "" && end !== "") {
      return start <= end ? true : false;
    }

    return true;
  };

  handleStart = event => {
    let value = event.target.value;
    this.setState({ start: event.target.value }, () => {
      if (this.checkDates(value, this.state.end) && this.state.end !== "") {
        this.props.handleDate(this.state.start, this.state.end);
      } else if (!this.checkDates(value, this.state.end)) {
        this.setState({ end: value }, () => {
          this.props.handleDate(this.state.start, this.state.end);
        });
      }
    });
  };

  handleEnd = event => {
    let value = event.target.value;
    this.setState({ end: event.target.value }, () => {
      if (this.checkDates(this.state.start, value) && this.state.start !== "") {
        this.props.handleDate(this.state.start, this.state.end);
      } else if (!this.checkDates(this.state.start, value)) {
        this.setState({ start: value }, () => {
          this.props.handleDate(this.state.start, this.state.end);
        });
      }
    });
  };

  render() {
    const { numSelected, classes, tableTitle } = this.props;

    return (
      <Fragment>
        <Toolbar
          className={classNames(classes.root, {
            [classes.highlight]: numSelected > 0
          })}
        >
          <div className={classes.title}>
            {numSelected > 0 ? (
              <Typography color="inherit" variant="subheading">
                {numSelected} selected
              </Typography>
            ) : (
              <Typography variant="title" id="tableTitle">
                {tableTitle}
              </Typography>
            )}
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            {numSelected > 0 ? (
              <Tooltip title="Delete">
                <IconButton aria-label="Delete" onClick={this.props.delete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Fragment />
            )}
          </div>
        </Toolbar>
        <div className={classes.root2}>
          <Filters
            allData={this.props.allData}
            filters={filters}
            handleDataChange={this.props.handleDataChange}
          />
        </div>
      </Fragment>
    );
  }
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  tableTitle: PropTypes.string.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 640
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class EnhancedTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "desc",
      orderBy: props.orderBy, // handle defauls sorting order field
      selected: [],
      // data: props.data,
      data: [],
      allData: [],
      page: 0,
      rowsPerPage: 5,
      confirmDialogOpen: false,
      deleteItems: []
    };
  }

  /**
   *
   * @TODO: We need to enhance this by not using componentWillReceiveProps
   * since it will get deprecated soon in the next version of React
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data, allData: nextProps.data });
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.ID) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleDeleteSelected = () => {
    this.props.deleteSlectedContactus(JSON.stringify(this.state.selected));
  };
  handleDataChange = data => {
    this.setState({ data: data });
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  deleteContact = () => {
    let toBeDeleted = this.state.deleteItems;
    this.handleCloseConfirmation();
    this.props.handleDelete(toBeDeleted);
    this.setState({ selected: [] });
  };

  handleDeleteButton = toBeDeleted => {
    if (!checkAuthorization("contacts_permissions", "can_delete_contacts")) {
      this.props.handleSnackBarMessage(
        "You don't have permission to delete Contacts",
        "error"
      );
    } else {
      this.handleOpenConfirmation(toBeDeleted);
    }
  };

  handleOpenConfirmation = toBeDeleted => {
    this.setState({ deleteItems: toBeDeleted, confirmDialogOpen: true });
  };

  handleCloseConfirmation = () => {
    this.setState({ confirmDialogOpen: false, deleteItems: [] });
  };

  render() {
    const { classes, tableTitle, handleView, handleDelete } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
        <DeleteConfirmationDialog
          isOpen={this.state.confirmDialogOpen}
          id={this.state.deleteItems}
          handleCloseDeleteConfirmationDialog={this.handleCloseConfirmation}
          title="Deleting Message"
          text="Are you sure you want to perform this action?"
          handleConfirmDelete={this.deleteContact}
        />
        <Paper className={classes.root}>
          <EnhancedTableToolbar
            allData={this.state.allData}
            handleDataChange={this.handleDataChange}
            numSelected={selected.length}
            tableTitle={tableTitle}
            handleStatus={status => this.handleChangeSentFilter(status)}
            handleDate={(start, end) => this.handleDate(start, end)}
            handleDeleteSelected={() => this.handleDeleteSelected()}
            delete={() => this.handleDeleteButton(this.state.selected)}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
                columnData={columnData}
              />
              <TableBody>
                {data
                  .sort(getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.ID);

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.ID}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected}
                            onClick={event => this.handleClick(event, n.ID)}
                          />
                        </TableCell>
                        <TableCell padding="none">{n.ID}</TableCell>
                        <TableCell padding="none">{n.Name}</TableCell>
                        <TableCell padding="none">{n.Email}</TableCell>
                        <TableCell padding="none">{n.Phone}</TableCell>
                        <TableCell padding="none">{n.Message}</TableCell>
                        <TableCell padding="none">{n.CreatedOn}</TableCell>
                        <TableCell padding="none">
                          <Tooltip title="View">
                            <IconButton
                              className={classes.button}
                              aria-label="View"
                              onClick={() => handleView(n)}
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              className={classes.button}
                              aria-label="Delete"
                              onClick={() => this.handleDeleteButton([n.ID])}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{ "aria-label": "Previous Page" }}
            nextIconButtonProps={{ "aria-label": "Next Page" }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableTitle: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  handleView: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
};

export default withStyles(styles)(EnhancedTable);
