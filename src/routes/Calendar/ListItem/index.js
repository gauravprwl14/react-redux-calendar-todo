import React from "react";

const Item = props => {
  return <li> {props.text} </li>;
};

const ListItems = props => {
  //   console.log("%c props of ListItem ", "background: aqua; color: black", props);
  return (
    <div>
      {props.dataObj && props.dataObj.data && props.dataObj.data.length ? (
        props.dataObj.data.map((dataObj, index) => {
          return <Item key={index} text={dataObj.text} />;
        })
      ) : (
        <div> No Notes Available </div>
      )}
    </div>
  );
};

export default ListItems;
