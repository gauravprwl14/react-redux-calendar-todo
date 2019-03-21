import _ from "lodash";
import appConstants from "../utils/appConstants";

class TrainSensorModel {
  constructor(sensorObj = {}) {
    this.id = sensorObj.id ? sensorObj.id : "";
    this.name = sensorObj.name ? sensorObj.name : "";
    this.parentSubMachineId = sensorObj.parentSubMachineId
      ? sensorObj.parentSubMachineId
      : "";
    this.description = sensorObj.description ? sensorObj.description : "";
    this.nodeType = sensorObj.nodeType ? sensorObj.nodeType : "";
    this.nodeTypeName = sensorObj.nodeTypeName ? sensorObj.nodeTypeName : "";
    this.axes = sensorObj.axes ? sensorObj.axes : "";
    this.eUType = sensorObj.eUType ? sensorObj.eUType : "";
    this.eU = sensorObj.eU ? sensorObj.eU : "";
    this.detection = sensorObj.detection ? sensorObj.detection : "";
    this.detectionName = sensorObj.detectionName ? sensorObj.detectionName : "";
    this.statusArr = sensorObj.statusArr ? sensorObj.statusArr : "";
    this.overallAlarm = sensorObj.overallAlarm ? sensorObj.overallAlarm : "";

    this.speed = sensorObj.speed ? sensorObj.speed : "";
    this.speedUnits = sensorObj.speedUnits ? sensorObj.speedUnits : "";
    this.measurements = sensorObj.measurements ? sensorObj.measurements : "";
    this.alarmInfo = sensorObj.alarmInfo ? sensorObj.alarmInfo : "";
    this.readingTimeUTC = sensorObj.readingTimeUTC
      ? sensorObj.readingTimeUTC
      : "";

    /* custom object property
    */

    // alarmHistory property keep the alarm object
    this.alarmHistory = sensorObj.alarmHistory
      ? sensorObj.alarmHistory
      : {
          warning: [],
          danger: []
        };

    // statusIndicator property tell whether the sensor state is green, amber or red
    this.statusIndicator = sensorObj.statusIndicator
      ? sensorObj.statusIndicator
      : "";
    this.customAlias = sensorObj.customAlias ? sensorObj.customAlias : "";
  }

  static fromJS(sensorObjFromApi, sensorTrendingDataArrFromApi = []) {
    const sensorObj = new TrainSensorModel();
    sensorObj.id = sensorObjFromApi.ID ? sensorObjFromApi.ID : "";
    sensorObj.name = sensorObjFromApi.Name ? sensorObjFromApi.Name : "";
    sensorObj.parentSubMachineId = sensorObjFromApi.ParentID
      ? sensorObjFromApi.ParentID
      : "";
    sensorObj.description = sensorObjFromApi.Description
      ? sensorObjFromApi.Description
      : "";
    sensorObj.nodeType = sensorObjFromApi.NodeType
      ? sensorObjFromApi.NodeType
      : "";
    sensorObj.nodeTypeName = sensorObjFromApi.NodeTypeName
      ? sensorObjFromApi.NodeTypeName
      : "";
    sensorObj.axes = sensorObjFromApi.Axes ? sensorObjFromApi.Axes : "";
    sensorObj.eUType = sensorObjFromApi.EUType ? sensorObjFromApi.EUType : "";
    sensorObj.eU = sensorObjFromApi.EU ? sensorObjFromApi.EU : "";
    sensorObj.detection = sensorObjFromApi.Detection
      ? sensorObjFromApi.Detection
      : "";
    sensorObj.detectionName = sensorObjFromApi.DetectionName
      ? sensorObjFromApi.DetectionName
      : "";
    sensorObj.statusArr = sensorObjFromApi.Status
      ? sensorObjFromApi.Status
      : "";
    sensorObj.overallAlarm = sensorObjFromApi.OverallAlarm
      ? sensorObjFromApi.OverallAlarm
      : "";

    // taking the properties from the Last Measured Reading
    sensorObj.speed = _.get(sensorObjFromApi.LastMeasurement, "Speed", "")
      ? _.get(sensorObjFromApi.LastMeasurement, "Speed", "")
      : "";
    sensorObj.speedUnits = _.get(
      sensorObjFromApi.LastMeasurement,
      "SpeedUnits",
      ""
    )
      ? _.get(sensorObjFromApi.LastMeasurement, "SpeedUnits", "")
      : "";
    sensorObj.measurements = _.get(
      sensorObjFromApi.LastMeasurement,
      "Measurements",
      ""
    )
      ? _.get(sensorObjFromApi.LastMeasurement, "Measurements", "")
      : "";
    sensorObj.alarmInfo = sensorObjFromApi.AlarmInfo
      ? sensorObjFromApi.AlarmInfo
      : "";
    sensorObj.readingTimeUTC = _.get(
      sensorObjFromApi.LastMeasurement,
      "ReadingTimeUTC",
      ""
    )
      ? _.get(sensorObjFromApi.LastMeasurement, "ReadingTimeUTC", "")
      : "";
    if (sensorTrendingDataArrFromApi && sensorTrendingDataArrFromApi.length) {
      sensorObj.updateAlarmHistory([sensorTrendingDataArrFromApi]);
    }

    return sensorObj;
  }
  updateSensorData(response) {
    if (response && response.length) {
      this.measurements = response[0].Measurements
        ? response[0].Measurements
        : "";
    }
  }
  updateAlarmHistory(sensorMeasurementsArr = []) {
    const warningAlarm = [];
    const dangerAlarm = [];
    if (sensorMeasurementsArr && sensorMeasurementsArr.length) {
      sensorMeasurementsArr.forEach(sensorMeasuredObj => {
        if (sensorMeasuredObj.AlarmInfo && sensorMeasuredObj.AlarmInfo.length) {
          sensorMeasuredObj.AlarmInfo.forEach(alarmObject => {
            if (!alarmObject.Acknowledged) {
              const mappedAlarmObj = this.mapAlarmObject(alarmObject);
              // check if alarm belong to warning or danger
              let alarmBelongTo = this.getAlarmType(mappedAlarmObj);
              switch (alarmBelongTo.code) {
                case appConstants.alarmIndicator.warning.code: {
                  warningAlarm.push(mappedAlarmObj);
                  break;
                }
                case appConstants.alarmIndicator.danger.code: {
                  dangerAlarm.push(mappedAlarmObj);
                  break;
                }
                default: {
                }
              }
            }
          });
        }
      });
    }

    if (dangerAlarm && dangerAlarm.length) {
      this.statusIndicator = appConstants.alarmIndicator.danger.code;
      this.statusIndicatorTitle = appConstants.alarmIndicator.danger.title;
    } else if (warningAlarm && warningAlarm.length) {
      this.statusIndicator = appConstants.alarmIndicator.warning.code;
      this.statusIndicatorTitle = appConstants.alarmIndicator.warning.title;
    } else {
      this.statusIndicator = appConstants.alarmIndicator.green.code;
      this.statusIndicatorTitle = appConstants.alarmIndicator.green.title;
    }
    this.alarmHistory = {
      warning: warningAlarm,
      danger: dangerAlarm
    };
  }

