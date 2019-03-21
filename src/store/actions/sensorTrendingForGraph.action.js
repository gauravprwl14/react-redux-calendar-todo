import { toastr as toastrActions } from "react-redux-toastr";
import moment from "moment";
import appConstants from "./../../utils/appConstants";
import sensorTrendingForGraphConstants from "../constants/sensorTrendingForGraph.constants";
import observerService from "../../services/observerService";

function getSensorTrendingDataForGraphRequest() {
  return {
    type: sensorTrendingForGraphConstants.getSensorTrendingDataRequest,
    data: true
  };
}

function getSensorTrendingDataForGraphSuccess(sensorTrendingData) {
  return {
    type: sensorTrendingForGraphConstants.getSensorTrendingDataSuccess,
    data: sensorTrendingData
  };
}
function getSensorTrendingDataForGraphFail(errorResponse) {
  return {
    type: sensorTrendingForGraphConstants.getSensorTrendingDataFail,
    error: errorResponse
  };
}

function fetchSensorTrendingDataForGraph(
  sensorObj,
  startDate,
  endDate,
  readings
) {
  return async dispatch => {
    try {
      let startDateUTCString, endDateUTCString;
      if (startDate && endDate) {
        startDateUTCString = moment(startDate)
          .startOf("day")
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss");
        // when endDate matches same day, then endDate time is set to current time
        if (endDate.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")) {
          endDate = moment();
        } else {
          endDate.endOf("day");
        }
        endDateUTCString = moment(endDate)
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss");
      }
      dispatch(getSensorTrendingDataForGraphRequest());
      const response = await observerService.getSensorPointListTrendingData(
        sensorObj.id,
        startDateUTCString,
        endDateUTCString,
        200,
        appConstants.priorityMax
      );
      const reversedResponse =
        response && response.length ? response.reverse() : [];
      dispatch(getSensorTrendingDataForGraphSuccess(reversedResponse));
    } catch (error) {
      toastrActions.error("Error", error);
      console.log(
        "%c some error occurred inside fetchSensorTrendingDataForGraph",
        "background: salmon; color: black",
        error
      );
      dispatch(getSensorTrendingDataForGraphFail(error));
    }
  };
}

function updateOpenModalForSensorTrendingGraph(value) {
  return {
    type: sensorTrendingForGraphConstants.openSensorTrendingGraphModal,
    data: value
  };
}
function updateCloseModalForSensorTrendingGraph(value) {
  return {
    type: sensorTrendingForGraphConstants.closeSensorTrendingGraphModal,
    data: value
  };
}
function updateSelectedSensorObjectForTrendingGraph(sensorObj) {
  return {
    type: sensorTrendingForGraphConstants.openCloseSensorTrendingGraphModal,
    data: sensorObj
  };
}
function updateStartDate(dateObj) {
  return {
    type: sensorTrendingForGraphConstants.updateStartDateObj,
    data: dateObj
  };
}
function updateEndDate(dateObj) {
  return {
    type: sensorTrendingForGraphConstants.updateEndDateObj,
    data: dateObj
  };
}
export default {
  fetchSensorTrendingDataForGraph,
  updateOpenModalForSensorTrendingGraph,
  updateCloseModalForSensorTrendingGraph,
  updateSelectedSensorObjectForTrendingGraph,
  updateStartDate,
  updateEndDate
};
