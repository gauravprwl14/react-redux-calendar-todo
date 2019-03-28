import React from "react";
import _ from "lodash";
import appConstants from "../../utils/constant";
import Grid from "./Grid";
import InputBox from "./InputBox";
import ListItem from "./ListItem";
import SelectBox from "./SelectBox";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateObj: {},
      selectedDate: {},
      selectedMonth: {}
    };
    // this.inputBoxRef = React.createRef();
  }
  getPath = (selectedMonth, selectedDate) => {
    if (selectedMonth && selectedMonth.id && selectedDate && selectedDate.id) {
      return `${selectedMonth.id}_${selectedDate.id}`;
    }
    return null;
  };
  handleDateClick = (e, id) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      selectedDate: { id }
    });
  };
  handleAddBtnClick = (e, notes) => {
    if (e) {
      e.preventDefault();
    }
    const path = this.getPath(
      this.state.selectedMonth,
      this.state.selectedDate
    );
    if (!path) {
      return null;
    }
    const newDateObj = {
      ...this.state.dateObj
    };
    let particularDateObj = newDateObj[path];
    // create new obj
    if (!particularDateObj) {
      particularDateObj = { data: [] };
    }
    const dataArr = [...particularDateObj.data, { text: notes }];
    particularDateObj.data = dataArr;
    newDateObj[path] = particularDateObj;
    this.setState({
      dateObj: newDateObj
    });
  };
  handleMonthSelect = e => {
    if (e) {
      const selectedMonthId = e.target.value;
      const monthObj = _.find(appConstants.monthList, obj => {
        return obj.id === parseInt(selectedMonthId, 10);
      });
      this.setState({
        selectedMonth: monthObj
      });
    }
  };
  render() {
    const path = this.getPath(
      this.state.selectedMonth,
      this.state.selectedDate
    );
    return (
      <div>
        <div>
          <SelectBox
            selectList={appConstants.monthList}
            onChange={this.handleMonthSelect}
            selectedMonth={this.state.selectedMonth}
          />
        </div>
        <Grid
          noOfCol={31}
          handleDateClick={this.handleDateClick}
          activeDate={this.state.selectedDate}
        />
        <div>
          <InputBox
            addBtnClick={this.handleAddBtnClick}
            isDisabled={!path}
            // resetRef={this.inputBoxRef}
          />
        </div>
        <div>
          <div> selected month: {this.state.selectedMonth.desc} </div>
          <div> selected Date: {this.state.selectedDate.id} </div>
          {path && <ListItem dataObj={this.state.dateObj[path]} />}
        </div>
      </div>
    );
  }
}

export default Calendar;
