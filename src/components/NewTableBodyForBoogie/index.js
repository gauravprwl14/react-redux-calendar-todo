import React, { Component } from "react";
import PropTypes from "prop-types";

import { Table } from "reactstrap";
import TBody from "./tbody";

class TableBodyForBoogie extends Component {
  render() {
    return (
      <div className="col-sm-6 table-body-for-bogie-container">
        <div className="tableScroll">
          <Table responsive>
              <TBody {...this.props} />
          </Table>
        </div>
      </div>
    );
  }
}

TableBodyForBoogie.propTypes = {
  bogieAssetData: PropTypes.array,
  tableLayout: PropTypes.string
};

TableBodyForBoogie.defaultProps = {
  bogieAssetData: [],
  tableLayout: "status-bar" // or dotted-status
};

export default TableBodyForBoogie;
