import { Component } from "react";
import { logout } from "../../components/AuthService";

class Logout extends Component {
  componentWillMount() {
    logout();
  }

  render() {
    return null;
  }
}

export default Logout;
