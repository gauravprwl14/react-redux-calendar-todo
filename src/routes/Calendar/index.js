import React, { useRef } from "react";
import Grid from "./Grid";
import InputBox from "./InputBox";
import ListItem from "./ListItem";
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
  handleDateClick = (e, id) => {
    if (e) {
      e.preventDefault();
    }
    const newDateObj = {
      ...this.state.dateObj
    };
    if (!newDateObj[id]) {
      newDateObj[id] = {
        data: []
      };
    }
    this.setState({
      selectedDate: { id },
      dateObj: newDateObj
    });
  };
  handleAddBtnClick = (e, notes) => {
    const dateId = this.state.selectedDate && this.state.selectedDate.id;
    const particularDateObj = this.state.dateObj[dateId];
    if (particularDateObj) {
      const dataArr = [...particularDateObj.data, { text: notes }];
      particularDateObj.data = dataArr;
      const newDateObj = {
        ...this.state.dateObj
      };
      newDateObj[dateId] = particularDateObj;
      this.setState({
        dateObj: newDateObj
      });
    }
  };
  render() {
    return (
      <div>
        <Grid
          noOfCol={31}
          handleDateClick={this.handleDateClick}
          activeDate={this.state.selectedDate}
        />
        <div>
          <InputBox
            addBtnClick={this.handleAddBtnClick}
            // resetRef={this.inputBoxRef}
          />
        </div>
        <div>
          <div> selected Date: {this.state.selectedDate.id} </div>
          {this.state.selectedDate &&
            this.state.selectedDate.id &&
            this.state.dateObj[this.state.selectedDate.id] && (
              <ListItem
                dataObj={this.state.dateObj[this.state.selectedDate.id]}
              />
            )}
        </div>
      </div>
    );
  }
}

export default Calendar;
