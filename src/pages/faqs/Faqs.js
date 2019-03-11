import React, { Component, Fragment } from "react";
import axios from "axios";
import { checkAuthorization } from "../../components/AuthService";
import SnackBar from "../../components/SnackBar";
import FaqFormDialog from "./FaqFormDialog";
import FaqsListing from "./FaqsListing";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";
import FAB from "../../components/FAB";
import Loader from "../../components/Loader";
import RefreshLoader from "../../components/RefreshLoader";
import { API_URL, headers } from "../../constants/Constants";

class Faqs extends Component {
  state = {
    faqs: [],
    currentFaq: null,
    selectedFaqs: [],
    openFaqFormDialog: false,
    openDeleteConfirmationDialog: false,
    openDeleteSelectedConfirmationDialog: false,
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarType: "success",
    isLoading: true,
    isRefreshing: false,
    dialogTitle: "Create New FAQ",
    reset: false,
    errors: {
      Question_en: [],
      Question_ar: [],
      Answer_en: [],
      Answer_ar: []
    }
  };

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    this.handleLoading(true);
    axios
      .get(API_URL + "faqs")
      .then(response => {
        this.setState({ faqs: response.data.collection }, () => {
          this.handleLoading(false);
        });
      })
      .catch(function(error) {
        this.handleLoading(false);
        console.log(error);
      });
  };

  fabCallback = () => {
    if (!checkAuthorization("faqs_permissions", "can_create_faqs")) {
      this.setState({
        snackBarMessage: "You don't have permission to create faqs",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        openFaqFormDialog: true,
        reset: true,
        dialogTitle: "Add FAQ"
      });
    }
  };

  handleCloseFaqFormDialog = () => {
    this.setState({
      openFaqFormDialog: false,
      currentFaq: null,
      dialogTitle: "",
      errors: {
        Question_en: [],
        Question_ar: [],
        Answer_en: [],
        Answer_ar: []
      }
    });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackBarOpen: false });
  };

  addToState = item => {
    let newData = this.state.faqs;
    newData.push(item);
    this.setState({ faqs: newData, isRefreshing: false });
  };

  handleSubmitFaq = formData => {
    this.setState({ isRefreshing: true, reset: false });
    axios
      .post(API_URL + "faqs/CreateFaq", formData, { headers: headers })
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
            currentFaq: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            openFaqFormDialog: true,
            errors: response.data
          });
        } else if (response.res === 1) {
          this.addToState(response.data);
          this.setState({
            openFaqFormDialog: false,
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
    let newData = this.state.faqs;
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].ID == item.ID) {
        newData[i] = item;
        break;
      }
    }
    this.setState({ faqs: newData, isRefreshing: false });
  };

  handleUpdateFaq = formData => {
    this.setState({ isRefreshing: true, reset: false });
    axios
      .post(API_URL + "faqs/EditFaq", formData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 0 && response.message != "form_error") {
          this.setState({
            openFaqFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "error",
            isRefreshing: false,
            currentFaq: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            errors: response.data,
            openFaqFormDialog: true
          });
        } else if (response.res === 1) {
          this.updateInState(response.data);
          this.setState({
            openFaqFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "success",
            currentFaq: null,
            reset: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleEdit = faq => {
    if (!checkAuthorization("faqs_permissions", "can_edit_faqs")) {
      this.setState({
        snackBarMessage: "You don't have permission to edit faqs",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "Edit FAQ",
        currentFaq: faq,
        openFaqFormDialog: true,
        reset: true
      });
    }
  };

  handleDelete = faq => {
    if (!checkAuthorization("faqs_permissions", "can_delete_faqs")) {
      this.setState({
        snackBarMessage: "You don't have permission to delete faqs",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        currentFaq: faq,
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
  //     .delete(API_URL + "faqs/" + this.state.currentFaq.ID, {
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

  removeDeletedFromData = items => {
    let data = this.state.faqs;
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
    this.setState({ faqs: newData });
    this.handleRefreshing(false);
  };

  handleConfirmDelete = toBeDeleted => {
    this.handleRefreshing(true);
    if (toBeDeleted instanceof Array) {
      let formData = new FormData();
      formData.append("itemsIDs", JSON.stringify(toBeDeleted));
      axios
        .post(API_URL + "faqs/BatchDelete", formData, {
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
        .delete(API_URL + "faqs/" + toBeDeleted, { headers: headers })
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

  deleteSlectedFaqs = selectedFaqs => {
    if (!checkAuthorization("faqs_permissions", "can_delete_faqs")) {
      this.setState({
        snackBarMessage: "You don't have permission to delete faqs",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        openDeleteSelectedConfirmationDialog: true,
        selectedFaqs: selectedFaqs
      });
    }
  };

  handleConfirmDeleteSelected = () => {
    this.handleCloseDeleteSelectedConfirmationDialog();
    this.handleRefreshing(true);
    let formData = new FormData();
    formData.append("itemsIDs", JSON.stringify(this.state.selectedFaqs));

    axios
      .post(API_URL + "faqs/BatchDelete", formData, { headers: headers })
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
        <FaqsListing
          tableTitle="FAQS"
          data={this.state.faqs}
          orderBy="ID"
          handleEdit={this.handleEdit}
          // handleDelete={this.handleDelete}
          handleDelete={toBeDeleted => this.handleConfirmDelete(toBeDeleted)}
          deleteSlectedFaqs={this.deleteSlectedFaqs}
        />
        <FaqFormDialog
          dialogTitle={this.state.dialogTitle}
          handleClose={this.handleCloseFaqFormDialog}
          isOpen={this.state.openFaqFormDialog}
          faq={this.state.currentFaq}
          handleSubmitFaq={this.handleSubmitFaq}
          handleUpdateFaq={this.handleUpdateFaq}
          handleLoading={this.handleLoading}
          handleRefreshing={this.handleRefreshing}
          reset={this.state.reset}
          errors={this.state.errors}
        />
        <DeleteConfirmationDialog
          title="Delete Faq"
          text="Are you sure that you want to permanently delete this faq?"
          isOpen={this.state.openDeleteConfirmationDialog}
          handleCloseDeleteConfirmationDialog={
            this.handleCloseDeleteConfirmationDialog
          }
          handleConfirmDelete={this.handleConfirmDelete}
        />
        <DeleteConfirmationDialog
          title="Delete Selected Faqs"
          text="Are you sure that you want to permanently delete these selected faqs?"
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

export default Faqs;
