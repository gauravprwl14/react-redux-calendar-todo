import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import typeCheckingReducer from './typeChecking.reducer'


export default combineReducers({
  toastr: toastrReducer,
  typeChecking: typeCheckingReducer
});
