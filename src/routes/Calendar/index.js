import React from "react";
import Grid from "./Grid";
import InputBox from "./InputBox";
import ListItem from "./ListItem";
class Calendar extends React.Component {
  render() {
    return (
      <div>
        <Grid noOfCol={31} />
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
