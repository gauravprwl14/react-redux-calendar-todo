import reLoginConstants from "../constants/reconnection.constant";
import rootConstants from "../constants/root.constant";
/**
 * Contains the State Related to the Login Credentials
 *
 */
const initialState = {
  userName: {
    value: localStorage.getItem("userName")
      ? localStorage.getItem("userName")
      : "",
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
  },
  reLoginErrorObj: {
    isError: false,
    msg: ""
  },
  showReLoginSpinner: false,

  showReAuthenticationModal: false
};

const reLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case reLoginConstants.updateUserName: {
      return {
        ...state,
        userName: { ...action.data }
      };
    }
    case reLoginConstants.updatePassword: {
      return {
        ...state,
        password: { ...action.data }
      };
    }
    case reLoginConstants.reLoginRequest: {
      return {
        ...state,
        showReLoginSpinner: action.data
      };
    }
    case reLoginConstants.reLoginSuccess: {
      return {
        ...state,
        userObj: { value: action.data },
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
        },
        loginErrorObj: {
          isError: false,
          msg: ""
        },
        showReLoginSpinner: false
      };
    }
    case reLoginConstants.reLoginFail: {
      return {
        ...state,
        showReLoginSpinner: false,
        reLoginErrorObj: {
          isError: true,
          msg: action.error
        }
      };
    }
    case reLoginConstants.reset: {
      return {
        ...state,
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
        },
        reLoginErrorObj: {
          isError: false,
          msg: ""
        },
        showReLoginSpinner: false,
        showReAuthenticationModal: false
      };
    }

    case reLoginConstants.openCloseReAuthenticateModal: {
      return {
        ...state,
        showReAuthenticationModal: action.data
      };
    }
    case rootConstants.logOut: {
      return {
        ...initialState,
        userName: {
          value: "",
          error: {
            isError: false,
            errorMsg: ""
          }
        }
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default reLoginReducer;
