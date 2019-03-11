import React, { Component, Fragment } from "react";
import axios from "axios";
import { checkAuthorization } from "../../components/AuthService";
import SnackBar from "../../components/SnackBar";
import ContactusFormDialog from "./ContactusFormDialog";
import ContactusListing from "./ContactusListing";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";
import FAB from "../../components/FAB";
import Loader from "../../components/Loader";
import RefreshLoader from "../../components/RefreshLoader";
import { API_URL, headers } from "../../constants/Constants";

class Contactus extends Component {
  state = {
    contactus: [],
    currentContactus: null,
    selectedContactus: [],
    openContactusFormDialog: false,
    openDeleteConfirmationDialog: false,
    openDeleteSelectedConfirmationDialog: false,
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarType: "success",
    isLoading: true,
    isRefreshing: false,
    dialogTitle: "View Contact us"
  };

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    this.handleLoading(true);
    axios
      .get(API_URL + "contactus")
      .then(response => {
        this.setState({ contactus: response.data.collection }, () => {
          this.handleLoading(false);
        });
      })
      .catch(function(error) {
        this.handleLoading(false);
        console.log(error);
      });
  };

  handleCloseContactusFormDialog = () => {
    this.setState({ openContactusFormDialog: false });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackBarOpen: false });
  };

  handleView = currContactus => {
    if (!checkAuthorization("contactus_permissions", "can_view_contactus")) {
      this.setState({
        snackBarMessage: "You don't have permission to view contactus",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "View Contact us",
        currentContactus: currContactus,
        openContactusFormDialog: true
      });
    }
  };

  handleDelete = currContactus => {
    if (!checkAuthorization("contactus_permissions", "can_delete_contactus")) {
      this.setState({
        snackBarMessage: "You don't have permission to delete contactus",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        currentContactus: currContactus,
        openDeleteConfirmationDialog: true
      });
    }
  };

  handleCloseDeleteConfirmationDialog = () => {
    this.setState({ openDeleteConfirmationDialog: false });
  };

  handleConfirmDelete = () => {
    this.handleCloseDeleteConfirmationDialog();
    this.handleRefreshing(true);

    axios
      .delete(API_URL + "contactus/" + this.state.currentContactus.ID, {
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
          this.setState(
            {
              snackBarMessage: response.message,
              snackBarOpen: true,
              snackBarType: "success"
            },
            () => {
              this.getAll();
              this.handleRefreshing(false);
            }
          );
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

  deleteSlectedContactus = selectedContactus => {
    if (!checkAuthorization("contactus_permissions", "can_delete_contactus")) {
      this.setState({
        snackBarMessage: "You don't have permission to delete contactus",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        openDeleteSelectedConfirmationDialog: true,
        selectedContactus: selectedContactus
      });
    }
  };

  handleConfirmDeleteSelected = () => {
    this.handleCloseDeleteSelectedConfirmationDialog();
    this.handleRefreshing(true);

    let formData = new FormData();
    formData.append("itemsIDs", JSON.stringify(this.state.selectedContactus));

    axios
      .post(API_URL + "contactus/BatchDelete", formData, { headers: headers })
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
          this.setState(
            {
              snackBarMessage: response.message,
              snackBarOpen: true,
              snackBarType: "success"
            },
            () => {
              this.getAll();
              this.handleRefreshing(false);
            }
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleCloseDeleteSelectedConfirmationDialog = () => {
    this.setState({ openDeleteSelectedConfirmationDialog: false });
  };

  render() {
    return (
      <Fragment>
        <ContactusListing
          tableTitle="Contact us"
          data={this.state.contactus}
          orderBy="ID"
          handleView={this.handleView}
          handleDelete={this.handleDelete}
          deleteSlectedContactus={this.deleteSlectedContactus}
        />
        <ContactusFormDialog
          dialogTitle={this.state.dialogTitle}
          handleClose={this.handleCloseContactusFormDialog}
          isOpen={this.state.openContactusFormDialog}
          currContactus={this.state.currentContactus}
          handleLoading={this.handleLoading}
          handleRefreshing={this.handleRefreshing}
        />
        <DeleteConfirmationDialog
          title="Delete Contact us"
          text="Are you sure that you want to permanently delete this contact us?"
          isOpen={this.state.openDeleteConfirmationDialog}
          handleCloseDeleteConfirmationDialog={
            this.handleCloseDeleteConfirmationDialog
          }
          handleConfirmDelete={this.handleConfirmDelete}
        />
        <DeleteConfirmationDialog
          title="Delete All Selected Contact us"
          text="Are you sure that you want to permanently delete these selected contact us?"
          isOpen={this.state.openDeleteSelectedConfirmationDialog}
          handleCloseDeleteConfirmationDialog={
            this.handleCloseDeleteSelectedConfirmationDialog
          }
          handleConfirmDelete={this.handleConfirmDeleteSelected}
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

export default Contactus;
