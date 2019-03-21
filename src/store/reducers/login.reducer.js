import loginConstants from "../constants/login.constant";
import rootConstants from "../constants/root.constant";
/**
 * Contains the State Related to the Login Credentials
 *
 */
const initialState = {
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
  userObj: {
    value: ""
  },
  showLoginSpinner: false
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginConstants.updateUserName: {
      return {
        ...state,
        userName: { ...action.data }
      };
    }
    case loginConstants.updatePassword: {
      return {
        ...state,
        password: { ...action.data }
      };
    }
    case loginConstants.loginRequest: {
      return {
        ...state,
        showLoginSpinner: action.data
      };
    }
    case loginConstants.loginSuccess: {
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
        showLoginSpinner: false
      };
    }
    case loginConstants.loginFail: {
      return {
        ...state,
        showLoginSpinner: false,
        loginErrorObj: {
          isError: true,
          msg: action.error
        }
      };
    }
    case loginConstants.reset: {
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
        loginErrorObj: {
          isError: false,
          msg: ""
        },
        showLoginSpinner: false
      };
    }
    case rootConstants.logOut: {
      return {
        ...initialState
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default loginReducer;
