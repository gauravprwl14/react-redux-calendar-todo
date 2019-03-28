import React, { useState } from "react";

const InputBox = props => {
  const [textValue, updateTextValue] = useState("");
  const resetValue = () => {
    updateTextValue("");
  };
  return (
    <div>
      <input
        type="text"
        value={textValue}
        onChange={e => {
          updateTextValue(e.target.value);
        }}
      />
      <button
        onClick={e => {
          props.addBtnClick(e, textValue);
          updateTextValue("");
        }}>
        {" "}
        add{" "}
      </button>
      .<button onClick={resetValue}> reset </button>.
    </div>
  );
};

export default InputBox;
