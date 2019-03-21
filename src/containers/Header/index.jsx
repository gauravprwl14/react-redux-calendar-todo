import React, { Component } from "react";
import { Nav } from "reactstrap";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import logo from "./../../assets/images/logo.png";
import companyLogo from "./../../assets/images/skf-logo.jpg";
import commonUtilsFunc from "../../utils/common";
import { logOutAction } from "./../../store/actions/root.action";
import "./style.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOutOnClick = this.logOutOnClick.bind(this);
  }
  logOutOnClick(e) {
    e.preventDefault();
    commonUtilsFunc.handleLogout();
    this.props.logOut();
    this.props.history.push("/");
  }
  render() {
    return (
      <div>
        <header>
          <div className="container-fluid d-flex align-items-center">
            <a
              onClick={e => {
                e.preventDefault();
                this.props.history.push("/dashboard");
              }}>
              <img src={logo} alt="bogie" height="40" />
            </a>

            <Nav className="d-flex right-nav">
              <li className="d-flex">
                <i className="material-icons">account_circle</i>{" "}
                <span>{this.props.loginUserName}</span>
              </li>
              <li onClick={e => this.logOutOnClick(e)}>Logout</li>
            </Nav>
            <a className="company-logo">
              <img src={companyLogo} alt="bogie" height="40" />
            </a>
          </div>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginUserName: _.get(state.reconnectionReducer.userName, "value", null)
  };
}
const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOutAction())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
