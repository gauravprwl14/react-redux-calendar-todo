import React, { Component } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import appConstants from "./../../../utils/appConstants";
import aircompImg from "./../../../assets/images/aircompressor.png";
import airconImg from "./../../../assets/images/aircorn.png";
import CardBodyForWheel from "./../CardBodyForWheelInformation/index";
class AirCard extends Component {
  render() {
    return (
      <Card className="cardImg">
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
        <CardBody className="d-flex alien-items-center">
          <div className="imgCom">
            {this.props.isAircon === true ? (
              <img src={airconImg} alt="aircon img" />
            ) : (
              <img src={aircompImg} alt="aircomp img" />
            )}
          </div>
          <CardBodyForWheel data={this.props.data} />
        </CardBody>
      </Card>
    );
  }
}
export default AirCard;
