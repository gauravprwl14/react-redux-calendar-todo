import React, { Component } from "react";
import { Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import AuthenticatedRoutes from "../AuthenticateRoutes/index";
import Routes from "./../../routes/index";
import Header from "./../../containers/Header";
import Sidebar from "./../../containers/Sidebar";
import Spinner from "../../components/Spinner";
import ResetPassword from "../../components/ResetPassword";

import coachActions from "../../store/actions/coach.action";
import dashboardActions from "../../store/actions/dashboard.action";
import bogieActions from "../../store/actions/boogie.action";
import appConstants from "./../../utils/appConstants";
import apiQueue from "../../services/apiQueue";

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.refreshInterval = null;
    this.refreshSpeedInterval = null;
    this.appDataRefreshCall = this.appDataRefreshCall.bind(this);
    this.speedDataRefreshCall = this.speedDataRefreshCall.bind(this);
  }
  componentDidMount() {
    this.props.openFetchingDataLoadingIndicator();
    this.props.fetchCoachAssets();
  }
  appDataRefreshCall(nextProps) {
    clearInterval(this.refreshInterval);
    this.refreshInterval = setInterval(() => {
      if (this.props.showTrendingDataLoadingIndicator === false) {
        this.props.getBogieAssetsTrendingData();
      }
    }, appConstants.appDataRefresh);
  }
  speedDataRefreshCall() {
    clearInterval(this.refreshSpeedInterval);
    this.refreshSpeedInterval = setInterval(() => {
      // when speed indicator is false,means either speed call is success or failure,
      // when speed indicator is true, means speed call request is going on
      // when speed call request is going on dont add extra speed calls to queue

      if (this.props.showSpeedTrendingDataLoadingIndicator === false) {
        // if (this.props.dtSpeedObj1) {
        //   this.props.fetchTrendingSpeedSensorData(
        //     this.props.dtSpeedObj1,
        //     appConstants.numberOfReadingsForSpeed
        //   );
        // }
        if (this.props.dtSpeedObj2) {
          this.props.fetchTrendingSpeedSensorData(
            this.props.dtSpeedObj2,
            appConstants.numberOfReadingsForSpeed
          );
        }
        // if (this.props.mpSpeedObj1) {
        //   this.props.fetchTrendingSpeedSensorData(
        //     this.props.mpSpeedObj1,
        //     appConstants.numberOfReadingsForSpeed
        //   );
        // }
        // if (this.props.mpSpeedObj2) {
        //   this.props.fetchTrendingSpeedSensorData(
        //     this.props.mpSpeedObj2,
        //     appConstants.numberOfReadingsForSpeed
        //   );
        // }
      }
    }, appConstants.speedDataRefresh);
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isFirstTimeTrendingDataFetchingComplete !==
      this.props.isFirstTimeTrendingDataFetchingComplete
    ) {
      if (nextProps.isFirstTimeTrendingDataFetchingComplete === true) {
        this.appDataRefreshCall();
        this.speedDataRefreshCall();
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.refreshInterval);
    clearInterval(this.refreshSpeedInterval);
    apiQueue.stopQueueProcessing();
  }
  render() {
    return (
      <div className="main-container">
        <Header />
        <Sidebar />
        {!this.props.isFirstTimeDataFetchingComplete && (
          <Spinner openModal={this.props.loadingIndicator} />
        )}

        <ResetPassword />
        <Switch>
          {Routes.dashboardRoutes.map(
            (route, index) =>
              route.component && route.isRedirectRouter ? (
                <route.component to={route.to} key={index} />
              ) : route.component ? (
                <AuthenticatedRoutes
                  authenticated={this.props.userName ? true : false}
                  WrappedComponent={route.component}
                  exact
                  key={index}
                  path={route.path}
                />
              ) : null
          )}
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dtSpeedObj1: _.get(state.boogieReducer.sensorArray, "dt.speed1", null),
    dtSpeedObj2: _.get(state.boogieReducer.sensorArray, "dt.speed2", null),
    mpSpeedObj1: _.get(state.boogieReducer.sensorArray, "mp.speed1", null),
    mpSpeedObj2: _.get(state.boogieReducer.sensorArray, "mp.speed2", null),
    userName: _.get(state.reconnectionReducer.userName, "value", null),
    loadingIndicator: _.get(
      state.dashboardReducer,
      "showFetchingDataLoadingIndicator",
      false
    ),
    isFirstTimeDataFetchingComplete: _.get(
      state.dashboardReducer,
      "isFirstTimeDataFetchingComplete",
      false
    ),
    isFirstTimeTrendingDataFetchingComplete: _.get(
      state.dashboardReducer,
      "isFirstTimeDataFetchingForTrendingApiComplete",
      false
    ),
    showTrendingDataLoadingIndicator: _.get(
      state.boogieReducer,
      "showTrendingDataLoadingIndicator",
      true
    ),
    showSpeedTrendingDataLoadingIndicator: _.get(
      state.boogieReducer,
      "showSpeedSensorLoadingIndicator",
      true
    )
  };
}
const mapDispatchToProps = dispatch => ({
  fetchTrendingSpeedSensorData: (sensorObj, readings) =>
    dispatch(bogieActions.getTrendingDataForSpeedSensor(sensorObj, readings)),
  fetchCoachAssets: () => dispatch(coachActions.fetchCoachAssets()),
  fetchCoachSubMachineAssets: () =>
    dispatch(coachActions.fetchCoachSubMachineAssets()),
  openFetchingDataLoadingIndicator: () =>
    dispatch(dashboardActions.openFetchingDataLoadingIndicator()),
  fetchBoogieSensorData: () => dispatch(bogieActions.fetchBoogieSensorData()),
  getBogieAssetsTrendingData: () =>
    dispatch(bogieActions.newGetBogieAssetsTrendingData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DashboardLayout));
