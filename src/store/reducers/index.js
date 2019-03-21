import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import loginReducer from "./login.reducer";
import coachReducer from "./coach.reducer";
import boogieReducer from "./boogie.reducer";
import dashboardReducer from "./dashboard.reducer";
import reconnectionReducer from "./reconnection.reducer";
import sensorTrendingForGraphReducer from "./sensorTrendingForGraph.reducer";

export default combineReducers({
  toastr: toastrReducer,
  loginReducer,
  coachReducer,
  boogieReducer,
  dashboardReducer,
  reconnectionReducer,
  sensorTrendingForGraphReducer
});
