import React, { Component, Fragment } from "react";
import axios from "axios";
import { checkAuthorization } from "../../components/AuthService";
import SnackBar from "../../components/SnackBar";
import NewsFormDialog from "./NewsFormDialog";
import NewsListing from "./NewsListing";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";
import FAB from "../../components/FAB";
import Loader from "../../components/Loader";
import RefreshLoader from "../../components/RefreshLoader";
import { API_URL, headers } from "../../constants/Constants";
class News extends Component {
  state = {
    allNews: [],
    currentNews: null,
    selectedNews: [],
    openNewsFormDialog: false,
    openDeleteConfirmationDialog: false,
    openDeleteSelectedConfirmationDialog: false,
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarType: "success",
    isLoading: true,
    isRefreshing: false,
    dialogTitle: "Create New News",
    reset: false,
    errors: {
      Title_en: [],
      Title_ar: [],
      Image: [],
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
      .get(API_URL + "allNews")
      .then(response => {
        this.setState({ allNews: response.data.collection }, () => {
          this.handleLoading(false);
        });
      })
      .catch(function(error) {
        this.handleLoading(false);
        console.log(error);
      });
  };

  fabCallback = () => {
    if (!checkAuthorization("news_permissions", "can_create_news")) {
      this.setState({
        snackBarMessage: "You don't have permission to create news",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        openNewsFormDialog: true,
        reset: true,
        dialogTitle: "Add News"
      });
    }
  };

  handleCloseNewsFormDialog = () => {
    this.setState({
      openNewsFormDialog: false,
      currentNews: null,
      dialogTitle: "",
      errors: {
        Title_en: [],
        Title_ar: [],
        Image: [],
        Description_en: [],
        Description_ar: []
      }
    });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackBarOpen: false });
  };

  addToState = item => {
    let newData = this.state.allNews;
    newData.push(item);
    this.setState({ allNews: newData, isRefreshing: false });
  };

  handleSubmitNews = formData => {
    this.setState({ isRefreshing: true, reset: false });
    axios
      .post(API_URL + "allNews/CreateNews", formData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 0 && response.message != "form_error") {
          this.setState({
            openNewsFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "error",
            isRefreshing: false,
            currentNews: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            openNewsFormDialog: true,
            errors: response.data
          });
        } else if (response.res === 1) {
          this.addToState(response.data);
          this.setState({
            openNewsFormDialog: false,
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
    let newData = this.state.allNews;
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].ID == item.ID) {
        newData[i] = item;
        break;
      }
    }
    this.setState({ allNews: newData, isRefreshing: false });
  };

  handleUpdateNews = formData => {
    this.setState({ isRefreshing: true, reset: false });
    axios
      .post(API_URL + "allNews/EditNews", formData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 0 && response.message != "form_error") {
          this.setState({
            openNewsFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "error",
            isRefreshing: false,
            currentNews: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            errors: response.data,
            openNewsFormDialog: true
          });
        } else if (response.res === 1) {
          this.updateInState(response.data);
          this.setState({
            openNewsFormDialog: false,
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

  handleEdit = news => {
    if (!checkAuthorization("news_permissions", "can_edit_news")) {
      this.setState({
        snackBarMessage: "You don't have permission to edit news",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "Edit News",
        currentNews: news,
        openNewsFormDialog: true,
        reset: true
      });
    }
  };

  handleDelete = news => {
    if (!checkAuthorization("news_permissions", "can_delete_news")) {
      this.setState({
        snackBarMessage: "You don't have permission to delete news",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        currentNews: news,
        openDeleteConfirmationDialog: true
      });
    }
  };

  handleCloseDeleteConfirmationDialog = () => {
    this.setState({ openDeleteConfirmationDialog: false });
  };

  handleLoading = value => {
    this.setState({ isLoading: value });
  };

  handleRefreshing = value => {
    this.setState({ isRefreshing: value });
  };

  deleteSlectedNews = selectedNews => {
    if (!checkAuthorization("news_permissions", "can_delete_news")) {
      this.setState({
        snackBarMessage: "You don't have permission to delete news",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        openDeleteSelectedConfirmationDialog: true,
        selectedNews: selectedNews
      });
    }
  };

  handleConfirmDeleteSelected = () => {
    this.handleCloseDeleteSelectedConfirmationDialog();
    this.handleRefreshing(true);
    let formData = new FormData();
    formData.append("itemsIDs", JSON.stringify(this.state.selectedNews));

    axios
      .post(API_URL + "allNews/BatchDelete", formData, { headers: headers })
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
    let data = this.state.allNews;
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
    this.setState({ allNews: newData });
    this.handleRefreshing(false);
  };

  handleConfirmDelete = toBeDeleted => {
    this.handleRefreshing(true);
    if (toBeDeleted instanceof Array) {
      let formData = new FormData();
      formData.append("itemsIDs", JSON.stringify(toBeDeleted));
      axios
        .post(API_URL + "allNews/BatchDelete", formData, {
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
        .delete(API_URL + "allNews/" + toBeDeleted, { headers: headers })
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
        <NewsListing
          tableTitle="News"
          data={this.state.allNews}
          orderBy="ID"
          handleEdit={this.handleEdit}
          deleteSlectedNews={this.deleteSlectedNews}
          handleDelete={toBeDeleted => this.handleConfirmDelete(toBeDeleted)}
        />
        <NewsFormDialog
          dialogTitle={this.state.dialogTitle}
          handleClose={this.handleCloseNewsFormDialog}
          isOpen={this.state.openNewsFormDialog}
          news={this.state.currentNews}
          handleSubmitNews={this.handleSubmitNews}
          handleUpdateNews={this.handleUpdateNews}
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

export default News;
