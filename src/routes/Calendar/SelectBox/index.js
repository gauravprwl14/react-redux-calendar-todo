import React from "react";

const SelectBox = props => {
  return (
    <div>
      <select
        onChange={props.onChange}
        value={(props.selectedMonth && props.selectedMonth.id) || ""}>
        <option value="" disabled>
          {" "}
          Select Month{" "}
        </option>
        {props.selectList &&
          props.selectList.length &&
          props.selectList.map(obj => {
            return (
              <option value={obj.id} key={obj.id}>
                {" "}
                {obj.desc}{" "}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default SelectBox;
