import appConstants from "../utils/appConstants";

class BoogieAssetModel {
  constructor(boogieAssetObj = {}) {
    this.name = boogieAssetObj.name;
    this.code = boogieAssetObj.code;
    this.className = boogieAssetObj.className;
    this.sensorNameArr = boogieAssetObj.sensorNameArr;
    this.boogieType = boogieAssetObj.boogieType;

    this.coachObj = boogieAssetObj.coachObj ? boogieAssetObj.coachObj : null;

    this.subMachineObj = boogieAssetObj.subMachineObj
      ? boogieAssetObj.subMachineObj
      : null;

    this.sensorObj = {};

    this.sensorObj["acc"] =
      boogieAssetObj &&
      boogieAssetObj.sensorObj &&
      boogieAssetObj.sensorObj["acc"]
        ? boogieAssetObj.sensorObj["acc"]
        : null;
    this.sensorObj["vel"] =
      boogieAssetObj &&
      boogieAssetObj.sensorObj &&
      boogieAssetObj.sensorObj["vel"]
        ? boogieAssetObj.sensorObj["vel"]
        : null;
    this.sensorObj["env3"] =
      boogieAssetObj &&
      boogieAssetObj.sensorObj &&
      boogieAssetObj.sensorObj["env3"]
        ? boogieAssetObj.sensorObj["env3"]
        : null;
    this.sensorObj["temp"] =
      boogieAssetObj &&
      boogieAssetObj.sensorObj &&
      boogieAssetObj.sensorObj["temp"]
        ? boogieAssetObj.sensorObj["temp"]
        : null;
    this.title = boogieAssetObj.title;
    this.statusIndicator = boogieAssetObj.statusIndicator;
  }
  static fromJS(preDefineBoogieAssetObj, coachObj, arrOfSensorObj) {
    const boogieAssetObj = new BoogieAssetModel();
    boogieAssetObj.name = preDefineBoogieAssetObj.name;
    boogieAssetObj.code = preDefineBoogieAssetObj.code;
    boogieAssetObj.className = preDefineBoogieAssetObj.className;
    boogieAssetObj.sensorNameArr = preDefineBoogieAssetObj.sensorNameArr;
    boogieAssetObj.boogieType = preDefineBoogieAssetObj.boogieType;
    boogieAssetObj.coachObj = coachObj;
    boogieAssetObj.sensorObj = {};
    if (arrOfSensorObj) {
      boogieAssetObj.sensorObj["acc"] = arrOfSensorObj["acc"]
        ? arrOfSensorObj["acc"]
        : null;
      boogieAssetObj.sensorObj["vel"] = arrOfSensorObj["vel"]
        ? arrOfSensorObj["vel"]
        : null;
      boogieAssetObj.sensorObj["env3"] = arrOfSensorObj["env3"]
        ? arrOfSensorObj["env3"]
        : null;
      boogieAssetObj.sensorObj["temp"] = arrOfSensorObj["temp"]
        ? arrOfSensorObj["temp"]
        : null;
    }

    const statusIndicatorObj = boogieAssetObj.computeBogieAssetOverAllStatus();

    boogieAssetObj.title = statusIndicatorObj.title;
    boogieAssetObj.statusIndicator = statusIndicatorObj.code;

    return boogieAssetObj;
  }

  computeBogieAssetOverAllStatus() {
    let isAnySensorStatusDanger = false;
    let isAnySensorStatusWarning = false;
    let isAnySensorStatusGreen = false;
    ["vel", "env3", "temp"].forEach(sensorType => {
      if (
        this.sensorObj[sensorType] &&
        this.sensorObj[sensorType].statusIndicator
      ) {
        switch (this.sensorObj[sensorType].statusIndicator) {
          case appConstants.alarmIndicator.danger.code: {
            if (!isAnySensorStatusDanger) {
              isAnySensorStatusDanger = true;
            }
            break;
          }
          case appConstants.alarmIndicator.warning.code: {
            if (!isAnySensorStatusWarning) {
              isAnySensorStatusWarning = true;
            }
            break;
          }
          case appConstants.alarmIndicator.green.code: {
            if (!isAnySensorStatusGreen) {
              isAnySensorStatusGreen = true;
            }
            break;
          }
          default: {
            isAnySensorStatusGreen = true;
          }
        }
      }
    });
    if (isAnySensorStatusDanger) {
      return appConstants.alarmIndicator.danger;
    } else if (isAnySensorStatusWarning) {
      return appConstants.alarmIndicator.warning;
    } else {
      return appConstants.alarmIndicator.green;
    }
  }
}

export default BoogieAssetModel;
