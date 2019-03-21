import React, { Component } from "react";
// import PropTypes from "prop-types";
import C3Chart from "react-c3js";
import "c3/c3.css";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import sensorTrendingForGraphActions from "../../store/actions/sensorTrendingForGraph.action";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import "./style.scss";
import { ModalBody, Button } from "reactstrap";
import "react-dates/initialize";
import { DateRangePicker, isInclusivelyBeforeDay } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import FontAwesome from "react-fontawesome";
class WheelModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false,
      modal: false,
      activeTab: "vel",
      graphData: {
        x: "timeLine",
        columns: [[], []],
        type: "area-spline"
      },
      maxTick: 10,
      tickValueArr: []
    };
    this.activeTabToggle = this.activeTabToggle.bind(this);
    this.setGraphData = this.setGraphData.bind(this);
    this.firstApiCallOnEnter = this.firstApiCallOnEnter.bind(this);
    this.goButtonOnClick = this.goButtonOnClick.bind(this);
    this.getSensorData = this.getSensorData.bind(this);
  }

  activeTabToggle(sensorType) {
    this.setState({ activeTab: sensorType });
  }
  setGraphData(nextProps) {
    let date = [];
    let sensorData = [];
    let tickValues = [];
    let i = 1;
    date.unshift("timeLine");
    if (
      nextProps.sensorTrendingForGraphReducer.trendingDataOfParticularSensor &&
      nextProps.sensorTrendingForGraphReducer.trendingDataOfParticularSensor
        .length
    ) {
      if (this.state.activeTab === "vel") {
        sensorData.unshift("VEL(MM/S RMS)");
      } else if (this.state.activeTab === "env3") {
        sensorData.unshift("gE(gE PTP)");
      } else if (this.state.activeTab === "temp") {
        sensorData.unshift("°C");
      }
    }
    nextProps.sensorTrendingForGraphReducer.trendingDataOfParticularSensor.forEach(
      trendingObj => {
        // trendingObj.ReadingTimeUTC gets date in format YYYY-MM-DDTHH:mm:ss with no z,
        // moment to identify if object is utc or not requires format YYYY-MM-DDTHH:mm:ssz,
        // moment cant identify if given value is utc or not ,if there is no z at end
        let utcTimeForTrendingData = trendingObj.ReadingTimeUTC;
        if (utcTimeForTrendingData && !utcTimeForTrendingData.endsWith("Z")) {
          utcTimeForTrendingData = utcTimeForTrendingData + "Z";
        }
        date.push(moment(utcTimeForTrendingData).format("DD/MM/YYYY HH:mm:ss"));
        sensorData.push(Number(trendingObj.Measurements[0].Level.toFixed(2)));
      }
    );
    let graphDataObj = {
      x: "timeLine",
      columns: [date, sensorData],
      type: "area-spline"
    };
    const graphDataLength = sensorData.length;
    const graphTickIncrement = Math.floor(graphDataLength / this.state.maxTick);
    while (i <= this.state.maxTick) {
      tickValues.push(graphTickIncrement * i);
      i++;
    }
    this.setState({ graphData: graphDataObj, tickValueArr: tickValues });
  }

  firstApiCallOnEnter() {
    if (
      this.props.selectedBogieAssetObjForTrendingGraph.sensorObj &&
      Object.keys(this.props.selectedBogieAssetObjForTrendingGraph.sensorObj)
        .length &&
      this.props.sensorTrendingForGraphReducer.endDate &&
      this.props.sensorTrendingForGraphReducer.startDate
    ) {
      const startDate = this.props.sensorTrendingForGraphReducer.startDate;
      const endDate = this.props.sensorTrendingForGraphReducer.endDate;
      if (this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.vel) {
        this.props.fetchTrendingSensorData(
          this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.vel,
          startDate,
          endDate
        );
      } else if (
        this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.env3
      ) {
        this.props.fetchTrendingSensorData(
          this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.env3,
          startDate,
          endDate
        );
      } else if (
        this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.temp
      ) {
        this.props.fetchTrendingSensorData(
          this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.temp,
          startDate,
          endDate
        );
      }
    }
  }
  goButtonOnClick() {
    const startDate = this.props.sensorTrendingForGraphReducer.startDate;
    const endDate = this.props.sensorTrendingForGraphReducer.endDate;
    if (this.state.activeTab === "vel") {
      this.props.fetchTrendingSensorData(
        this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.vel,
        startDate,
        endDate
      );
    } else if (this.state.activeTab === "env3") {
      this.props.fetchTrendingSensorData(
        this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.env3,
        startDate,
        endDate
      );
    } else if (this.state.activeTab === "temp") {
      this.props.fetchTrendingSensorData(
        this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.temp,
        startDate,
        endDate
      );
    }
  }
  componentDidMount() {
    this.firstApiCallOnEnter();
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.sensorTrendingForGraphReducer.trendingDataOfParticularSensor &&
      nextProps.sensorTrendingForGraphReducer.trendingDataOfParticularSensor
        .length
    ) {
      if (
        (this.state.activeTab === "vel" &&
          nextProps.sensorTrendingForGraphReducer
            .trendingDataOfParticularSensor[0].PointID ===
            this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.vel
              .id) ||
        (this.state.activeTab === "env3" &&
          nextProps.sensorTrendingForGraphReducer
            .trendingDataOfParticularSensor[0].PointID ===
            this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.env3
              .id) ||
        (this.state.activeTab === "temp" &&
          nextProps.sensorTrendingForGraphReducer
            .trendingDataOfParticularSensor[0].PointID ===
            this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.temp.id)
      ) {
        this.setGraphData(nextProps);
      }
    }
  }
  getSensorData(sensorType) {
    const startDate = this.props.sensorTrendingForGraphReducer.startDate;
    const endDate = this.props.sensorTrendingForGraphReducer.endDate;
    if (sensorType === "vel") {
      this.activeTabToggle("vel");
      this.props.fetchTrendingSensorData(
        this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.vel,
        startDate,
        endDate
      );
    } else if (sensorType === "env3") {
      this.activeTabToggle("env3");
      this.props.fetchTrendingSensorData(
        this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.env3,
        startDate,
        endDate
      );
    } else if (sensorType === "temp") {
      this.activeTabToggle("temp");
      this.props.fetchTrendingSensorData(
        this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.temp,
        startDate,
        endDate
      );
    }
  }
  render() {
    return (
      <ModalBody>
        <div className="d-flex">
          <Nav tabs>
            {this.props.selectedBogieAssetObjForTrendingGraph.sensorObj &&
            this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.vel ? (
              <NavItem>
                <NavLink
                  className={classnames({
                    "disable-cursor": this.props.sensorTrendingForGraphReducer
                      .isSensorTrendingDataLoading,
                    active: this.state.activeTab === "vel"
                  })}
                  disabled={
                    this.props.sensorTrendingForGraphReducer
                      .isSensorTrendingDataLoading
                  }
                  onClick={() => {
                    this.getSensorData("vel");
                  }}>
                  Vel
                </NavLink>
              </NavItem>
            ) : null}
            {this.props.selectedBogieAssetObjForTrendingGraph.sensorObj &&
            this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.env3 ? (
              <NavItem>
                <NavLink
                  className={classnames({
                    "disable-cursor": this.props.sensorTrendingForGraphReducer
                      .isSensorTrendingDataLoading,
                    active: this.state.activeTab === "env3"
                  })}
                  disabled={
                    this.props.sensorTrendingForGraphReducer
                      .isSensorTrendingDataLoading
                  }
                  onClick={() => {
                    this.getSensorData("env3");
                  }}>
                  gE
                </NavLink>
              </NavItem>
            ) : null}
            {this.props.selectedBogieAssetObjForTrendingGraph.sensorObj &&
            this.props.selectedBogieAssetObjForTrendingGraph.sensorObj.temp ? (
              <NavItem>
                <NavLink
                  className={classnames({
                    "disable-cursor": this.props.sensorTrendingForGraphReducer
                      .isSensorTrendingDataLoading,
                    active: this.state.activeTab === "temp"
                  })}
                  disabled={
                    this.props.sensorTrendingForGraphReducer
                      .isSensorTrendingDataLoading
                  }
                  onClick={() => {
                    this.getSensorData("temp");
                  }}>
                  Temp
                </NavLink>
              </NavItem>
            ) : null}
          </Nav>
          <div
            style={{
              marginLeft: "auto",
              background: "#d1daef",
              padding: "5px"
            }}>
            <FontAwesome name="calendar" className="datepicker-icon" />
            <DateRangePicker
              startDate={this.props.sensorTrendingForGraphReducer.startDate}
              startDateId="your_unique_start_date_id"
              endDate={this.props.sensorTrendingForGraphReducer.endDate}
              endDateId="your_unique_end_date_id"
              onDatesChange={({ startDate, endDate }) => {
                if (startDate !== null) {
                  this.props.updateStartDate(startDate);
                }
                if (endDate !== null) {
                  this.props.updateEndDate(endDate);
                }
              }} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => this.setState({ focusedInput })}
              isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
              displayFormat="DD MMM YYYY"
              disabled={
                this.props.sensorTrendingForGraphReducer
                  .isSensorTrendingDataLoading
              }
            />
            <Button
              outline
              color="primary"
              className={classnames({
                "disable-cursor": this.props.sensorTrendingForGraphReducer
                  .isSensorTrendingDataLoading,
                "go-btn": true
              })}
              onClick={this.goButtonOnClick}
              disabled={
                this.props.sensorTrendingForGraphReducer
                  .isSensorTrendingDataLoading
              }>
              Go
            </Button>
          </div>
        </div>
        <div>
          {this.props.sensorTrendingForGraphReducer
            .isSensorTrendingDataLoading === true ? (
            <div className="spinner">
              <i className="fa fa-spinner fa-spin blue" />
            </div>
          ) : (
            <C3Chart
              data={this.state.graphData}
              legend={{
                position: "inset",
                item: {
                  onclick: () => {}
                }
              }}
              axis={{
                x: {
                  type: "category",
                  tick: {
                    values: this.state.tickValueArr
                  }
                }
              }}
            />
          )}
        </div>
      </ModalBody>
    );
  }
}

WheelModal.defaultProps = {
  data: {
    x: "timeLine",
    columns: [
      ["timeLine", 30, 50, 100, 230, 300, 310],
      ["data1", 30, 200, 100, 400, 150, 250]
    ],
    type: "area-spline"
  }
};

function mapStateToProps(state) {
  return {
    selectedBogieAssetObjForTrendingGraph: _.get(
      state.sensorTrendingForGraphReducer,
      "bogieAssetObj",
      null
    ),
    sensorTrendingForGraphReducer: _.get(
      state,
      "sensorTrendingForGraphReducer",
      null
    )
  };
}
const mapDispatchToProps = dispatch => ({
  fetchTrendingSensorData: (sensorObj, startDate, endDate) =>
    dispatch(
      sensorTrendingForGraphActions.fetchSensorTrendingDataForGraph(
        sensorObj,
        startDate,
        endDate
      )
    ),
  updateStartDate: dateObj =>
    dispatch(sensorTrendingForGraphActions.updateStartDate(dateObj)),
  updateEndDate: dateObj =>
    dispatch(sensorTrendingForGraphActions.updateEndDate(dateObj))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(WheelModal));
