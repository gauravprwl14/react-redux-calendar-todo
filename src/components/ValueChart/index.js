import React, { Component } from "react";
import { Card } from "reactstrap";
import C3Chart from "react-c3js";
import "c3/c3.css";
import "./style.scss";

class ValueChart extends Component {
  state = {
    selectedOption: ""
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  render() {
    const pieChartData = {
      columns: [
        ["Green", this.props.green],
        ["Red", this.props.red],
        ["Yellow", this.props.amber]
      ],
      type: "pie",

      colors: {
        Green: "#83C215",
        Red: "#EB202B",
        Yellow: "#DFBE13"
      }
    };
    // const { selectedOption } = this.state;
    return (
      <div className="pie-chart">
        <Card>
          <div className="d-flex justify-content-between value-chart-color">
            <div className="value-color green">Green</div>
            <div className="value-color red">Red</div>
            <div className="value-color yellow">Amber</div>
          </div>
          <div className="piecart">
            <C3Chart data={pieChartData} />
          </div>
        </Card>
      </div>
    );
  }
}
export default ValueChart;
