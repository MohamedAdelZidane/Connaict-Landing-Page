import React, { Component, Fragment } from "react";
import axios from "axios";
import { checkAuthorization } from "../../components/AuthService";
import SnackBar from "../../components/SnackBar";
import CategoriesFormDialog from "./CategoriesFormDialog";
import CategoriesListing from "./CategoriesListing";
import FAB from "../../components/FAB";
import Loader from "../../components/Loader";
import RefreshLoader from "../../components/RefreshLoader";
import { API_URL, headers } from "../../constants/Constants";
import Button from "@material-ui/core/Button";
import NavigationIcon from "@material-ui/icons/Navigation";
import Tree from "./Tree";
class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currentCategory: null,
      selectedCategory: [],
      openCategoriesFormDialog: false,
      openDeleteConfirmationDialog: false,
      openDeleteSelectedConfirmationDialog: false,
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarType: "success",
      isLoading: true,
      isRefreshing: false,
      dialogTitle: "Create New Category",
      reset: false,
      openTree: false,
      tree: [],
      errors: {
        ArabicName: [],
        EnglishName: [],
        SortNumber: [],
        Image: [],
        ParentID: [],
        ArabicDescription: [],
        EnglishDescription: []
      }
    };
  }

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    axios
      .get(API_URL + "categories")
      .then(response => {
        let categories = response.data.collection;
        if (categories)
          this.setState({ categories: categories, isLoading: false });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  fabCallback = () => {
    if (
      !checkAuthorization("categories_permissions", "can_create_categories")
    ) {
      this.setState({
        snackBarMessage: "You don't have permission to create categories",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "Add Category",
        openCategoriesFormDialog: true,
        reset: true
      });
    }
  };

  handleCloseCategoryFormDialog = () => {
    this.setState({
      openCategoriesFormDialog: false,
      currentCategory: null,
      errors: {
        ArabicName: [],
        EnglishName: [],
        SortNumber: [],
        Image: [],
        ParentID: [],
        ArabicDescription: [],
        EnglishDescription: []
      }
    });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackBarOpen: false });
  };

  addToState = category => {
    let newData = this.state.categories;
    newData.push(category);
    this.setState({ categories: newData, isRefreshing: false });
  };

  handleAdd = formData => {
    this.setState({ isRefreshing: true, reset: false });
    axios
      .post(API_URL + "categories", formData, { headers: headers })
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
            currentCategory: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            openCategoriesFormDialog: true,
            errors: response.data
          });
        } else if (response.res === 1) {
          this.addToState(response.data);
          this.setState({
            openCategoriesFormDialog: false,
            reset: true,
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

  updateInState = category => {
    let newData = this.state.categories;
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].ID == category.ID) {
        console.log(category.ID);
        newData[i] = category;
        break;
      }
    }
    this.setState({ categories: newData, isRefreshing: false });
  };

  handleUpdate = formData => {
    this.setState({ isRefreshing: true, reset: false });
    axios
      .post(API_URL + "categories", formData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 0 && response.message != "form_error") {
          this.setState({
            openCategoriesFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "error",
            isRefreshing: false,
            currentCategory: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            errors: response.data,
            openCategoriesFormDialog: true
          });
        } else if (response.res === 1) {
          this.updateInState(response.data);
          this.setState({
            reset: true,
            currentCategory: null,
            openCategoriesFormDialog: false,
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

  handleEdit = category => {
    if (!checkAuthorization("categories_permissions", "can_edit_categories")) {
      this.setState({
        snackBarMessage: "You don't have permission to edit categories",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "Edit Category",
        currentCategory: category,
        openCategoriesFormDialog: true,
        reset: true
      });
    }
  };

  handleConfirmDelete = () => {
    this.handleRefreshing(true);
    let id = this.state.currentCategory.ID;
    axios
      .delete(API_URL + "categories/" + id, {
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
    let data = this.state.categories;
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
    this.setState({ categories: newData });
    this.handleRefreshing(false);
  };

  deleteSlectedCategories = selectedCategory => {
    if (
      !checkAuthorization("categories_permissions", "can_delete_categories")
    ) {
      this.setState({
        snackBarMessage: "You don't have permission to delete categories",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        openDeleteSelectedConfirmationDialog: true,
        selectedCategory: selectedCategory
      });
    }
  };

  handleConfirmDelete = toBeDeleted => {
    this.handleRefreshing(true);
    if (toBeDeleted instanceof Array) {
      let formData = new FormData();
      formData.append("itemsIDs", JSON.stringify(toBeDeleted));
      axios
        .post(API_URL + "categories/BatchDelete", formData, {
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
        .delete(API_URL + "categories/" + toBeDeleted, { headers: headers })
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

  handleCatgeoriesTreeOpen = () => {
    this.handleRefreshing(true);
    axios
      .get(API_URL + "categories/GetCategoriesTree")
      .then(response => {
        return response.data;
      })
      .then(response => {
        let data = response.data;
        this.handleRefreshing(false);
        if (data) this.setState({ tree: data, openTree: true });
      })
      .catch(function(error) {
        this.handleRefreshing(false);
        console.log(error);
      });
  };

  handleCatgeoriesTreeClose = () => {
    this.setState({ openTree: false });
  };

  handleTreeDataChanged = treeData => {
    this.handleCatgeoriesTreeClose();
    let formData = new FormData();
    formData.append("treeData", JSON.stringify(treeData));
    this.handleRefreshing(true);
    axios
      .post(API_URL + "categories/ChangeCategoriesTree", formData, {
        headers: headers
      })
      .then(response => {
        return response.data;
      })
      .then(response => {
        this.handleRefreshing(false);
        if (response.res === 1) {
          this.setState({
            snackBarOpen: true,
            snackBarType: "success",
            snackBarMessage: response.message
          });
        } else {
          this.setState({
            snackBarOpen: true,
            snackBarType: "error",
            snackBarMessage: response.message
          });
        }
      })
      .catch(function(error) {
        this.handleRefreshing(false);
        console.log(error);
      });
  };

  render() {
    return (
      <Fragment>
        <Button
          variant="extendedFab"
          component="span"
          color="secondary"
          onClick={() => this.handleCatgeoriesTreeOpen()}
        >
          <NavigationIcon />
          Categories Tree
        </Button>
        <CategoriesListing
          tableTitle="Categories"
          data={this.state.categories}
          orderBy="ID"
          handleEdit={this.handleEdit}
          handleDelete={toBeDeleted => this.handleConfirmDelete(toBeDeleted)}
        />
        <CategoriesFormDialog
          dialogTitle={this.state.dialogTitle}
          handleClose={this.handleCloseCategoryFormDialog}
          isOpen={this.state.openCategoriesFormDialog}
          category={this.state.currentCategory}
          handleAdd={this.handleAdd}
          handleUpdate={this.handleUpdate}
          handleLoading={this.handleLoading}
          handleRefreshing={this.handleRefreshing}
          categories={this.state.categories}
          errors={this.state.errors}
          reset={this.state.reset}
        />
        <Tree
          isOpen={this.state.openTree}
          data={this.state.tree}
          handleClose={() => this.handleCatgeoriesTreeClose()}
          handleTreeDataChanged={data => this.handleTreeDataChanged(data)}
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

export default Categories;
