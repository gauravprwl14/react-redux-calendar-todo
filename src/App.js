import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppLayout from "./containers/AppLayout";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={AppLayout} />
        </Switch>
      </div>
    );
  }
}

export default App;
