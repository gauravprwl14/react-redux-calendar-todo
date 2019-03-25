import React from "react";

const Item = props => {
  return <li> {props.text} </li>;
};

const ListItems = props => {
  return (
    <div>
      {props.data.length ? (
        props.data.map((dataObj, index) => {
          return <Item key={index} text={dataObj.text} />;
        })
      ) : (
        <div> No Notes Available </div>
      )}
    </div>
  );
};

export default ListItems;
