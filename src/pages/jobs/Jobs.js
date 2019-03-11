import React, { Component, Fragment } from "react";
import axios from "axios";
import { checkAuthorization } from "../../components/AuthService";
import SnackBar from "../../components/SnackBar";
import FormDialog from "./JobsFormDialog";
import Listing from "./JobsListing";
import FAB from "../../components/FAB";
import Loader from "../../components/Loader";
import RefreshLoader from "../../components/RefreshLoader";
import { API_URL, headers } from "../../constants/Constants";

const MODULE = "jobs";

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      departments: [],
      currentItem: null,
      selectedItems: [],
      openFormDialog: false,
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarType: "success",
      isLoading: true,
      isRefreshing: false,
      dialogTitle: "Create New Job",
      reset: false,
      errors: {
        ArabicName: [],
        EnglishName: [],
        EnglishAbout: [],
        ArabicAbout: [],
        EnglishRequirement: [],
        ArabicRequirement: []
      }
    };
  }

  componentDidMount() {
    this.getAll();
    this.getDepartments();
  }

  getAll = () => {
    axios
      .get(API_URL + MODULE)
      .then(response => {
        let items = response.data.collection;
        if (items) this.setState({ items: items, isLoading: false });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  getDepartments = () => {
    axios
      .get(API_URL + "departments")
      .then(response => {
        let items = response.data.collection;
        if (items) this.setState({ departments: items });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  fabCallback = () => {
    if (!checkAuthorization("jobs_permissions", "can_create_jobs")) {
      this.setState({
        snackBarMessage: "You don't have permission to create jobs",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "Add Job",
        openFormDialog: true,
        reset: true
      });
    }
  };

  handleCloseFormDialog = () => {
    this.setState({
      openFormDialog: false,
      currentItem: null,
      errors: {
        ArabicName: [],
        EnglishName: [],
        EnglishAbout: [],
        ArabicAbout: [],
        EnglishRequirement: [],
        ArabicRequirement: []
      }
    });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackBarOpen: false });
  };

  addToState = item => {
    let newData = this.state.items;
    newData.push(item);
    this.setState({ items: newData, isRefreshing: false });
  };

  handleAdd = formData => {
    this.setState({ isRefreshing: true, reset: false });
    axios
      .post(API_URL + MODULE, formData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 0 && response.message != "form_error") {
          this.setState({
            openFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "error",
            isRefreshing: false,
            currentItem: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            openFormDialog: true,
            errors: response.data
          });
        } else if (response.res === 1) {
          this.addToState(response.data);
          this.setState({
            reset: true,
            openFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "success"
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  updateInState = item => {
    let newData = this.state.items;
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].ID == item.ID) {
        newData[i] = item;
        break;
      }
    }
    this.setState({ items: newData, isRefreshing: false });
  };

  handleUpdate = formData => {
    this.setState({ isRefreshing: true, reset: false });
    axios
      .post(API_URL + MODULE, formData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 0 && response.message != "form_error") {
          this.setState({
            openFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "error",
            isRefreshing: false,
            currentItem: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            errors: response.data,
            openFormDialog: true
          });
        } else if (response.res === 1) {
          this.updateInState(response.data);
          this.setState({
            openFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "success",
            reset: true,
            currentItem: null
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleEdit = item => {
    if (!checkAuthorization("jobs_permissions", "can_edit_jobs")) {
      this.setState({
        snackBarMessage: "You don't have permission to edit jobs",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "Edit Jobs",
        currentItem: item,
        openFormDialog: true,
        reset: true
      });
    }
  };

  handleConfirmDelete = () => {
    this.handleRefreshing(true);
    let id = this.state.currentItem.ID;
    axios
      .delete(API_URL + MODULE + id, {
        headers: headers
      })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 0) {
          this.setState({
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "error",
            isRefreshing: false
          });
        } else {
          this.removeDeletedFromData(id);
          this.setState({
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "sucess"
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleLoading = value => {
    this.setState({ isLoading: value });
  };

  handleRefreshing = value => {
    this.setState({ isRefreshing: value });
  };

  removeDeletedFromData = items => {
    let data = this.state.items;
    let newData = [];
    data.forEach((element, index) => {
      if (items instanceof Array) {
        let found = items.find(item => {
          return item === element.ID;
        });
        if (found === undefined) {
          newData.push(element);
        }
      } else {
        newData = data;
        if (items === element.ID) {
          newData.splice(index, 1);
        }
      }
    });
    this.setState({ items: newData });
    this.handleRefreshing(false);
  };

  deleteSlectedItems = selectedItems => {
    if (!checkAuthorization("jobs_permissions", "can_delete_jobs")) {
      this.setState({
        snackBarMessage: "You don't have permission to delete jobs",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        openDeleteSelectedConfirmationDialog: true,
        selectedItems: selectedItems
      });
    }
  };

  handleConfirmDelete = toBeDeleted => {
    this.handleRefreshing(true);
    if (toBeDeleted instanceof Array) {
      let formData = new FormData();
      formData.append("itemsIDs", JSON.stringify(toBeDeleted));
      axios
        .post(API_URL + MODULE + "/BatchDelete", formData, {
          headers: headers
        })
        .then(response => {
          return response.data;
        })
        .then(response => {
          if (response.res === 1) {
            this.setState({
              snackBarOpen: true,
              snackBarType: "success",
              snackBarMessage: response.message
            });
            this.removeDeletedFromData(toBeDeleted);
          } else if (response.res === 0) {
            this.setState({
              snackBarOpen: true,
              snackBarType: "error",
              snackBarMessage: response.message
            });
          }
        });
    } else {
      axios
        .delete(API_URL + MODULE + "/" + toBeDeleted, { headers: headers })
        .then(response => {
          return response.data;
        })
        .then(response => {
          if (response.res === 1) {
            this.setState({
              snackBarOpen: true,
              snackBarType: "success",
              snackBarMessage: response.message
            });
            this.removeDeletedFromData(toBeDeleted);
          } else if (response.res === 0) {
            this.setState({
              snackBarOpen: true,
              snackBarType: "error",
              snackBarMessage: response.message
            });
          }
        });
    }
  };

  render() {
    return (
      <Fragment>
        <Listing
          tableTitle="Jobs"
          data={this.state.items}
          orderBy="ID"
          handleEdit={this.handleEdit}
          handleDelete={toBeDeleted => this.handleConfirmDelete(toBeDeleted)}
        />
        <FormDialog
          dialogTitle={this.state.dialogTitle}
          handleClose={this.handleCloseFormDialog}
          isOpen={this.state.openFormDialog}
          departments={this.state.departments}
          item={this.state.currentItem}
          handleAdd={this.handleAdd}
          handleUpdate={this.handleUpdate}
          handleLoading={this.handleLoading}
          handleRefreshing={this.handleRefreshing}
          errors={this.state.errors}
          reset={this.state.reset}
        />
        <FAB callback={this.fabCallback} />
        <SnackBar
          type={this.state.snackBarType}
          open={this.state.snackBarOpen}
          autoHideDuration={4000}
          message={this.state.snackBarMessage}
          onClose={this.handleCloseSnackbar}
        />
        {this.state.isLoading && <Loader />}
        {this.state.isRefreshing && <RefreshLoader />}
      </Fragment>
    );
  }
}

export default Jobs;
