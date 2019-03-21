import React, { Component } from "react";
import _ from "lodash";
class CardBodyForWheel extends Component {
  render() {
    return (
      <ul>
        {this.props.data &&
          this.props.data.length === 0 && <li> No Information Available</li>}
        {this.props.data && Object.keys(this.props.data).length
          ? Object.keys(this.props.data)
              .filter(sensorType => {
                if (this.props.data[sensorType] && sensorType !== "acc") {
                  return true;
                }
                return false;
              })
              .map((sensorType, index) => {
                return (
                  <li key={index}>
                    {" "}
                    <span className="text-capitalize">{sensorType}</span>:{" "}
                    {_.get(
                      this.props.data[sensorType],
                      "measurements.0.Level",
                      null
                    )
                      ? _.get(
                          this.props.data[sensorType],
                          "measurements.0.Level",
                          null
                        ).toFixed(2)
                      : "-"}{" "}
                    &nbsp;
                    {_.get(
                      this.props.data[sensorType],
                      "measurements.0.Units",
                      null
                    )
                      ? _.get(
                          this.props.data[sensorType],
                          "measurements.0.Units",
                          null
                        )
                      : "-"}
                  </li>
                );
              })
          : null}
      </ul>
    );
  }
}
export default CardBodyForWheel;
