import React, { Component, Fragment } from "react";
import axios from "axios";
import { checkAuthorization } from "../../components/AuthService";
import SnackBar from "../../components/SnackBar";
import NewsletterFormDialog from "./NewsletterFormDialog";
import NewsletterListing from "./NewsletterListing";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";
import FAB from "../../components/FAB";
import Loader from "../../components/Loader";
import RefreshLoader from "../../components/RefreshLoader";
import { API_URL, headers } from "../../constants/Constants";

class Newsletter extends Component {
  state = {
    newsletter: [],
    currentNewsletter: null,
    selectedNewsletter: [],
    openNewsletterFormDialog: false,
    openDeleteConfirmationDialog: false,
    openDeleteSelectedConfirmationDialog: false,
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarType: "success",
    isLoading: true,
    isRefreshing: false,
    dialogTitle: "View Newsletter"
  };

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    this.handleLoading(true);
    axios
      .get(API_URL + "newsletter")
      .then(response => {
        this.setState({ newsletter: response.data.collection }, () => {
          this.handleLoading(false);
        });
      })
      .catch(function(error) {
        this.handleLoading(false);
        console.log(error);
      });
  };

  handleCloseNewsletterFormDialog = () => {
    this.setState({ openNewsletterFormDialog: false });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackBarOpen: false });
  };

  handleView = currNewsletter => {
    if (!checkAuthorization("newsletter_permissions", "can_view_newsletter")) {
      this.setState({
        snackBarMessage: "You don't have permission to view newsletter",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "View Newsletter",
        currentNewsletter: currNewsletter,
        openNewsletterFormDialog: true
      });
    }
  };

  handleDelete = currNewsletter => {
    if (!checkAuthorization("newsletter_permissions", "can_delete_newsletter")) {
      this.setState({
        snackBarMessage: "You don't have permission to delete newsletter",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        currentNewsletter: currNewsletter,
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
      .delete(API_URL + "newsletter/" + this.state.currentNewsletter.ID, {
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

  deleteSlectedNewsletter = selectedNewsletter => {
    if (!checkAuthorization("newsletter_permissions", "can_delete_newsletter")) {
      this.setState({
        snackBarMessage: "You don't have permission to delete newsletter",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        openDeleteSelectedConfirmationDialog: true,
        selectedNewsletter: selectedNewsletter
      });
    }
  };

  handleConfirmDeleteSelected = () => {
    this.handleCloseDeleteSelectedConfirmationDialog();
    this.handleRefreshing(true);

    let formData = new FormData();
    formData.append("itemsIDs", JSON.stringify(this.state.selectedNewsletter));

    axios
      .post(API_URL + "newsletter/BatchDelete", formData, { headers: headers })
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
        <NewsletterListing
          tableTitle="Newsletter"
          data={this.state.newsletter}
          orderBy="ID"
          handleView={this.handleView}
          handleDelete={this.handleDelete}
          deleteSlectedNewsletter={this.deleteSlectedNewsletter}
        />
        <NewsletterFormDialog
          dialogTitle={this.state.dialogTitle}
          handleClose={this.handleCloseNewsletterFormDialog}
          isOpen={this.state.openNewsletterFormDialog}
          currNewsletter={this.state.currentNewsletter}
          handleLoading={this.handleLoading}
          handleRefreshing={this.handleRefreshing}
        />
        <DeleteConfirmationDialog
          title="Delete Newsletter"
          text="Are you sure that you want to permanently delete this newsletter?"
          isOpen={this.state.openDeleteConfirmationDialog}
          handleCloseDeleteConfirmationDialog={
            this.handleCloseDeleteConfirmationDialog
          }
          handleConfirmDelete={this.handleConfirmDelete}
        />
        <DeleteConfirmationDialog
          title="Delete All Selected Newsletter"
          text="Are you sure that you want to permanently delete these selected newsletter?"
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

export default Newsletter;
