import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter
} from "react-router-dom";
import { isLoggedIn } from "./components/AuthService";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import Home from "./pages/home/Home";
import Roles from "./pages/roles/Roles";
import Categories from "./pages/categories/Categories";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Faqs from "./pages/faqs/Faqs";
import Brands from "./pages/brands/Brands";
import Products from "./pages/products/Products";
import News from "./pages/news/News";
import AboutUs from "./pages/aboutUs/AboutUs";
import Test from "./pages/test";
import Contactus from "./pages/contactus/Contactus";
import Departments from "./pages/departments/Departments";
import Jobs from "./pages/jobs/Jobs";
import Applicants from "./pages/applicants/Applicants";
import Downloads from "./pages/downloads/Downloads";
import Newsletter from "./pages/newsletter/Newsletter";
import Videos from "./pages/videos/Videos";
import Candidates from "./pages/candidates/Candidates";
import Forms from "./pages/candidateForm/Forms";
import NavigationBar from "./pages/navigationBar/NavigationBar";
import Recruiters from "./pages/recruiters/Recruiters";



// Routes
const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Home />
  },
  {
    path: "/login",
    component: () => <Login />
  },
  {
    path: "/logout",
    component: () => <Logout />
  },
  {
    path: "/home",
    component: () => <Home />
  },
  {
    path: "/categories",
    component: () => <Categories />
  },
  {
    path: "/brands",
    component: () => <Brands />
  },
  {
    path: "/products",
    component: () => <Products />
  },
  {
    path: "/roles",
    component: () => <Roles />
  },
  {
    path: "/aboutus",
    component: () => <AboutUs />
  },
  {
    path: "/faqs",
    component: () => <Faqs />
  },
  {
    path: "/news",
    component: () => <News />
  },
  {
    path: "/test",
    component: () => <Test />
  },
  {
    path: "/contactus",
    component: () => <Contactus />
  },
  {
    path: "/departments",
    component: () => <Departments />
  },
  {
    path: "/applicants",
    component: () => <Applicants />
  },
  {
    path: "/jobs",
    component: () => <Jobs />
  },
  {
    path: "/applicants",
    component: () => <Applicants />
  },
  {
    path: "/downloads",
    component: () => <Downloads />
  },
  {
    path: "/newsletter",
    component: () => <Newsletter />
  },
  {
    path: "/videos",
    component: () => <Videos />
  },
  {
    path: "/candidates",
    component: () => <Candidates />
  },
  {
    path: "/form",
    component: () => <Forms />
  },
  {
    path: "/recruiters",
    component: () => <Recruiters />
  },
  {
    path: "/navigationBar",
    component: () => <NavigationBar />
  }
];

ReactDOM.render(
  <Router>
    {isLoggedIn() ? (
     <Home/>
    ) : (
      
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              exact={route.exact}
              path={route.path}
              render={props => <route.component {...props} />}
            />
          ))}
          <Redirect to="/" />
        </Switch>
     
    )}
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
