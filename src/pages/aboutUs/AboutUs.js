import React, { Component, Fragment } from "react";
import axios from "axios";
import { checkAuthorization } from "../../components/AuthService";
import SnackBar from "../../components/SnackBar";
import AboutUsFormDialog from "./AboutUsFormDialog";
import AboutUsListing from "./AboutUsListing";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";
import FAB from "../../components/FAB";
import Loader from "../../components/Loader";
import RefreshLoader from "../../components/RefreshLoader";
import { API_URL, headers } from "../../constants/Constants";

class AboutUs extends Component {
  state = {
    aboutus: [],
    currentAboutUs: null,
    selectedAboutUs: [],
    openAboutUsFormDialog: false,
    openDeleteConfirmationDialog: false,
    openDeleteSelectedConfirmationDialog: false,
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarType: "success",
    isLoading: true,
    isRefreshing: false,
    dialogTitle: "Create New About Us",
    reset: false,
    errors: {
      Title_en: [],
      Title_ar: [],
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
      .get(API_URL + "aboutus")
      .then(response => {
        this.setState({ aboutus: response.data.collection }, () => {
          this.handleLoading(false);
        });
      })
      .catch(function(error) {
        this.handleLoading(false);
        console.log(error);
      });
  };

  fabCallback = () => {
    if (!checkAuthorization("aboutus_permissions", "can_create_aboutus")) {
      this.setState({
        snackBarMessage: "You don't have permission to create aboutus",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        openAboutUsFormDialog: true,
        reset: true,
        dialogTitle: "Add News"
      });
    }
  };

  handleCloseAboutUsFormDialog = () => {
    this.setState({
      openAboutUsFormDialog: false,
      currentAboutUs: null,
      dialogTitle: "",
      errors: {
        Title_en: [],
        Title_ar: [],
        Description_en: [],
        Description_ar: []
      }
    });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackBarOpen: false });
  };

  addToState = item => {
    let newData = this.state.aboutus;
    newData.push(item);
    this.setState({ aboutus: newData, isRefreshing: false });
  };

  handleSubmitAboutUs = formData => {
    this.setState({ isRefreshing: true, reset: false });
    axios
      .post(API_URL + "aboutus", formData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 0 && response.message != "form_error") {
          this.setState({
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "error",
            isRefreshing: false,
            currentAboutUs: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            openAboutUsFormDialog: true,
            errors: response.data
          });
        } else if (response.res === 1) {
          this.addToState(response.data);
          this.setState({
            openAboutUsFormDialog: false,
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
    let newData = this.state.aboutus;
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].ID == item.ID) {
        newData[i] = item;
        break;
      }
    }
    this.setState({ aboutus: newData, isRefreshing: false });
  };

  handleUpdateAboutUS = formData => {
    this.setState({ isRefreshing: true, reset: false });
    axios
      .post(API_URL + "aboutus/EditAboutUS", formData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 0 && response.message != "form_error") {
          this.setState({
            openAboutUsFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "error",
            isRefreshing: false,
            currentAboutUs: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            errors: response.data,
            openAboutUsFormDialog: true
          });
        } else if (response.res === 1) {
          this.updateInState(response.data);
          this.setState({
            openAboutUsFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "success",
            currentAboutUs: null,
            reset: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleEdit = currAboutUs => {
    if (!checkAuthorization("aboutus_permissions", "can_edit_aboutus")) {
      this.setState({
        snackBarMessage: "You don't have permission to edit aboutus",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "Edit About Us",
        currentAboutUs: currAboutUs,
        openAboutUsFormDialog: true,
        reset: true
      });
    }
  };

  handleDelete = currAboutUs => {
    if (!checkAuthorization("aboutus_permissions", "can_delete_aboutus")) {
      this.setState({
        snackBarMessage: "You don't have permission to delete aboutus",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        currentAboutUs: currAboutUs,
        openDeleteConfirmationDialog: true
      });
    }
  };

  handleCloseDeleteConfirmationDialog = () => {
    this.setState({ openDeleteConfirmationDialog: false });
  };

  // handleConfirmDelete = () => {
  //   this.handleCloseDeleteConfirmationDialog();
  //   this.handleRefreshing(true);
  //   axios
  //     .delete(API_URL + "aboutus/" + this.state.currentAboutUs.ID, {
  //       headers: headers
  //     })
  //     .then(response => {
  //       return response.data;
  //     })
  //     .then(response => {
  //       if (response.res === 0) {
  //         this.setState({
  //           snackBarMessage: response.message,
  //           snackBarOpen: true,
  //           snackBarType: "error",
  //           isRefreshing: false
  //         });
  //       } else {
  //         this.setState(
  //           {
  //             snackBarMessage: response.message,
  //             snackBarOpen: true,
  //             snackBarType: "success"
  //           },
  //           () => {
  //             this.getAll();
  //             this.handleRefreshing(false);
  //           }
  //         );
  //       }
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // };

  handleLoading = value => {
    this.setState({ isLoading: value });
  };

  handleRefreshing = value => {
    this.setState({ isRefreshing: value });
  };

  deleteSlectedAboutUs = selectedAboutUs => {
    if (!checkAuthorization("aboutus_permissions", "can_delete_aboutus")) {
      this.setState({
        snackBarMessage: "You don't have permission to delete aboutus",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        openDeleteSelectedConfirmationDialog: true,
        selectedAboutUs: selectedAboutUs
      });
    }
  };

  handleConfirmDeleteSelected = () => {
    this.handleCloseDeleteSelectedConfirmationDialog();
    this.handleRefreshing(true);
    let formData = new FormData();
    formData.append("itemsIDs", JSON.stringify(this.state.selectedAboutUs));
    axios
      .post(API_URL + "aboutus/BatchDelete", formData, { headers: headers })
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

  removeDeletedFromData = items => {
    let data = this.state.aboutus;
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
    this.setState({ aboutus: newData });
    this.handleRefreshing(false);
  };

  handleConfirmDelete = toBeDeleted => {
    this.handleRefreshing(true);
    if (toBeDeleted instanceof Array) {
      let formData = new FormData();
      formData.append("itemsIDs", JSON.stringify(toBeDeleted));
      axios
        .post(API_URL + "aboutus/BatchDelete", formData, {
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
        .delete(API_URL + "aboutus/" + toBeDeleted, { headers: headers })
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
        <AboutUsListing
          tableTitle="About Us"
          data={this.state.aboutus}
          orderBy="ID"
          handleEdit={this.handleEdit}
          // handleDelete={this.handleDelete}
          deleteSlectedAboutUs={this.deleteSlectedAboutUs}
          handleDelete={toBeDeleted => this.handleConfirmDelete(toBeDeleted)}
        />
        <AboutUsFormDialog
          dialogTitle={this.state.dialogTitle}
          handleClose={this.handleCloseAboutUsFormDialog}
          isOpen={this.state.openAboutUsFormDialog}
          currAboutUs={this.state.currentAboutUs}
          handleSubmitAboutUs={this.handleSubmitAboutUs}
          handleUpdateAboutUS={this.handleUpdateAboutUS}
          handleLoading={this.handleLoading}
          handleRefreshing={this.handleRefreshing}
          reset={this.state.reset}
          errors={this.state.errors}
        />
        <DeleteConfirmationDialog
          title="Delete About Us"
          text="Are you sure that you want to permanently delete this about us?"
          isOpen={this.state.openDeleteConfirmationDialog}
          handleCloseDeleteConfirmationDialog={
            this.handleCloseDeleteConfirmationDialog
          }
          handleConfirmDelete={this.handleConfirmDelete}
        />
        <DeleteConfirmationDialog
          title="Delete Selected About Us"
          text="Are you sure that you want to permanently delete these selected about us?"
          isOpen={this.state.openDeleteSelectedConfirmationDialog}
          handleCloseDeleteConfirmationDialog={
            this.handleCloseDeleteSelectedConfirmationDialog
          }
          handleConfirmDelete={this.handleConfirmDeleteSelected}
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

export default AboutUs;
