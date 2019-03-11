// import React from "react";
// import { NavLink } from "react-router-dom";
// import Divider from "@material-ui/core/Divider";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import SupervisedUserCircle from "@material-ui/icons/SupervisedUserCircle";
// import Security from "@material-ui/icons/Security";
// import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
// import CategoryIcon from "@material-ui/icons/Category";
// import BrandsIcon from "@material-ui/icons/Star";
// import ProductIcon from "@material-ui/icons/ShoppingCart";
// import LiveHelp from "@material-ui/icons/LiveHelp";
// import AddAlarm from "@material-ui/icons/AddAlarm";
// import Tooltip from "@material-ui/core/Tooltip";
// import ContactMail from "@material-ui/icons/ContactMail";
// import DepartmentsIcon from "@material-ui/icons/DomainOutlined";
// import JobsIcon from "@material-ui/icons/Work";
// import SaveAlt from "@material-ui/icons/SaveAlt";
// import Email from "@material-ui/icons/Email";
// import VideosIcon from "@material-ui/icons/VideoLibrary";

// export const navigationItems = (
//   <div>
//     <NavLink to="/admins" style={{ textDecoration: "none" }}>
//       <Tooltip title="Administrators" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <SupervisedUserCircle />
//           </ListItemIcon>
//           <ListItemText primary="Administrators" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//     <NavLink to="/roles" style={{ textDecoration: "none" }}>
//       <Tooltip title="Roles" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <Security />
//           </ListItemIcon>
//           <ListItemText primary="Roles" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//     <Divider />
//     <NavLink to="/aboutus" style={{ textDecoration: "none" }}>
//       <Tooltip title="About Us" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <SupervisedUserCircle />
//           </ListItemIcon>
//           <ListItemText primary="About Us" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//     <NavLink to="/faqs" style={{ textDecoration: "none" }}>
//       <Tooltip title="FAQ" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <LiveHelp />
//           </ListItemIcon>
//           <ListItemText primary="FAQ" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//     <NavLink to="/news" style={{ textDecoration: "none" }}>
//       <Tooltip title="News" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <AddAlarm />
//           </ListItemIcon>
//           <ListItemText primary="News" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//     <NavLink to="/videos" style={{ textDecoration: "none" }}>
//       <Tooltip title="Videos" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <VideosIcon />
//           </ListItemIcon>
//           <ListItemText primary="Videos" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//     <NavLink to="/contactus" style={{ textDecoration: "none" }}>
//       <Tooltip title="Contact us" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <ContactMail />
//           </ListItemIcon>
//           <ListItemText primary="Contact us" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//     <NavLink to="/newsletter" style={{ textDecoration: "none" }}>
//       <Tooltip title="Newsletter" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <Email />
//           </ListItemIcon>
//           <ListItemText primary="Newsletter" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//     <NavLink to="/downloads" style={{ textDecoration: "none" }}>
//       <Tooltip title="Downloads" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <SaveAlt />
//           </ListItemIcon>
//           <ListItemText primary="Downloads" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//     <Divider />
//     <NavLink to="/categories" style={{ textDecoration: "none" }}>
//       <Tooltip title="Categories" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <CategoryIcon />
//           </ListItemIcon>
//           <ListItemText primary="Categories" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//     <NavLink to="/brands" style={{ textDecoration: "none" }}>
//       <Tooltip title="Brands" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <BrandsIcon />
//           </ListItemIcon>
//           <ListItemText primary="Brands" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//     <NavLink to="/products" style={{ textDecoration: "none" }}>
//       <Tooltip title="Products" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <ProductIcon />
//           </ListItemIcon>
//           <ListItemText primary="Products" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//     <Divider />
//     <NavLink to="/departments" style={{ textDecoration: "none" }}>
//       <Tooltip title="Departments" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <DepartmentsIcon />
//           </ListItemIcon>
//           <ListItemText primary="Departments" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//     <NavLink to="/jobs" style={{ textDecoration: "none" }}>
//       <Tooltip title="Jobs" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <JobsIcon />
//           </ListItemIcon>
//           <ListItemText primary="Jobs" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//     <NavLink to="/applicants" style={{ textDecoration: "none" }}>
//       <Tooltip title="Applicants" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <SupervisedUserCircle />
//           </ListItemIcon>
//           <ListItemText primary="Applicants" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//     <Divider />
//     <NavLink to="/logout" style={{ textDecoration: "none" }}>
//       <Tooltip title="Logout" placement="right">
//         <ListItem button>
//           <ListItemIcon>
//             <PowerSettingsNew />
//           </ListItemIcon>
//           <ListItemText primary="Logout" />
//         </ListItem>
//       </Tooltip>
//     </NavLink>
//   </div>
// );
