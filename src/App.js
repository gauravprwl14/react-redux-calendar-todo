import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppLayout from "./containers/AppLayout";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import "moment-timezone";
import store from "./store/index";
import moment from "moment";
import appConstants from "./utils/appConstants";
import "./App.css";

moment.tz.setDefault(appConstants.appTimeZone);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <ReduxToastr
            timeOut={2000}
            newestOnTop
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
          />
          <Switch>
            <Route path="/" component={AppLayout} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
