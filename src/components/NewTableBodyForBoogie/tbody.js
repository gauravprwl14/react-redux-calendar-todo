import React, { Component } from "react";
import appConstants from "../../utils/appConstants";
import _ from "lodash";
import FontAwesome from "react-fontawesome";

const tableHeaderSequence = [
  appConstants.sensorTypes.vel,
  appConstants.sensorTypes.env3,
  appConstants.sensorTypes.temp
];

class TBody extends Component {
  constructor(props) {
    super(props);
    this.getClassName = this.getClassName.bind(this);
    this.computeBogieStatusObj = this.computeBogieStatusObj.bind(this);
  }
  getClassName(bogieAssetObj, tableHeaderKey) {
    const sensorObj = _.get(bogieAssetObj, `sensorObj.${tableHeaderKey}`, null);
    if (sensorObj) {
      switch (sensorObj.statusIndicator) {
        case appConstants.alarmIndicator.green.code: {
          return "";
        }
        case appConstants.alarmIndicator.warning.code: {
          return "text-warning";
        }
        case appConstants.alarmIndicator.danger.code: {
          return "text-danger";
        }
        default: {
          return "";
        }
      }
    }
  }
  computeBogieStatusObj(bogieAssetObj) {
    let statusObj = appConstants.alarmIndicator.green;
    statusObj.className = "bg_green";
    switch (bogieAssetObj.statusIndicator) {
      case appConstants.alarmIndicator.danger.code: {
        statusObj = appConstants.alarmIndicator.danger;
        statusObj.className = "bg_red";
        break;
      }
      case appConstants.alarmIndicator.warning.code: {
        statusObj = appConstants.alarmIndicator.warning;
        statusObj.className = "bg_yellow";
        break;
      }
      case appConstants.alarmIndicator.green.code: {
        statusObj = appConstants.alarmIndicator.green;
        statusObj.className = "bg_green";
        break;
      }
      default: {
        statusObj = appConstants.alarmIndicator.green;
        statusObj.className = "bg_green";
      }
    }

    return statusObj;
  }
  render() {
    return (
      <tbody>
        {this.props.bogieAssetData && this.props.bogieAssetData.length === 0 ? (
          <tr colSpan="">
            <td colSpan="5" className="text-center">
              {" "}
              No Data Available{" "}
            </td>
          </tr>
        ) : null}
        {this.props.bogieAssetData && this.props.bogieAssetData.length
          ? this.props.bogieAssetData.map((bogieAssetObj, index) => {
              const computeStatusObj = this.computeBogieStatusObj(
                bogieAssetObj
              );
              return (
                <tr key={index}>
                  {this.props.tableLayout ===
                  appConstants.bogieTableLayout.dottedStatus ? (
                    <td>
                      <span>
                        {bogieAssetObj.name ? (
                          <span className={computeStatusObj.className}>
                            <FontAwesome name="circle" />
                          </span>
                        ) : (
                          "-"
                        )}
                      </span>
                    </td>
                  ) : null}
                  <td>{bogieAssetObj.name ? bogieAssetObj.name : "-"}</td>
                  {this.props.tableLayout ===
                  appConstants.bogieTableLayout.statusBar ? (
                    <td>
                      <span className={computeStatusObj.className}>
                        {computeStatusObj.title}
                      </span>
                    </td>
                  ) : null}

                  {tableHeaderSequence.map((tableHeaderKey, index) => {
                    const sensorObj = _.get(
                      bogieAssetObj,
                      `sensorObj.${tableHeaderKey}`,
                      null
                    );
                    return (
                      <td
                        key={index}
                        className={this.getClassName(
                          bogieAssetObj,
                          tableHeaderKey
                        )}>
                        {sensorObj &&
                        _.get(sensorObj, `measurements.0.Level`, null)
                          ? _.get(
                              sensorObj,
                              `measurements.0.Level`,
                              null
                            ).toFixed(2)
                          : "-"}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          : null}
      </tbody>
    );
  }
}
export default TBody;
