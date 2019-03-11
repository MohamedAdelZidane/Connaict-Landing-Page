import React, { Component, Fragment } from "react";
import axios from "axios";
import { checkAuthorization } from "../../components/AuthService";
import SnackBar from "../../components/SnackBar";
import ProductsFormDialog from "./ProductsFormDialog";
import ProductsListing from "./ProductsListing";
import FAB from "../../components/FAB";
import Loader from "../../components/Loader";
import RefreshLoader from "../../components/RefreshLoader";
import { API_URL, headers } from "../../constants/Constants";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: [],
      brands: [],
      errors: {
        ArabicName: [],
        EnglishName: [],
        SortNumber: [],
        Image: [],
        CategoryID: [],
        BrandID: [],
        ArabicDescription: [],
        EnglishDescription: []
      },
      currentProduct: null,
      selectedProducts: [],
      openProductsFormDialog: false,
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarType: "success",
      isLoading: true,
      isRefreshing: false,
      dialogTitle: "Create New Product"
    };
  }

  componentDidMount() {
    this.handleLoading(true);
    this.getAll();
  }

  getAll = () => {
    axios
      .all([this.getProducts(), this.getCategories(), this.getBrands()])
      .then(() => {})
      .catch(err => {
        this.setState({ isLoading: false });
      });
  };

  getProducts = () => {
    axios
      .get(API_URL + "products")
      .then(response => {
        let products = response.data.collection;
        if (products) this.setState({ products: products, isLoading: false });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  getCategories = () => {
    axios
      .get(API_URL + "categories")
      .then(response => {
        let categories = response.data.collection;
        if (categories) this.setState({ categories: categories });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  getBrands = () => {
    axios
      .get(API_URL + "brands")
      .then(response => {
        let brands = response.data.collection;
        if (brands) this.setState({ brands: brands });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  fabCallback = () => {
    if (!checkAuthorization("products_permissions", "can_create_products")) {
      this.setState({
        snackBarMessage: "You don't have permission to create products",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "Add Product",
        openProductsFormDialog: true,
        reset: true
      });
    }
  };

  handleCloseProductFormDialog = () => {
    this.setState({
      openProductsFormDialog: false,
      currentProduct: null,
      errors: {
        ArabicName: [],
        EnglishName: [],
        SortNumber: [],
        Image: [],
        CategoryID: [],
        BrandID: [],
        ArabicDescription: [],
        EnglishDescription: []
      }
    });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackBarOpen: false });
  };

  addToState = product => {
    let newData = this.state.products;
    newData.push(product);
    this.setState({ products: newData, isRefreshing: false });
  };

  handleAdd = formData => {
    this.setState({ isRefreshing: true, reset: false });
    axios
      .post(API_URL + "products/AddProduct", formData, { headers: headers })
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
            currentProduct: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            errors: response.data,
            openProductsFormDialog: true
          });
        } else if (response.res === 1) {
          this.addToState(response.data);
          this.setState({
            currentProduct: null,
            reset: true,
            openProductsFormDialog: false,
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

  updateInState = product => {
    let newData = this.state.products;
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].ID == product.ID) {
        newData[i] = product;
        break;
      }
    }
    this.setState({ products: newData, isRefreshing: false });
  };

  handleUpdate = formData => {
    this.setState({ isRefreshing: true, reset: false });
    axios
      .post(API_URL + "products/EditProduct", formData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 0 && response.message != "form_error") {
          this.setState({
            openProductsFormDialog: false,
            snackBarMessage: response.message,
            snackBarOpen: true,
            snackBarType: "error",
            isRefreshing: false,
            currentProduct: null,
            reset: true
          });
        } else if (response.res === 0 && response.message === "form_error") {
          this.setState({
            reset: false,
            isRefreshing: false,
            errors: response.data,
            openProductsFormDialog: true
          });
        } else if (response.res === 1) {
          this.updateInState(response.data);
          this.setState({
            currentProduct: null,
            reset: true,
            isRefreshing: false,
            openProductsFormDialog: false,
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

  handleEdit = product => {
    if (!checkAuthorization("products_permissions", "can_edit_products")) {
      this.setState({
        snackBarMessage: "You don't have permission to edit products",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "Edit Products",
        currentProduct: product,
        openProductsFormDialog: true
      });
    }
  };

  handleConfirmDelete = () => {
    this.handleRefreshing(true);
    let id = this.state.currentProduct.ID;
    axios
      .delete(API_URL + "products/" + id, {
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
    let data = this.state.products;
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
    this.setState({ products: newData });
    this.handleRefreshing(false);
  };

  deleteSlectedProducts = selectedProducts => {
    if (!checkAuthorization("products_permissions", "can_delete_products")) {
      this.setState({
        snackBarMessage: "You don't have permission to delete products",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        openDeleteSelectedConfirmationDialog: true,
        selectedProducts: selectedProducts
      });
    }
  };

  handleConfirmDelete = toBeDeleted => {
    this.handleRefreshing(true);
    if (toBeDeleted instanceof Array) {
      let formData = new FormData();
      formData.append("itemsIDs", JSON.stringify(toBeDeleted));
      axios
        .post(API_URL + "products/BatchDelete", formData, {
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
        .delete(API_URL + "products/" + toBeDeleted, { headers: headers })
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
        <ProductsListing
          tableTitle="Products"
          data={this.state.products}
          orderBy="ID"
          handleEdit={this.handleEdit}
          handleDelete={toBeDeleted => this.handleConfirmDelete(toBeDeleted)}
        />
        <ProductsFormDialog
          dialogTitle={this.state.dialogTitle}
          handleClose={this.handleCloseProductFormDialog}
          categories={this.state.categories}
          brands={this.state.brands}
          isOpen={this.state.openProductsFormDialog}
          product={this.state.currentProduct}
          handleAdd={this.handleAdd}
          handleUpdate={this.handleUpdate}
          handleLoading={this.handleLoading}
          handleRefreshing={this.handleRefreshing}
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

export default Products;
