import React, { useState, useEffect } from "react";
import "./styles.scss";

const Col = props => {
  return (
    <div
      className={`grid-col ${props.active ? "active" : ""}`}
      onClick={e => props.handleDateClick(e, props.id)}
      value={props.id}>
      {props.id}{" "}
    </div>
  );
};

const Grid = props => {
  const [colArr, setColArr] = useState([]);
  useEffect(() => {
    let numberArr = [];
    for (let i = 1; i <= props.noOfCol; i++) {
      numberArr.push({ id: i });
    }
    setColArr(numberArr);
  }, [props.noOfCol]);

  return (
    <div className="grid-container">
      {colArr.map(col => {
        return (
          <Col
            key={col.id}
            id={col.id}
            active={props.activeDate && props.activeDate.id === col.id}
            handleDateClick={props.handleDateClick}
          />
        );
      })}
    </div>
  );
};

export default Grid;
