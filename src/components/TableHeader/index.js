import React, { Component } from "react";

class TableHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          <th />
          <th>ASSETS</th>
          <th>
            VEL
            <span>(MM/S RMS)</span>
          </th>
          <th>
            Env3
            <span>(gE PTP)</span>
          </th>
          <th>
            TEMP
            <span>(&deg;c) </span>
          </th>
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
