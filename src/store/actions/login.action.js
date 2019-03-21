import { toastr as toastrActions } from "react-redux-toastr";
import loginService from "../../services/loginService";
import loginConstants from "../constants/login.constant";

function updateUserName(userNameObj) {
  return {
    type: loginConstants.updateUserName,
    data: userNameObj
  };
}
function updatePassword(passwordObj) {
  return {
    type: loginConstants.updatePassword,
    data: passwordObj
  };
}

function loginRequest() {
  return {
    type: loginConstants.loginRequest,
    data: true
  };
}

function loginSuccess(loggedInUserResponse) {
  return {
    type: loginConstants.loginSuccess,
    data: loggedInUserResponse
  };
}
function loginFail(errorResponse) {
  return {
    type: loginConstants.loginFail,
    error: errorResponse
  };
}

function authenticateUser(userName, password) {
  return async dispatch => {
    try {
      dispatch(loginRequest());
      const response = await loginService.userLogin(userName, password);
      const authToken = {
        Authorization: response.Authorization,
        SessionExpires: response.SessionExpires
      };
      localStorage.setItem("token", JSON.stringify(authToken));
      localStorage.setItem("userName", userName);
      dispatch(loginSuccess(response));
    } catch (error) {
      toastrActions.error("Error", JSON.stringify(error));
      console.log(
        "%c some error occurred inside authenticateUser",
        "background: salmon; color: black",
        error
      );

      dispatch(loginFail(error));
    }
  };
}

export default { updateUserName, updatePassword, authenticateUser };
