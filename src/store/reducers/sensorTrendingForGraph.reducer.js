import sensorTrendingForGraphConstants from "../constants/sensorTrendingForGraph.constants";
import appConstants from "../../utils/appConstants";
import moment from "moment";
import "moment-timezone";
/**
 * Contains the State Related to the Sensor Trending Graph Data
 *
 */
moment.tz.setDefault(appConstants.appTimeZone);
const initialState = {
  openSensorTrendingModal: false,
  activeSensorType: appConstants.sensorTypes.env3,
  isSensorTrendingDataLoading: true,
  bogieAssetObj: {},
  errorInSensorTrendingData: {
    isError: false,
    msg: false
  },
  trendingDataOfParticularSensor: [],
  startDate: moment().subtract(1, "days"),
  endDate: moment()
};

const sensorTrending = (state = initialState, action) => {
  switch (action.type) {
    case sensorTrendingForGraphConstants.getSensorTrendingDataRequest: {
      return {
        ...state,
        isSensorTrendingDataLoading: true
      };
    }
    case sensorTrendingForGraphConstants.getSensorTrendingDataSuccess: {
      return {
        ...state,
        isSensorTrendingDataLoading: false,
        trendingDataOfParticularSensor: action.data,
        errorInSensorTrendingData: { isError: false, msg: "" }
      };
    }
    case sensorTrendingForGraphConstants.getSensorTrendingDataFail: {
      return {
        ...state,
        isSensorTrendingDataLoading: false,
        errorInSensorTrendingData: { isError: true, msg: action.data }
      };
    }
    case sensorTrendingForGraphConstants.updateActiveSensorTypeForTrendingGraph: {
      return {
        ...state,
        activeSensorType: action.data
      };
    }
    case sensorTrendingForGraphConstants.openSensorTrendingGraphModal: {
      return {
        ...state,
        openSensorTrendingModal: action.data.openModal,
        bogieAssetObj: action.data.bogieAssetObj
      };
    }
    case sensorTrendingForGraphConstants.closeSensorTrendingGraphModal: {
      return {
        ...state,
        ...initialState
      };
    }
    case sensorTrendingForGraphConstants.resetSensorTrendingDataOfGraph: {
      return {
        ...state,
        ...initialState
      };
    }
    case sensorTrendingForGraphConstants.updateStartDateObj: {
      return {
        ...state,
        startDate: action.data
      };
    }
    case sensorTrendingForGraphConstants.updateEndDateObj: {
      return {
        ...state,
        endDate: action.data
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default sensorTrending;
