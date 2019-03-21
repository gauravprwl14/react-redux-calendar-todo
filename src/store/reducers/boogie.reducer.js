import boogieConstant from "../constants/boogie.constant";
import rootConstants from "../constants/root.constant";
/**
 * Contains the Boogies Related State for the Train
 *
 */
const initialState = {
  sensorArray: {
    dt: {},
    mp: {}
  },
  sensorArrayError: {
    isError: false,
    msg: false
  },
  showSpeedSensorLoadingIndicator: false,
  showTrendingDataLoadingIndicator: false,

  lastTrendingUpdated: "",

  boogieAssetData: {
    dt: {
      boogieOne: [],
      boogieTwo: []
    },
    mp: {
      boogieOne: [],
      boogieTwo: []
    },
    mi: {
      boogieOne: [],
      boogieTwo: []
    },
    mi2: {
      boogieOne: [],
      boogieTwo: []
    },
    mp2: {
      boogieOne: [],
      boogieTwo: []
    },
    dt2: {
      boogieOne: [],
      boogieTwo: []
    }
  }
};

const coachReducer = (state = initialState, action) => {
  switch (action.type) {
    case boogieConstant.getSensorNodeForEachSubMachineRequest: {
      return {
        ...state,
        showCoachAssetsLoadingIndication: action.data
      };
    }
    case boogieConstant.getSensorNodeForEachSubMachineSuccess: {
      return {
        ...state,
        sensorArray: action.data,
        showCoachAssetsLoadingIndication: false
      };
    }
    case boogieConstant.getSensorNodeForEachSubMachineFail: {
      return {
        ...state,
        showCoachAssetsLoadingIndication: false,
        sensorArrayError: {
          isError: true,
          msg: action.error
        }
      };
    }
    case boogieConstant.updateBoogieAssetsData: {
      return {
        ...state,
        boogieAssetData: { ...action.data }
      };
    }
    case boogieConstant.getSensorNodeTrendingDataRequest: {
      return {
        ...state,
        showTrendingDataLoadingIndicator: action.data
      };
    }
    case boogieConstant.getSensorNodeTrendingDataSuccess: {
      return {
        ...state,
        showTrendingDataLoadingIndicator: false
      };
    }
    case boogieConstant.getSensorNodeTrendingDataFail: {
      return {
        ...state,
        showTrendingDataLoadingIndicator: false
      };
    }
    case boogieConstant.lastTrendingUpdateTime: {
      return {
        ...state,
        lastTrendingUpdated: action.data
      };
    }
    case boogieConstant.getSpeedTrendingDataRequest: {
      return {
        ...state,
        showSpeedSensorLoadingIndicator: true
      };
    }
    case boogieConstant.getSpeedTrendingDataSuccess: {
      return {
        ...state,
        showSpeedSensorLoadingIndicator: false
      };
    }
    case boogieConstant.getSpeedTrendingDataFail: {
      return {
        ...state,
        showSpeedSensorLoadingIndicator: false
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

export default coachReducer;
