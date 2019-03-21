import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import AirCard from "./AirCard/index";
import StandardCard from "./StandardCard/index";
class WheelInformation extends PureComponent {
  render() {
    return (
      <div>
        <div
          className={`part-info ${
            this.props.isActive
              ? `${this.props.className} ${this.props.activeClassName} ${
                  this.props.statusIndicatorCode
                }`
              : `${this.props.className} ${this.props.statusIndicatorCode}`
          }`}>
          <div className="pin" />
          <div className="pulse" />
          {this.props.isAirComp === true || this.props.isAircon === true ? (
            <AirCard
              title={this.props.title}
              isAirComp={this.props.isAirComp}
              isAircon={this.props.isAircon}
              handleTrendingIconClick={this.props.handleTrendingIconClick}
              data={this.props.data}
              statusIndicatorCode={this.props.statusIndicatorCode}
              boogieAssetObj={this.props.boogieAssetObj}
            />
          ) : (
            <StandardCard
              title={this.props.title}
              data={this.props.data}
              handleTrendingIconClick={this.props.handleTrendingIconClick}
              boogieAssetObj={this.props.boogieAssetObj}
              statusIndicatorCode={this.props.statusIndicatorCode}
            />
          )}
        </div>
      </div>
    );
  }
}

WheelInformation.propTypes = {
  title: PropTypes.string,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  data: PropTypes.object,
  isActive: PropTypes.bool,
  activeClassName: PropTypes.string
};
WheelInformation.defaultProps = {
  onClick: () => {},
  isActive: false
};

export default WheelInformation;
