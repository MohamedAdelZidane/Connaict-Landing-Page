import React, { Component, Fragment } from "react";
import axios from "axios";
import { checkAuthorization } from "../../components/AuthService";
import SnackBar from "../../components/SnackBar";
import DownloadsFormDialog from "./DownloadsFormDialog";
import DownloadsListing from "./DownloadsListing";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";
import FAB from "../../components/FAB";
import Loader from "../../components/Loader";
import RefreshLoader from "../../components/RefreshLoader";
import { API_URL, headers } from "../../constants/Constants";

class Downloads extends Component {
  state = {
    downloads: [],
    currentDownload: null,
    selectedDownloads: [],
    openDownloadsFormDialog: false,
    openDeleteConfirmationDialog: false,
    openDeleteSelectedConfirmationDialog: false,
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarType: "success",
    isLoading: true,
    isRefreshing: false,
    dialogTitle: "Create New Download",
    reset: false,
    errors: {
      Title_en: [],
      Title_ar: [],
      file: [],
      Description_en: [],
      Description_ar: []
    }
  };

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    this.handleLoading(true);
    axios
      .get(API_URL + "downloads")
      .then(response => {
        this.setState({ downloads: response.data.collection }, () => {
          this.handleLoading(false);
        });
      })
      .catch(function(error) {
        this.handleLoading(false);
        console.log(error);
      });
  };

  fabCallback = () => {
    if (!checkAuthorization("downloads_permissions", "can_create_downloads")) {
      this.setState({
        snackBarMessage: "You don't have permission to create downloads",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        openDownloadsFormDialog: true,
        reset: true,
        dialogTitle: "Add download"
      });
    }
  };

  handleCloseDownloadsFormDialog = () => {
    this.setState({
      openDownloadsFormDialog: false,
      currentDownload: null,
      dialogTitle: "",
      errors: {
        Title_en: [],
        Title_ar: [],
        file: [],
        Description_en: [],
        Description_ar: []
      }
    });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackBarOpen: false });
  };

  addToState = item => {
    let newData = this.state.downloads;
    newData.push(item);
    this.setState({ downloads: newData, isRefreshing: false });
  };

  handleSubmitDownload = formData => {
    this.setState({ isRefreshing: true, reset: false });

    axios
      .post(API_URL + "downloads/CreateDownload", formData, {
        headers: headers
      })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 0 && response.message != "form_error") {
          this.setState({
            openDownloadsFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "error",
            isRefreshing: false,
            currentDownload: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            openDownloadsFormDialog: true,
            errors: response.data
          });
        } else if (response.res === 1) {
          this.addToState(response.data);
          this.setState({
            openDownloadsFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "success",
            reset: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  updateInState = item => {
    let newData = this.state.downloads;
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].ID == item.ID) {
        newData[i] = item;
        break;
      }
    }
    this.setState({ downloads: newData, isRefreshing: false });
  };

  handleUpdateDownload = formData => {
    this.setState({ isRefreshing: true, reset: false });
    axios
      .post(API_URL + "downloads/EditDownload", formData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        console.log(response);
        if (response.res === 0 && response.message != "form_error") {
          this.setState({
            openDownloadsFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "error",
            isRefreshing: false,
            currentDownload: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            errors: response.data,
            openDownloadsFormDialog: true
          });
        } else if (response.res === 1) {
          this.updateInState(response.data);
          this.setState({
            openDownloadsFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "success",
            reset: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleEdit = download => {
    if (!checkAuthorization("downloads_permissions", "can_edit_downloads")) {
      this.setState({
        snackBarMessage: "You don't have permission to edit downloads",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "Edit Download",
        currentDownload: download,
        openDownloadsFormDialog: true,
        reset: true
      });
    }
  };

  removeDeletedFromData = items => {
    let data = this.state.downloads;
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
    this.setState({ downloads: newData });
    this.handleRefreshing(false);
  };

  handleConfirmDelete = toBeDeleted => {
    this.handleRefreshing(true);
    if (toBeDeleted instanceof Array) {
      let formData = new FormData();
      formData.append("itemsIDs", JSON.stringify(toBeDeleted));
      axios
        .post(API_URL + "downloads/BatchDelete", formData, {
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
        .delete(API_URL + "downloads/" + toBeDeleted, { headers: headers })
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

  handleLoading = value => {
    this.setState({ isLoading: value });
  };

  handleRefreshing = value => {
    this.setState({ isRefreshing: value });
  };

  render() {
    return (
      <Fragment>
        <DownloadsListing
          tableTitle="Downloads"
          data={this.state.downloads}
          orderBy="ID"
          handleEdit={this.handleEdit}
          // handleDelete={this.handleDelete}
          handleDelete={toBeDeleted => this.handleConfirmDelete(toBeDeleted)}
          deleteSlectedDownloads={this.deleteSlectedDownloads}
        />
        <DownloadsFormDialog
          dialogTitle={this.state.dialogTitle}
          handleClose={this.handleCloseDownloadsFormDialog}
          isOpen={this.state.openDownloadsFormDialog}
          download={this.state.currentDownload}
          handleSubmitDownload={this.handleSubmitDownload}
          handleUpdateDownload={this.handleUpdateDownload}
          handleLoading={this.handleLoading}
          handleRefreshing={this.handleRefreshing}
          reset={this.state.reset}
          errors={this.state.errors}
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

export default Downloads;
