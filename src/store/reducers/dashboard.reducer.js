import dashboardConstants from "../constants/dashboard.constant";
import rootConstants from "../constants/root.constant";
/**
 * Contains the State Related to the Train Coach
 *
 */
const initialState = {
  showFetchingDataLoadingIndicator: false,
  isFirstTimeDataFetchingComplete: false,
  isFirstTimeDataFetchingForTrendingApiComplete: false,
  sensorNodeStatusCount: {
    dt: {
      green: 0,
      amber: 0,
      red: 0
    },
    mp: {
      green: 0,
      amber: 0,
      red: 0
    },
    overAll: {
      green: 0,
      amber: 0,
      red: 0
    }
  }
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case dashboardConstants.openFetchingDataLoadingIndicator: {
      return {
        ...state,
        showFetchingDataLoadingIndicator: action.data
      };
    }
    case dashboardConstants.closeFetchingDataLoadingIndicator: {
      return {
        ...state,
        showFetchingDataLoadingIndicator: action.data
      };
    }
    case dashboardConstants.updateFirstTimeDataFetchingStatus: {
      return {
        ...state,
        isFirstTimeDataFetchingComplete: action.data
      };
    }
    case dashboardConstants.updateSensorNodeStatistic: {
      return {
        ...state,
        sensorNodeStatusCount: action.data
      };
    }
    case dashboardConstants.updateFirstTimeDataFetchingForTrendingStatus: {
      return {
        ...state,
        isFirstTimeDataFetchingForTrendingApiComplete: action.data
      };
    }
    case rootConstants.logOut: {
      return {
        ...initialState
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default dashboardReducer;
