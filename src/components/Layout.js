// import React, { Component } from "react";
// import classNames from "classnames";
// import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
// import { createMuiTheme } from "@material-ui/core/styles";
// import { indigo } from "@material-ui/core/colors";
// import AppBar from "@material-ui/core/AppBar";
// import Drawer from "@material-ui/core/Drawer";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import List from "@material-ui/core/List";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import MenuIcon from "@material-ui/icons/Menu";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import { navigationItems } from "./NavigationItems";

// const drawerWidth = 240;

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#4caf50",
//       contrastText: "#FFF"
//     },
//     secondary: indigo
//   }
// });

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//     zIndex: 1,
//     overflow: "hidden",
//     position: "relative",
//     display: "flex",
//     minHeight: "100vh"
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen
//     })
//   },
//   appBarShift: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   },
//   menuButton: {
//     marginLeft: 12,
//     marginRight: 36
//   },
//   hide: {
//     display: "none"
//   },
//   drawerPaper: {
//     position: "relative",
//     whiteSpace: "nowrap",
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   },
//   drawerPaperClose: {
//     overflowX: "hidden",
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen
//     }),
//     width: theme.spacing.unit * 7,
//     [theme.breakpoints.up("sm")]: {
//       width: theme.spacing.unit * 9
//     }
//   },
//   toolbar: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     padding: "0 8px",
//     ...theme.mixins.toolbar
//   },
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing.unit * 3
//   }
// });

// class Layout extends Component {
//   state = { open: false };

//   handleDrawerOpen = () => {
//     this.setState({ open: true });
//   };

//   handleDrawerClose = () => {
//     this.setState({ open: false });
//   };

//   render() {
//     const { classes } = this.props;

//     return (
//       <MuiThemeProvider theme={theme}>
//         <div className={classes.root}>
//           <AppBar
//             position="absolute"
//             className={classNames(
//               classes.appBar,
//               this.state.open && classes.appBarShift
//             )}
//           >
//             <Toolbar disableGutters={!this.state.open}>
//               <IconButton
//                 color="inherit"
//                 aria-label="Open drawer"
//                 onClick={this.handleDrawerOpen}
//                 className={classNames(
//                   classes.menuButton,
//                   this.state.open && classes.hide
//                 )}
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Typography variant="title" color="inherit" noWrap>
//                 Mozdan Admin Panel
//               </Typography>
//             </Toolbar>
//           </AppBar>
//           <Drawer
//             variant="permanent"
//             classes={{
//               paper: classNames(
//                 classes.drawerPaper,
//                 !this.state.open && classes.drawerPaperClose
//               )
//             }}
//             open={this.state.open}
//           >
//             <div className={classes.toolbar}>
//               <IconButton onClick={this.handleDrawerClose}>
//                 {theme.direction === "rtl" ? (
//                   <ChevronRightIcon />
//                 ) : (
//                   <ChevronLeftIcon />
//                 )}
//               </IconButton>
//             </div>
//             <Divider />
//             <List>{navigationItems}</List>
//           </Drawer>
//           <main className={classes.content}>
//             <div className={classes.toolbar} />
//             {this.props.children}
//           </main>
//         </div>
//       </MuiThemeProvider>
//     );
//   }
// }

// export default withStyles(styles, { withTheme: true })(Layout);
