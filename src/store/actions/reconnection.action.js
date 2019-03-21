import { toastr as toastrActions } from "react-redux-toastr";
import loginService from "../../services/loginService";
import reLoginConstants from "../constants/reconnection.constant";
import apiQueueService from "../../services/apiQueue";

function updateUserName(userNameObj) {
  return {
    type: reLoginConstants.updateUserName,
    data: userNameObj
  };
}
function updatePassword(passwordObj) {
  return {
    type: reLoginConstants.updatePassword,
    data: passwordObj
  };
}

function reLoginRequest() {
  return {
    type: reLoginConstants.reLoginRequest,
    data: true
  };
}

function reLoginSuccess(loggedInUserResponse) {
  return {
    type: reLoginConstants.reLoginSuccess,
    data: loggedInUserResponse
  };
}
function reLoginFail(errorResponse) {
  return {
    type: reLoginConstants.reLoginFail,
    error: errorResponse
  };
}

function initiateReConnection(userName, password) {
  return async dispatch => {
    try {
      dispatch(reLoginRequest());
      const response = await loginService.userLogin(userName, password);
      const authToken = {
        Authorization: response.Authorization,
        SessionExpires: response.SessionExpires
      };
      localStorage.setItem("token", JSON.stringify(authToken));
      localStorage.setItem("userName", userName);
      dispatch(reLoginSuccess(response));
      dispatch(openCloseReAuthenticateModal(false));
      apiQueueService.resume();
    } catch (error) {
      toastrActions.error("Error", JSON.stringify(error));
      console.log(
        "%c some error occurred inside initiateReConnection",
        "background: salmon; color: black",
        error
      );

      dispatch(reLoginFail(error));
    }
  };
}

function openCloseReAuthenticateModal(value) {
  return {
    type: reLoginConstants.openCloseReAuthenticateModal,
    data: value
  };
}

export default {
  updateUserName,
  updatePassword,
  initiateReConnection,
  openCloseReAuthenticateModal
};
