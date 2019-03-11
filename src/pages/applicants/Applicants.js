import React, { Component, Fragment } from "react";
import axios from "axios";
import { checkAuthorization } from "../../components/AuthService";
import SnackBar from "../../components/SnackBar";
import FormDialog from "./ApplicantsFormDialog";
import Listing from "./ApplicantsListing";
import Loader from "../../components/Loader";
import RefreshLoader from "../../components/RefreshLoader";
import { API_URL, headers } from "../../constants/Constants";

const MODULE = "applicants";

class Applicants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: null,
      openFormDialog: false,
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarType: "success",
      isLoading: true,
      isRefreshing: false,
      dialogTitle: ""
    };
  }

  componentDidMount() {
    this.getAll();
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

  handleCloseFormDialog = () => {
    this.setState({
      openFormDialog: false,
      currentItem: null
    });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackBarOpen: false });
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
    if (
      !checkAuthorization("applicants_permissions", "can_delete_applicants")
    ) {
      this.setState({
        snackBarMessage: "You don't have permission to delete japplicants",
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

  handleView = currentItem => {
    if (!checkAuthorization("contactus_permissions", "can_view_contactus")) {
      this.setState({
        snackBarMessage: "You don't have permission to view contactus",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "View Applicant",
        currentItem: currentItem,
        openFormDialog: true
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Listing
          tableTitle="Applicants"
          data={this.state.items}
          orderBy="ID"
          handleDelete={toBeDeleted => this.handleConfirmDelete(toBeDeleted)}
          handleView={id => this.handleView(id)}
        />
        <FormDialog
          dialogTitle={this.state.dialogTitle}
          handleClose={this.handleCloseFormDialog}
          isOpen={this.state.openFormDialog}
          item={this.state.currentItem}
          handleLoading={this.handleLoading}
          handleRefreshing={this.handleRefreshing}
        />
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

export default Applicants;
