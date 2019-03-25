import React from "react";
import Grid from "./Grid";
import InputBox from "./InputBox";
import ListItem from "./ListItem";
class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateObj: {},
      selectedDate: {}
    };
  }
  handleDateClick = (e, id) => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      selectedDate: id
    });
  };
  render() {
    return (
      <div>
        <Grid noOfCol={31} handleDateClick={this.handleDateClick} />
        <div>
          <InputBox />
        </div>
        <div>
          <ListItem data={[{ text: "hello world" }]} />
        </div>
      </div>
    );
  }
}

export default Calendar;
