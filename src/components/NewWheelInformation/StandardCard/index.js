import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import appConstants from "./../../../utils/appConstants";
import CardBodyForWheel from "./../CardBodyForWheelInformation/index";
class StandardCard extends Component {
  render() {
    return (
      <Card>
        <CardHeader>
          {this.props.title}
          {this.props.statusIndicatorCode !==
          appConstants.alarmIndicator.green.code ? (
            <i
              className="material-icons"
              onClick={e =>
                this.props.handleTrendingIconClick(e, this.props.boogieAssetObj)
              }>
              trending_up{" "}
            </i>
          ) : null}
        </CardHeader>
        <CardBody>
          <CardBodyForWheel data={this.props.data} />
        </CardBody>
      </Card>
    );
  }
}
export default StandardCard;
