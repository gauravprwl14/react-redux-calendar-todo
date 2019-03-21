import dashboardConstant from "../constants/dashboard.constant";

function openFetchingDataLoadingIndicator() {
  return {
    type: dashboardConstant.openFetchingDataLoadingIndicator,
    data: true
  };
}
function closeFetchingDataLoadingIndicator() {
  return {
    type: dashboardConstant.closeFetchingDataLoadingIndicator,
    data: false
  };
}
function updateFirstTimeDataFetchingStatus(value) {
  return {
    type: dashboardConstant.updateFirstTimeDataFetchingStatus,
    data: value
  };
}
function updateFirstTimeDataFetchingForTrendingApiStatus(value) {
  return {
    type: dashboardConstant.updateFirstTimeDataFetchingForTrendingStatus,
    data: value
  };
}
function updateSensorNodeStatisticForEachCoach(sensorNodeStatistics) {
  return {
    type: dashboardConstant.updateSensorNodeStatistic,
    data: sensorNodeStatistics
  };
}

export default {
  openFetchingDataLoadingIndicator,
  closeFetchingDataLoadingIndicator,
  updateFirstTimeDataFetchingStatus,
  updateFirstTimeDataFetchingForTrendingApiStatus,
  updateSensorNodeStatisticForEachCoach
};
