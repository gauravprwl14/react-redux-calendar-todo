import React, { Component } from "react";
import _ from "lodash";
import { Modal, ModalBody, Button, FormGroup, Form } from "reactstrap";
import { connect } from "react-redux";
import FontAwesome from "react-fontawesome";
import reConnectionActions from "../../store/actions/reconnection.action";

import "./style.scss";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: {
        value: "",
        error: {
          isError: false,
          errorMsg: ""
        }
      },
      password: {
        value: "",
        error: {
          isError: false,
          errorMsg: ""
        }
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleLoginBtnClick = this.handleLoginBtnClick.bind(this);
  }
  handleChange(e, keyName) {
    if (e) {
      e.preventDefault();
      const obj = this.state[keyName];
      const value = e.target.value;
      obj.value = value;
      obj.error.isError = false;
      obj.error.errorMsg = "";

      if (keyName === "userName") {
        this.props.updateUserName(obj);
      } else if (keyName === "password") {
        this.props.updatePassword(obj);
      }
    }
  }
  handleBlur(e, keyName) {
    if (e) {
      e.preventDefault();
    }
    const obj = this.state[keyName];
    if (!(obj && obj.value && obj.value.trim())) {
      obj.error.isError = true;
      obj.error.errorMsg = `Value Can't be empty`;
    } else {
      obj.error.isError = false;
      obj.error.errorMsg = "";
    }

    if (keyName === "userName") {
      this.props.updateUserName(obj);
    } else if (keyName === "password") {
      this.props.updatePassword(obj);
    }
    return obj.isError;
  }
  isFormValid(userNameObj = {}, passwordObj = {}) {
    if (
      _.get(userNameObj, "error.isError", false) ||
      _.get(passwordObj, "error.isError", false)
    ) {
      return false;
    }
    return true;
  }
  handleLoginBtnClick(e) {
    if (e) {
      e.preventDefault();
    }
    const validForm = this.isFormValid(
      this.props.userNameObj,
      this.props.passwordObj
    );
    if (validForm) {
      this.props.authenticateUser(
        _.get(this.props.userNameObj, "value", ""),
        _.get(this.props.passwordObj, "value", "")
      );
    }
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.showReAuthenticationModal}
          className={this.props.className}
          centered>
          <ModalBody>
            <h5 class="text-center blue-text">Re-enter password</h5>
            <Form>
              {!localStorage.getItem("userName") ? (
                <FormGroup>
                  <label
                    for="userName"
                    className={
                      _.get(this.props.userNameObj, "error.isError", false)
                        ? "has-error"
                        : ""
                    }>
                    {" "}
                    UserName
                  </label>
                  <input
                    name="userName"
                    id="userName"
                    type="text"
                    className="form-control"
                    value={_.get(this.props.userNameObj, "value", "")}
                    onChange={e => this.handleChange(e, "userName")}
                    onBlur={e => this.handleBlur(e, "userName")}
                  />
                  {_.get(this.props.userNameObj, "error.isError", false) ? (
                    <span className="text-danger">
                      {_.get(
                        this.props.userNameObj,
                        "error.errorMsg",
                        "Some thing is wrong"
                      )}
                    </span>
                  ) : null}
                </FormGroup>
              ) : null}
              <FormGroup>
                <label
                  for="userPassword"
                  className={
                    _.get(this.props.passwordObj, "error.isError", false)
                      ? "has-error"
                      : ""
                  }>
                  {" "}
                  Password
                </label>
                <input
                  name="password"
                  id="userPassword"
                  type="password"
                  className="form-control"
                  onChange={e => this.handleChange(e, "password")}
                  onBlur={e => this.handleBlur(e, "password")}
                />
                {_.get(this.props.passwordObj, "error.isError", false) ? (
                  <span className="text-danger">
                    {_.get(
                      this.props.passwordObj,
                      "error.errorMsg",
                      "Some thing is wrong"
                    )}
                  </span>
                ) : null}
              </FormGroup>
              <Button
                color="primary"
                size="lg"
                block
                type="submit"
                disabled={this.props.showLoginSpinner}
                onClick={this.handleLoginBtnClick}>
                <a>
                  Submit &nbsp;
                  {this.props.showLoginSpinner && (
                    <FontAwesome name="button-loading fa fa-refresh fa-spin" />
                  )}
                </a>
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userNameObj: _.get(state.reconnectionReducer, "userName", null),
    passwordObj: _.get(state.reconnectionReducer, "password", null),
    showLoginSpinner: _.get(
      state.reconnectionReducer,
      "showReLoginSpinner",
      false
    ),
    showReAuthenticationModal: _.get(
      state.reconnectionReducer,
      "showReAuthenticationModal",
      null
    )
  };
}
const mapDispatchToProps = dispatch => ({
  updateUserName: userNameObj =>
    dispatch(reConnectionActions.updateUserName(userNameObj)),
  updatePassword: passwordObj =>
    dispatch(reConnectionActions.updatePassword(passwordObj)),
  authenticateUser: (userName, password) =>
    dispatch(reConnectionActions.initiateReConnection(userName, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
