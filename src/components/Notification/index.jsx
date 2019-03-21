import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import { Card, CardBody } from "reactstrap";
import "./style.scss";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.getMappedBogieName = this.getMappedBogieName.bind(this);
  }
  getMappedBogieName(bogieType) {
    switch (bogieType) {
      case "boogieOne": {
        return "Bogie 1";
      }
      case "boogieTwo": {
        return "Bogie 2";
      }
      default:
        return "Bogie";
    }
  }
  render() {
    let notificationClass = window.location.pathname.split("/").pop();

    return (
      <div className="notification">
        <Card>
          <CardBody>
            <div className="d-flex align-items-center justify-content-center">
              {notificationClass === "amber" ? (
                <i className="material-icons d-flex align-items-center justify-content-center text-yellow">
                  error_outline
                </i>
              ) : (
                <i className="material-icons d-flex align-items-center justify-content-center text-red">
                  warning
                </i>
              )}

              <div className="boggie-detail d-flex flex-column  justify-content-center">
                <span className="text-capital">
                  {_.get(this.props.notificationObj, "coachName", "")} /
                  {this.getMappedBogieName(
                    _.get(this.props.notificationObj, "boogieType", "")
                  )}
                </span>{" "}
                <span>
                  {_.get(this.props.notificationObj, "bogieAssetObj.name", "")}
                </span>
              </div>
              <div className="description  d-flex align-items-center justify-content-start">
                {/* Overheated due to some technical issue */}
                {_.get(this.props.notificationObj, "alarmObj.title", "")}
                &nbsp;{" "}
                {_.get(
                  this.props.notificationObj,
                  "alarmObj.currentValue",
                  ""
                )}{" "}
                {_.get(this.props.notificationObj, "alarmObj.eU", "")}
              </div>
              <div className="time-stamp  d-flex align-items-center justify-content-start">
                <i className="material-icons">alarm</i>
                {_.get(this.props.notificationObj, "alarmObj.alarmDate", "")
                  ? moment(
                      _.get(
                        this.props.notificationObj,
                        "alarmObj.alarmDate",
                        ""
                      )
                    ).format("DD/MM/YYYY hh:mm")
                  : ""}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Notification;
