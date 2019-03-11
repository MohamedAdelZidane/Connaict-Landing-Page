import React, { Component, Fragment } from "react";
import axios from "axios";
import { checkAuthorization } from "../../components/AuthService";
import SnackBar from "../../components/SnackBar";
import BrandsFormDialog from "./BrandsFormDialog";
import BrandsListing from "./BrandsListing";
import FAB from "../../components/FAB";
import Loader from "../../components/Loader";
import RefreshLoader from "../../components/RefreshLoader";
import { API_URL, headers } from "../../constants/Constants";

class Brands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      currentBrand: null,
      selectedBrands: [],
      openBrandsFormDialog: false,
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarType: "success",
      isLoading: true,
      isRefreshing: false,
      dialogTitle: "Create New Brand",
      reset: false,
      errors: {
        ArabicName: [],
        EnglishName: [],
        SortNumber: [],
        Image: [],
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
      .get(API_URL + "brands")
      .then(response => {
        let brands = response.data.collection;
        if (brands) this.setState({ brands: brands, isLoading: false });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  fabCallback = () => {
    if (!checkAuthorization("brands_permissions", "can_create_brands")) {
      this.setState({
        snackBarMessage: "You don't have permission to create brands",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "Add Brand",
        openBrandsFormDialog: true,
        reset: true
      });
    }
  };

  handleCloseBrandFormDialog = () => {
    this.setState({
      openBrandsFormDialog: false,
      currentBrand: null,
      errors: {
        ArabicName: [],
        EnglishName: [],
        SortNumber: [],
        Image: [],
        ArabicDescription: [],
        EnglishDescription: []
      }
    });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackBarOpen: false });
  };

  addToState = brand => {
    let newData = this.state.brands;
    newData.push(brand);
    this.setState({ brands: newData, isRefreshing: false });
  };

  handleAdd = formData => {
    this.setState({ isRefreshing: true, reset: false });
    axios
      .post(API_URL + "brands", formData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 0 && response.message != "form_error") {
          this.setState({
            openBrandsFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "error",
            isRefreshing: false,
            currentBrand: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            openBrandsFormDialog: true,
            errors: response.data
          });
        } else if (response.res === 1) {
          this.addToState(response.data);
          this.setState({
            reset: true,
            openBrandsFormDialog: false,
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

  updateInState = brand => {
    let newData = this.state.brands;
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].ID == brand.ID) {
        newData[i] = brand;
        break;
      }
    }
    this.setState({ brands: newData, isRefreshing: false });
  };

  handleUpdate = formData => {
    this.setState({ isRefreshing: true, reset: false });
    axios
      .post(API_URL + "brands", formData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 0 && response.message != "form_error") {
          this.setState({
            openBrandsFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "error",
            isRefreshing: false,
            currentBrand: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            errors: response.data,
            openBrandsFormDialog: true
          });
        } else if (response.res === 1) {
          this.updateInState(response.data);
          this.setState({
            openBrandsFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "success",
            reset: true,
            currentBrand: null
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleEdit = brand => {
    if (!checkAuthorization("brands_permissions", "can_edit_brands")) {
      this.setState({
        snackBarMessage: "You don't have permission to edit brands",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "Edit Brand",
        currentBrand: brand,
        openBrandsFormDialog: true,
        reset: true
      });
    }
  };

  // handleConfirmDelete = () => {
  //   this.handleRefreshing(true);
  //   let id = this.state.currentBrand.ID;
  //   axios
  //     .delete(API_URL + "brands/" + id, {
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
  //         this.removeDeletedFromData(id);
  //         this.setState({
  //           snackBarMessage: response.message,
  //           snackBarOpen: true,
  //           snackBarType: "sucess"
  //         });
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

  removeDeletedFromData = items => {
    let data = this.state.brands;
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
    this.setState({ brands: newData });
    this.handleRefreshing(false);
  };

  deleteSlectedbrands = selectedbrands => {
    if (!checkAuthorization("brands_permissions", "can_delete_brands")) {
      this.setState({
        snackBarMessage: "You don't have permission to delete brands",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        openDeleteSelectedConfirmationDialog: true,
        selectedbrands: selectedbrands
      });
    }
  };

  handleConfirmDelete = toBeDeleted => {
    this.handleRefreshing(true);
    if (toBeDeleted instanceof Array) {
      let formData = new FormData();
      formData.append("itemsIDs", JSON.stringify(toBeDeleted));
      axios
        .post(API_URL + "brands/BatchDelete", formData, {
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
        .delete(API_URL + "brands/" + toBeDeleted, { headers: headers })
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

  handleConfirmDeleteSelected = () => {
    let selectedItems = this.state.selectedBrands;
    this.handleCloseDeleteSelectedConfirmationDialog();
    this.handleRefreshing(true);
    let formData = new FormData();
    formData.append("itemsIDs", JSON.stringify(selectedItems));
    axios
      .post(API_URL + "brands/BatchDelete", formData, { headers: headers })
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
          this.removeDeletedFromData(selectedItems);
          this.setState({
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "success",
            isRefreshing: false
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <Fragment>
        <BrandsListing
          tableTitle="Brands"
          data={this.state.brands}
          orderBy="ID"
          handleEdit={this.handleEdit}
          handleDelete={toBeDeleted => this.handleConfirmDelete(toBeDeleted)}
        />
        <BrandsFormDialog
          dialogTitle={this.state.dialogTitle}
          handleClose={this.handleCloseBrandFormDialog}
          isOpen={this.state.openBrandsFormDialog}
          brand={this.state.currentBrand}
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

export default Brands;
