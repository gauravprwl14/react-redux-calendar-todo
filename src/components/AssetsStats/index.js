import React, { Component } from "react";
import ReactSpeedometer from "react-d3-speedometer";

class AssetsStats extends Component {
  render() {
    return (
      <div
        className={`top-container d-flex align-items-center bg_${
          this.props.color
        }`}>
        <div className="d-flex left-section flex-column">
          <div className={`value ${this.props.loader}`}>{this.props.value}</div>
          <div className="title">{this.props.name}</div>
        </div>
        <div className={`triangle bg_${this.props.color}`} />

        <div className="speedometer-wrap">
          <ReactSpeedometer
            value={Number(this.props.value)}
            needleColor="#0D46BB"
            segments={8}
            width={125}
            height={125}
            ringWidth={30}
            minValue={0}
            maxValue={120}
            startColor="#017501"
            endColor="#ed3401"
            currentValueText="KMPS"
          />
        </div>
      </div>
    );
  }
}

export default AssetsStats;
