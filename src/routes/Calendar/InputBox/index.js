import React, { useState } from "react";

const InputBox = props => {
  const [textValue, updateTextValue] = useState("");
  const handleSubmit = e => {
    props.addBtnClick(e, textValue);
    updateTextValue("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={textValue}
          onChange={e => {
            updateTextValue(e.target.value);
          }}
        />
        <button
          type="submit"
          disabled={props.isDisabled}
          onClick={handleSubmit}>
          {" "}
          add{" "}
        </button>
      </form>
    </div>
  );
};

export default InputBox;
