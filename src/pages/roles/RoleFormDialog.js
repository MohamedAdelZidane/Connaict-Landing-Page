import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  container: {
    paddingLeft: theme.spacing.unit * 20,
    paddingRight: theme.spacing.unit * 20
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class RoleFormDialog extends Component {
  state = {
    isOpen: null,
    ID: null,
    RoleName: "",
    Permissions: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }

    let { role } = nextProps;
    this.setState({
      ID: role !== null ? role.ID : null,
      RoleName: role !== null ? role.RoleName : "",
      Permissions:
        role !== null
          ? role.Permissions !== ""
            ? JSON.parse(role.Permissions)
            : {}
          : {}
    });
  }

  handleClose = () => {
    this.setState({ isOpen: false }, () => {
      this.props.handleClose();
    });
  };

  handleCheckboxChange = event => {
    const name = event.target.name.split(".");
    let module = name[0];
    let permission = name[1];
    let permissions = this.state.Permissions;

    if (!permissions[module]) permissions[module] = {};

    permissions[module][permission] = Number(event.target.checked);
    this.setState({
      Permissions: permissions
    });
  };

  handleChange = event => {
    this.setState({ RoleName: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    var rolesModalForm = new FormData(document.getElementById("rolesForm"));
    rolesModalForm.append(
      "Permissions",
      //this.state.Permissions
      JSON.stringify(this.state.Permissions)
    );

    if (this.state.ID) {
      rolesModalForm.append("roleID", this.state.ID);
      this.props.updateRole(rolesModalForm);
    } else {
      this.props.addRole(rolesModalForm);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog
          fullScreen
          open={this.state.isOpen}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                {this.props.dialogTitle}
              </Typography>
              <Button
                color="inherit"
                onClick={this.handleSubmit}
                disabled={this.state.RoleName.trim() === ""}
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.root}>
            <form id="rolesForm" action="/" onSubmit={this.handleSubmit}>
              <Grid container spacing={24} className={classes.container}>
                <TextField
                  id="roleName"
                  name="roleName"
                  label="Role Name"
                  placeholder="Eg. Modified,Limited"
                  fullWidth={true}
                  className={classes.textField}
                  margin="normal"
                  value={this.state.RoleName}
                  onChange={this.handleChange}
                />
                <List>
                  <ListItem>
                    <ListItemText primary="Admins Permissions" />
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="admins_permissions.can_create_admins"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.admins_permissions !==
                              undefined
                                ? this.state.Permissions.admins_permissions
                                    .can_create_admins === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Create Admins"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="admins_permissions.can_edit_admins"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.admins_permissions !==
                              undefined
                                ? this.state.Permissions.admins_permissions
                                    .can_edit_admins === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Edit Admins"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="admins_permissions.can_delete_admins"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.admins_permissions !==
                              undefined
                                ? this.state.Permissions.admins_permissions
                                    .can_delete_admins === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Delete Admins"
                      />
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Roles Permissions" />
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="roles_permissions.can_create_roles"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.roles_permissions !==
                              undefined
                                ? this.state.Permissions.roles_permissions
                                    .can_create_roles === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Create Roles"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="roles_permissions.can_edit_roles"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.roles_permissions !==
                              undefined
                                ? this.state.Permissions.roles_permissions
                                    .can_edit_roles === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Edit Roles"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="roles_permissions.can_delete_roles"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.roles_permissions !==
                              undefined
                                ? this.state.Permissions.roles_permissions
                                    .can_delete_roles === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Delete Roles"
                      />
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Users Permissions" />
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="users_permissions.can_deactivate_users"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.users_permissions !==
                              undefined
                                ? this.state.Permissions.users_permissions
                                    .can_deactivate_users === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Deactivate Users"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="users_permissions.can_view_users"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.users_permissions !==
                              undefined
                                ? this.state.Permissions.users_permissions
                                    .can_view_users === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can View Users"
                      />
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Products Permissions" />
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="products_permissions.can_create_products"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.products_permissions !==
                              undefined
                                ? this.state.Permissions.products_permissions
                                    .can_create_products === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Create Products"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="products_permissions.can_edit_products"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.products_permissions !==
                              undefined
                                ? this.state.Permissions.products_permissions
                                    .can_edit_products === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Edit Products"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="products_permissions.can_delete_products"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.products_permissions !==
                              undefined
                                ? this.state.Permissions.products_permissions
                                    .can_delete_products === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Delete Products"
                      />
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Categories Permissions" />
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="categories_permissions.can_create_categories"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.categories_permissions !==
                              undefined
                                ? this.state.Permissions.categories_permissions
                                    .can_create_categories === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Create Categories"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="categories_permissions.can_edit_categories"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.categories_permissions !==
                              undefined
                                ? this.state.Permissions.categories_permissions
                                    .can_edit_categories === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Edit Categories"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="categories_permissions.can_delete_categories"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.categories_permissions !==
                              undefined
                                ? this.state.Permissions.categories_permissions
                                    .can_delete_categories === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Delete Categories"
                      />
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Brands Permissions" />
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="brands_permissions.can_create_brands"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.brands_permissions !==
                              undefined
                                ? this.state.Permissions.brands_permissions
                                    .can_create_brands === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Create Brands"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="brands_permissions.can_edit_brands"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.brands_permissions !==
                              undefined
                                ? this.state.Permissions.brands_permissions
                                    .can_edit_brands === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Edit Brands"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="brands_permissions.can_delete_brands"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.brands_permissions !==
                              undefined
                                ? this.state.Permissions.brands_permissions
                                    .can_delete_brands === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Delete Brands"
                      />
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="FAQ Permissions" />
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="faqs_permissions.can_create_faqs"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.faqs_permissions !==
                              undefined
                                ? this.state.Permissions.faqs_permissions
                                    .can_create_faqs === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Create FAQ"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="faqs_permissions.can_edit_faqs"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.faqs_permissions !==
                              undefined
                                ? this.state.Permissions.faqs_permissions
                                    .can_edit_faqs === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Edit FAQ"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="faqs_permissions.can_delete_faqs"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.faqs_permissions !==
                              undefined
                                ? this.state.Permissions.faqs_permissions
                                    .can_delete_faqs === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Delete FAQ"
                      />
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="News Permissions" />
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="news_permissions.can_create_news"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.news_permissions !==
                              undefined
                                ? this.state.Permissions.news_permissions
                                    .can_create_news === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Create News"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="news_permissions.can_edit_news"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.news_permissions !==
                              undefined
                                ? this.state.Permissions.news_permissions
                                    .can_edit_news === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Edit News"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="news_permissions.can_delete_news"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.news_permissions !==
                              undefined
                                ? this.state.Permissions.news_permissions
                                    .can_delete_news === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Delete News"
                      />
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Videos Permissions" />
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="videos_permissions.can_create_videos"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.videos_permissions !==
                              undefined
                                ? this.state.Permissions.videos_permissions
                                    .can_create_videos === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Create Videos"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="videos_permissions.can_edit_videos"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.videos_permissions !==
                              undefined
                                ? this.state.Permissions.videos_permissions
                                    .can_edit_videos === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Edit Videos"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="videos_permissions.can_delete_videos"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.videos_permissions !==
                              undefined
                                ? this.state.Permissions.videos_permissions
                                    .can_delete_videos === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Delete Videos"
                      />
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Downloads Permissions" />
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="downloads_permissions.can_create_downloads"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.downloads_permissions !==
                              undefined
                                ? this.state.Permissions.downloads_permissions
                                    .can_create_downloads === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Create Downloads"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="downloads_permissions.can_edit_downloads"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.downloads_permissions !==
                              undefined
                                ? this.state.Permissions.downloads_permissions
                                    .can_edit_downloads === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Edit Downloads"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="downloads_permissions.can_delete_downloads"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.downloads_permissions !==
                              undefined
                                ? this.state.Permissions.downloads_permissions
                                    .can_delete_downloads === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Delete Downloads"
                      />
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Departments Permissions" />
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="departments_permissions.can_create_departments"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.departments_permissions !==
                              undefined
                                ? this.state.Permissions.departments_permissions
                                    .can_create_departments === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Create Downloads"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="departments_permissions.can_edit_departments"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.departments_permissions !==
                              undefined
                                ? this.state.Permissions.departments_permissions
                                    .can_edit_departments === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Edit Downloads"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="departments_permissions.can_delete_departments"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.departments_permissions !==
                              undefined
                                ? this.state.Permissions.departments_permissions
                                    .can_delete_departments === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Delete Downloads"
                      />
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Jobs Permissions" />
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="jobs_permissions.can_create_jobs"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.jobs_permissions !==
                              undefined
                                ? this.state.Permissions.jobs_permissions
                                    .can_create_jobs === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Create Jobs"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="jobs_permissions.can_edit_jobs"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.jobs_permissions !==
                              undefined
                                ? this.state.Permissions.jobs_permissions
                                    .can_edit_jobs === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Edit Jobs"
                      />
                    </Grid>
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="jobs_permissions.can_delete_jobs"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.jobs_permissions !==
                              undefined
                                ? this.state.Permissions.jobs_permissions
                                    .can_delete_jobs === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Delete Jobs"
                      />
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Applicants Permissions" />
                    <Grid item lg={6} md={6} xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="applicants_permissions.can_delete_applicants"
                            onChange={this.handleCheckboxChange}
                            checked={
                              this.state.Permissions.applicants_permissions !==
                              undefined
                                ? this.state.Permissions.applicants_permissions
                                    .can_delete_applicants === 1
                                  ? true
                                  : false
                                : false
                            }
                          />
                        }
                        label="Can Delete Applicants"
                      />
                    </Grid>
                  </ListItem>
                </List>
              </Grid>
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}

RoleFormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  dialogTitle: PropTypes.string.isRequired,
  role: PropTypes.object
};

export default withStyles(styles)(RoleFormDialog);
