import React, { Component } from "react";
import { Col, Nav, NavItem } from "reactstrap";
import { withRouter, NavLink } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import Menu, { SubMenu, Item as MenuItem } from "rc-menu";
import "rc-menu/assets/index.css";
import "./style.scss";
import { connect } from "react-redux";
import _ from "lodash";

class Sidebar extends Component {
  rootSubmenuKeys = ["1", "2", "3", "4", "5", "6"];

  constructor(props, context) {
    super(props, context);
    this.state = {
      openKeys: [""],
      isHidden: true,
      isSubmenu: false,
      updatedTime: null,
      activeNav: "first"
    };
    this.toggleHidden = this.toggleHidden.bind(this);
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };
  toggleHidden(activeNav) {
    if (activeNav === "first") {
      this.setState({
        isHidden: !this.state.isHidden,
        activeNav
      });
    } else if (activeNav === "second") {
      this.setState({
        isHidden: true,
        activeNav
      });
    }
  }

  toggleSubmenu() {
    this.setState({
      isSubmenu: !this.state.isSubmenu
    });
  }
  getMenu() {
    return (
      <Menu
        onClick={this.onClick}
        mode="inline"
        onOpenChange={this.onOpenChange}
        openKeys={this.state.openKeys}
        className="nav flex-column ">
        <SubMenu
          key="1"
          title={<NavLink to="/coach/dt">DT</NavLink>}
          className="dt-menu">
          <MenuItem key="1-1">
            <NavLink to="/coach/dt/bogie1">Bogie 1</NavLink>
          </MenuItem>
          <MenuItem key="1-2">
            <NavLink to="/coach/dt/bogie2">Bogie 2</NavLink>
          </MenuItem>
        </SubMenu>
        <SubMenu
          key="2"
          title={<NavLink to="/coach/mp">MP</NavLink>}
          className="mp-menu">
          <MenuItem key="1-1">
            <NavLink to="/coach/mp/bogie1">Bogie 1</NavLink>
          </MenuItem>
          <MenuItem key="1-2">
            <NavLink to="/coach/mp/bogie2">Bogie 2</NavLink>
          </MenuItem>
        </SubMenu>
        <SubMenu
          key="3"
          title={<NavLink to="/coach/mi">MI</NavLink>}
          className="mp-menu">
          <MenuItem key="1-1">
            <NavLink to="/coach/mi/bogie1">Bogie 1</NavLink>
          </MenuItem>
          <MenuItem key="1-2">
            <NavLink to="/coach/mi/bogie2">Bogie 2</NavLink>
          </MenuItem>
        </SubMenu>
        <SubMenu
          key="4"
          title={<NavLink to="/coach/mi2">MI </NavLink>}
          className="mp-menu">
          <MenuItem key="1-1">
            <NavLink to="/coach/mi2/bogie1">Bogie 1</NavLink>
          </MenuItem>
          <MenuItem key="1-2">
            <NavLink to="/coach/mi2/bogie2">Bogie 2</NavLink>
          </MenuItem>
        </SubMenu>
        <SubMenu
          key="5"
          title={<NavLink to="/coach/mp2">MP</NavLink>}
          className="mp-menu">
          <MenuItem key="1-1">
            <NavLink to="/coach/mp2/bogie1">Bogie 1</NavLink>
          </MenuItem>
          <MenuItem key="1-2">
            <NavLink to="/coach/mp2/bogie2">Bogie 2</NavLink>
          </MenuItem>
        </SubMenu>
        <SubMenu
          key="6"
          title={<NavLink to="/coach/dt2">DT</NavLink>}
          className="dt1-menu">
          <MenuItem key="1-1">
            <NavLink to="/coach/dt2/bogie1">Bogie 1</NavLink>
          </MenuItem>
          <MenuItem key="1-2">
            <NavLink to="/coach/dt2/bogie1">Bogie 2</NavLink>
          </MenuItem>
        </SubMenu>
      </Menu>
    );
  }
  render() {
    return (
      <Col sm={12} id="sticky-sidebar">
        <Nav className="flex-column">
          <NavItem
            onClick={() => this.toggleHidden("first")}
            className={
              this.state.activeNav === "first"
                ? "active first-level"
                : "first-level"
            }>
            <NavLink to="/dashboard">
              <FontAwesome name="train" />
              <span>Train - 71047</span>
            </NavLink>
          </NavItem>
          {!this.state.isHidden &&
            this.state.activeNav === "first" && <div>{this.getMenu()}</div>}
          <NavItem
            onClick={() => this.toggleHidden("second")}
            className={
              this.state.activeNav === "second"
                ? "active first-level"
                : "first-level"
            }>
            <NavLink to="/dashboard">
              <FontAwesome name="train" />
              <span>Train</span>
            </NavLink>
          </NavItem>
          {/*{this.state.isHidden && (
				<div >{this.getMenu()}</div>
				)
				} */}
        </Nav>
        <div className="sidebar-footer">
          <span>Last Updated on:</span>
          {this.props.lastTrendingUpdateTime ? (
            <div>{this.props.lastTrendingUpdateTime.format("llll")} (SGT)</div>
          ) : (
            <div className="loader sidebar-loader" />
          )}
        </div>
      </Col>
    );
  }
}
function mapStateToProps(state) {
  return {
    lastTrendingUpdateTime: _.get(
      state.boogieReducer,
      "lastTrendingUpdated",
      null
    )
  };
}
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));
