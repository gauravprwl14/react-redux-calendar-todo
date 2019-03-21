import coachConstants from "../constants/coach.constant";
import rootConstants from "../constants/root.constant";
/**
 * Contains the State Related to the Train Coach
 *
 */
const initialState = {
  coachAssetsArr: [],
  coachAssetError: {
    isError: false,
    msg: false
  },
  showCoachAssetsLoadingIndication: false,

  subMachineAssetsArr: {
    dt: [],
    mp: []
  },
  subMachineAssetError: {
    isError: false,
    msg: false
  },
  showSubMachineAssetsLoadingIndicator: false,

  boogieSensorInformation: {
    dt: [],
    mp: []
  }
};

const coachReducer = (state = initialState, action) => {
  switch (action.type) {
    case coachConstants.getCoachAssetRequest: {
      return {
        ...state,
        showCoachAssetsLoadingIndication: action.data
      };
    }
    case coachConstants.getCoachAssetSuccess: {
      return {
        ...state,
        coachAssetsArr: action.data,
        showCoachAssetsLoadingIndication: false
      };
    }
    case coachConstants.getCoachAssetFail: {
      return {
        ...state,
        showCoachAssetsLoadingIndication: false,
        coachAssetError: {
          isError: true,
          msg: action.error
        }
      };
    }
    case coachConstants.getCoachSubMachineAssetRequest: {
      return {
        ...state,
        showSubMachineAssetsLoadingIndicator: action.data
      };
    }
    case coachConstants.getCoachSubMachineAssetSuccess: {
      return {
        ...state,
        subMachineAssetsArr: action.data,
        showSubMachineAssetsLoadingIndicator: false
      };
    }
    case coachConstants.getCoachSubMachineAssetFail: {
      return {
        ...state,
        showSubMachineAssetsLoadingIndicator: false,
        subMachineAssetError: {
          isError: true,
          msg: action.error
        }
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
