import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, ModalBody } from "reactstrap";

class Spinner extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.openModal}
        className="loading-modal"
        backdrop="static"
        centered>
        <ModalBody className="text-center">
          <i className="fa fa-spinner fa-spin blue" />
          <p>Fetching data..</p>
        </ModalBody>
      </Modal>
    );
  }
}

Spinner.defaultProps = {
  openModal: false
};
Spinner.propTypes = {
  openModal: PropTypes.bool
};

export default Spinner;
