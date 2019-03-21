import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import "./style.scss";

class TrainStatus extends Component {
  render() {
    let bogieClass = window.location.pathname.split("/").slice(1)[1];
    let coachClass = window.location.pathname.split("/").pop();
    return (
      <div
        className={`train-status d-flex align-items-center  ${coachClass} ${bogieClass}`}>
        <div className="icon dt">
          <NavLink to="/coach/dt" className="d-flex">
            <span className="first">D</span>
            <span className="sec">T</span>
          </NavLink>
        </div>
        <div className="icon mp">
          <NavLink to="/coach/mp" className="d-flex">
            <span className="first">M</span>
            <span className="sec">P</span>
          </NavLink>
        </div>
        <div className="icon mi">
          <span className="first">M</span>
          <span className="sec">I</span>
        </div>
        <div className="icon mi2">
          <span className="first">M</span>
          <span className="sec">I</span>
        </div>
        <div className="icon mp2">
          <span className="first">M</span>
          <span className="sec">P</span>
        </div>
        <div className="icon dt2 ">
          <span className="first">D</span>
          <span className="sec">T</span>
        </div>
      </div>
    );
  }
}
TrainStatus.propTypes = {
  activeCoach: PropTypes.string,
  activeBogie: PropTypes.string
};
TrainStatus.defaultProps = {
  activeCoach: "",
  activeBogie: ""
};

export default TrainStatus;