  getAlarmType(mappedAlarmObj) {
    let alarmBelongTo = appConstants.alarmIndicator.green;
    const isWarningAlarm =
      _.findIndex(
        appConstants.alarmStatusColorMapping.warning,
        warningStatus =>
          mappedAlarmObj.alarmStatusText &&
          warningStatus.toLowerCase() ===
            mappedAlarmObj.alarmStatusText.toLowerCase()
      ) !== -1;
    const isDangerAlarm =
      _.findIndex(
        appConstants.alarmStatusColorMapping.danger,
        dangerStatus =>
          mappedAlarmObj.alarmStatusText &&
          dangerStatus.toLowerCase() ===
            mappedAlarmObj.alarmStatusText.toLowerCase()
      ) !== -1;
    if (isDangerAlarm) {
      alarmBelongTo = appConstants.alarmIndicator.danger;
    } else if (isWarningAlarm) {
      alarmBelongTo = appConstants.alarmIndicator.warning;
    } else if (mappedAlarmObj.alarmStatusText.includes("warning")) {
      // special case
      alarmBelongTo = appConstants.alarmIndicator.warning;
    } else if (mappedAlarmObj.alarmStatusText.includes("alarm")) {
      // special case
      alarmBelongTo = appConstants.alarmIndicator.danger;
    } else {
      // if alarm status does not satisfies the above condition than
      // putting the alarm to warning state as we can’t neglect any alarm
      alarmBelongTo = appConstants.alarmIndicator.warning;
    }
    return alarmBelongTo;
  }

  mapAlarmObject(alarmObj) {
    const mappedObj = {
      alarmDate: "",
      title: "",
      acknowledged: false,
      acknowledgedDateTime: "",
      alarmStatusText: "",
      source: 0,
      alarmSourceName: "",
      currentValue: 0,
      alarmLevel: 0,
      eU: ""
    };
    mappedObj.alarmDate = alarmObj.AlarmDate ? alarmObj.AlarmDate : "";
    mappedObj.title = alarmObj.Title ? alarmObj.Title : "";
    mappedObj.acknowledged = alarmObj.Acknowledged ? alarmObj.Acknowledged : "";
    mappedObj.alarmStatusText = alarmObj.AlarmStatusText
      ? alarmObj.AlarmStatusText
      : "";
    mappedObj.source = alarmObj.Source ? alarmObj.Source : "";
    mappedObj.alarmSourceName = alarmObj.AlarmSourceName
      ? alarmObj.AlarmSourceName
      : "";
    mappedObj.currentValue = alarmObj.CurrentValue ? alarmObj.CurrentValue : "";
    mappedObj.alarmLevel = alarmObj.AlarmLevel ? alarmObj.AlarmLevel : "";
    mappedObj.eU = alarmObj.EU ? alarmObj.EU : "";

    return mappedObj;
  }

  addCustomCode(sensorAliasObj) {
    this.customAlias = sensorAliasObj;
  }
}

export default TrainSensorModel;
