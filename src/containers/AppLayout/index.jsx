import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./../../routes/index";

class AppLayout extends Component {
  render() {
    return (
      <div>
        <div>
          <Router ignoreScrollBehavior>
            <Switch>
              {Routes.appRoutes.map(
                (route, index) =>
                  route.component ? (
                    <Route
                      exact
                      key={index}
                      path={route.path}
                      render={props => <route.component {...props} />}
                    />
                  ) : null
              )}
              {/* <Route path="404" component={NotFound} />
            <Route path="*" component={NotFound} /> */}
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default AppLayout;
