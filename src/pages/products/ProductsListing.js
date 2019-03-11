import React, { Component } from "react";
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
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { checkAuthorization } from "../../components/AuthService";
import Filters from "../../components/Filters";
import CheckCircle from "@material-ui/icons/CheckCircle";
import RemoveCircle from "@material-ui/icons/RemoveCircle";

function getSorting(order, orderBy) {
  if (orderBy === "ID") {
    return order === "desc"
      ? (a, b) => (parseInt(b[orderBy]) < parseInt(a[orderBy]) ? -1 : 1)
      : (a, b) => (parseInt(a[orderBy]) < parseInt(b[orderBy]) ? -1 : 1);
  } else if (orderBy === "CreatedOn" || orderBy === "UpdatedOn") {
    return order === "desc"
      ? (a, b) => (new Date(b[orderBy]) < new Date(a[orderBy]) ? -1 : 1)
      : (a, b) => (new Date(a[orderBy]) < new Date(b[orderBy]) ? -1 : 1);
  }
}

const columnData = [
  {
    id: "ID",
    numeric: true,
    disablePadding: false,
    label: "ID",
    sortable: true
  },
  {
    id: "ArabicName",
    numeric: false,
    disablePadding: true,
    label: "Arabic Name",
    sortable: false
  },
  {
    id: "EnglishName",
    numeric: false,
    disablePadding: true,
    label: "English Name",
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
    id: "UpdatedOn",
    numeric: false,
    disablePadding: true,
    label: "UpdatedOn",
    sortable: true
  },
  {
    id: "IsPublished",
    numeric: false,
    disablePadding: true,
    label: "Published",
    sortable: true
  },
  {
    id: "controls",
    numeric: false,
    disablePadding: false,
    label: "Controls",
    sortable: false
  }
];

let filters = [
  { Field: "ArabicName", Type: "TEXT", Values: "", Operator: "TEXT_EQUAL" },
  { Field: "EnglishName", Type: "TEXT", Values: "", Operator: "TEXT_EQUAL" },
  { Field: "CategoryID", Type: "TEXT", Values: "", Operator: "EQUALS" },
  {
    Field: "IsPublished",
    Type: "SELECT",
    Values: "",
    Operator: "EQUALS",
    Options: [
      { title: "Published", value: 1 },
      { title: "Not Published", value: 0 }
    ]
  },
  {
    Field: "CreatedOn",
    Type: "DATE_RANGE",
    Values: [],
    Operator: "DATE_BETWEEN"
  }
];

class EnhancedTableHead extends Component {
  createSortHandler = property => event => {
    //debugger;
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
                  <div> {column.label}</div>
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
  render() {
    const { numSelected, classes } = this.props;
    return (
      <div>
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
                Products
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
              <React.Fragment />
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
      </div>
    );
  }
}
EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  tableWrapper: {
    overflowX: "auto"
  },
  resendButton: {
    marginLeft: theme.spacing.unit * 2
  }
});

class EnhancedTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: "desc",
      orderBy: "CreatedOn",
      selected: [],
      sending: [],
      data: [],
      allData: [],
      page: 0,
      rowsPerPage: 5,
      open: false,
      deleteItems: [],
      confirmDialogOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data, allData: nextProps.data });
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

  deleteFromState = toBeDeleted => {
    let newData = [];
    for (let i = 0; i < this.state.allData.length; i++) {
      let check = true;
      for (let j = 0; j < toBeDeleted.length; j++) {
        if (this.state.allData[i].ID === toBeDeleted[j]) {
          check = false;
          break;
        }
      }
      if (check) {
        newData.push(this.state.allData[i]);
      }
    }
    let newShow = [];
    for (let i = 0; i < this.state.data.length; i++) {
      let check = true;
      for (let j = 0; j < toBeDeleted.length; j++) {
        if (this.state.data[i].ID === toBeDeleted[j]) {
          check = false;
          break;
        }
      }
      if (check) {
        newShow.push(this.state.allData[i]);
      }
    }
    this.setState(
      { allData: newData, data: newShow, open: false, toBeDeleted: [] },
      () => {}
    );
    if (toBeDeleted === this.state.selected) {
      this.setState({ selected: [] });
    }
  };

  deleteProducts = () => {
    let toBeDeleted = this.state.deleteItems;
    this.state.selected = [];
    this.handleCloseConfirmation();
    this.props.handleDelete(toBeDeleted);
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleDeleteButton = toBeDeleted => {
    if (!checkAuthorization("products_permissions", "can_delete_products")) {
      this.props.handleSnackBarMessage(
        "You don't have permission to delete Products",
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

  handleDataChange = data => {
    this.setState({ data: data });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
        <DeleteConfirmationDialog
          isOpen={this.state.confirmDialogOpen}
          id={this.state.deleteItems}
          handleCloseDeleteConfirmationDialog={this.handleCloseConfirmation}
          title="Deleting Products"
          text="Are you sure you want to perform this action?"
          handleConfirmDelete={this.deleteProducts}
        />
        <Paper className={classes.root}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            allData={this.state.allData}
            handleDataChange={this.handleDataChange}
            delete={() => this.handleDeleteButton(this.state.selected)}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={(event, property) =>
                  this.handleRequestSort(event, property)
                }
                rowCount={data.length}
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
                        <TableCell numeric>{n.ID}</TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {n.ArabicName}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {n.EnglishName}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {n.CreatedOn === null ? "N/A" : n.CreatedOn}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {n.UpdatedOn === null ? "N/A" : n.UpdatedOn}
                        </TableCell>
                        <TableCell padding="none">
                          {parseInt(n.IsPublished, 10) === 1 ? (
                            <Tooltip title="Active">
                              <CheckCircle color="action" />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Inactive">
                              <RemoveCircle color="action" />
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <IconButton onClick={() => this.props.handleEdit(n)}>
                            <EditIcon color="action" />
                          </IconButton>
                          <IconButton
                            onClick={() => this.handleDeleteButton([n.ID])}
                          >
                            <DeleteIcon color="action" />
                          </IconButton>
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
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
