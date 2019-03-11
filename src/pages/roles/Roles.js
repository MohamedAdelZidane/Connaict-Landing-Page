import React, { Component, Fragment } from "react";
import axios from "axios";
import Table from "./RolesListing";
import { API_URL } from "../../constants/Constants";
import FAB from "../../components/FAB";
import RoleFormDialog from "./RoleFormDialog";
import RefreshLoader from "../../components/RefreshLoader";
import Loader from "../../components/Loader";
import SnackBar from "../../components/SnackBar";
import { headers } from "../../constants/Constants";
import { checkAuthorization } from "../../components/AuthService";

class Roles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      openRoleFormDialog: false,
      dialogTitle: "Create New Role",
      currentRole: null,
      isLoading: false,
      isRefreshing: false,
      snackBarMessage: "",
      snackBarOpen: false,
      snackBarType: "success"
    };
  }

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    this.handleLoading(true);
    axios
      .get(API_URL + "roles")
      .then(response => {
        let newRoles = response.data.collection;
        this.setState({ roles: newRoles }, () => {
          this.handleLoading(false);
        });
      })
      .catch(err => {
        this.handleLoading(false);
      });
  };

  deleteRoles = deletedRoles => {
    let newRoles = [];
    for (let i = 0; i < this.state.roles.length; i++) {
      let check = true;
      for (let j = 0; j < deletedRoles.length; j++) {
        if (this.state.roles[i].ID === deletedRoles[j]) {
          check = false;
          break;
        }
      }
      if (check) newRoles.push(this.state.roles[i]);
    }
    this.setState({ roles: newRoles }, () => {});
    let msg =
      deletedRoles.length === 1
        ? "1 Role has been deleted succussefully"
        : deletedRoles.length + " Roles have been deleted succussefully";
    this.setState({
      snackBarMessage: msg,
      snackBarType: "info",
      snackBarOpen: true
    });
    setTimeout(() => {
      this.setState({ snackBarOpen: false });
    }, 3000);
  };

  fabCallback = () => {
    if (!checkAuthorization("roles_permissions", "can_create_roles")) {
      this.setState({
        snackBarMessage: "You don't have permission to create roles",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "Create New Role",
        currentRole: null,
        openRoleFormDialog: true
      });
    }
  };

  handleCloseFormDialog = () => {
    this.setState({ openRoleFormDialog: false });
  };

  handleEdit = role => {
    if (!checkAuthorization("roles_permissions", "can_edit_roles")) {
      this.setState({
        snackBarMessage: "You don't have permission to edit roles",
        snackBarType: "error",
        snackBarOpen: true
      });
    } else {
      this.setState({
        dialogTitle: "Edit Role",
        currentRole: role,
        openRoleFormDialog: true
      });
    }
  };

  updateRole = formData => {
    this.handleCloseFormDialog();
    this.handleRefreshing(true);
    axios
      .post(API_URL + "admins/EditRole", formData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 1) {
          this.updateInState(response.data);
          this.handleRefreshing(false);
          this.setState({
            snackBarMessage: response.message,
            snackBarType: "info",
            snackBarOpen: true
          });
          setTimeout(() => {
            this.setState({ snackBarOpen: false });
          }, 3000);
        } else if (response.res === 0) {
          this.handleRefreshing(false);
          this.setState({
            snackBarMessage: response.message,
            snackBarType: "error",
            snackBarOpen: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        this.handleRefreshing(false);
      });
  };

  addRole = formData => {
    this.handleCloseFormDialog();
    this.handleRefreshing(true);
    axios
      .post(API_URL + "admins/CreateRole", formData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 0) {
          this.handleRefreshing(false);
          this.setState({
            snackBarMessage: response.message,
            snackBarType: "error",
            snackBarOpen: true
          });
        } else if (response.res === 1) {
          this.addToState(response.data);
          this.handleRefreshing(false);
          this.setState({
            snackBarMessage: response.message,
            snackBarType: "success",
            snackBarOpen: true
          });
          setTimeout(() => {
            this.setState({ snackBarOpen: false });
          }, 3000);
        }
      })
      .catch(function(error) {
        console.log(error);
        this.handleRefreshing(false);
      });
  };

  handleDeleteRole = toBeDeleted => {
    this.handleRefreshing(true);
    let formData = new FormData();
    formData.append("itemsIDs", JSON.stringify(toBeDeleted));
    axios
      .post(API_URL + "roles/BatchDelete", formData, { headers: headers })
      .then(response => {
        return response.data;
      })
      .then(response => {
        if (response.res === 0) {
          this.handleRefreshing(false);
          this.setState({
            snackBarMessage: response.message,
            snackBarType: "error",
            snackBarOpen: true
          });
        } else if (response.res === 1) {
          this.handleRefreshing(false);
          this.deleteRoles(toBeDeleted);
          // this.deleteFromState(toBeDeleted);
          this.setState({
            snackBarMessage: response.message,
            snackBarType: "success",
            snackBarOpen: true
          });
        }
      });
  };

  addToState = role => {
    let newRoles = this.state.roles;
    newRoles.push(role);
    this.setState({ roles: newRoles });
  };

  updateInState = role => {
    let newRoles = this.state.roles;
    for (let i = 0; i < newRoles.length; i++) {
      if (parseInt(newRoles[i].ID) === role.ID) {
        newRoles[i] = role;
        break;
      }
    }
    this.setState({ roles: newRoles });
  };

  handleRefreshing = value => {
    this.setState({ isRefreshing: value });
  };

  handleLoading = value => {
    this.setState({ isLoading: value });
  };

  handleCloseSnackbar = () => {
    this.setState({ snackBarOpen: false });
  };

  handleSnackBarMessage = (message, type) => {
    this.setState({
      snackBarOpen: true,
      snackBarType: type,
      snackBarMessage: message
    });
  };
  render() {
    return (
      <Fragment>
        <Table
          data={this.state.roles}
          deleteFromParent={deleted => {
            this.deleteRoles(deleted);
          }}
          editRole={role => {
            this.handleEdit(role);
          }}
          handleLoading={this.handleLoading}
          handleRefreshing={this.handleRefreshing}
          handleDeleteRole={this.handleDeleteRole}
          handleSnackBarMessage={this.handleSnackBarMessage}
        />
        <RoleFormDialog
          dialogTitle={this.state.dialogTitle}
          handleClose={this.handleCloseFormDialog}
          isOpen={this.state.openRoleFormDialog}
          role={this.state.currentRole}
          updateRole={this.updateRole}
          addRole={this.addRole}
        />
        <FAB callback={this.fabCallback} />
        <SnackBar
          type={this.state.snackBarType}
          open={this.state.snackBarOpen}
          autoHideDuration={4000}
          message={this.state.snackBarMessage}
          onClose={this.handleCloseSnackbar}
        />
        {this.state.isRefreshing && <RefreshLoader />}
        {this.state.isLoading && <Loader />}
      </Fragment>
    );
  }
}

export default Roles;
