import _ from "lodash";
import { toastr as toastrActions } from "react-redux-toastr";
import coachModel from "../../model/trainCoachModel";
import subMachineAssetModel from "../../model/trainSubMachineAssetModel";
import observerService from "../../services/observerService";
import coachConstants from "../constants/coach.constant";
// import fakeDataOfCoachList from "../../services/newFakeData/assetList/index";
// import fakeDataOfSubMachineList from "../../services/newFakeData/subMachineList";

import dashboardActions from "./dashboard.action";
import boogieActions from "./boogie.action";

function getCoachAssetRequest() {
  return {
    type: coachConstants.getCoachAssetRequest,
    data: true
  };
}

function getCoachAssetSuccess(loggedInUserResponse) {
  return {
    type: coachConstants.getCoachAssetSuccess,
    data: loggedInUserResponse
  };
}
function getCoachAssetFail(errorResponse) {
  return {
    type: coachConstants.getCoachAssetFail,
    error: errorResponse
  };
}

function fetchCoachAssets() {
  return async (dispatch, getState) => {
    try {
      const appState = getState();
      const showFetchingIndicator = _.get(
        appState.dashboardReducer,
        "showFetchingDataLoadingIndicator",
        false
      );
      // check if global loading indicator is displayed or not
      // if not displayed than open the global loading indicator
      if (!showFetchingIndicator) {
        dispatch(dashboardActions.openFetchingDataLoadingIndicator());
      }
      dispatch(getCoachAssetRequest());
      const response = await observerService.getAssetsList();
      // const response = fakeDataOfCoachList;
      const mappedCoachAssets = [];
      if (response && response.length) {
        response.forEach((coachAssetObj, index) => {
          if (
            !(
              coachAssetObj.Path === "SBST\\DT" ||
              coachAssetObj.Path === "SBST\\MP"
            )
          ) {
            const mappedObj = coachModel.fromJS(coachAssetObj);
            mappedCoachAssets.push(mappedObj);
          }
        });
      }
      dispatch(getCoachAssetSuccess(mappedCoachAssets));
      dispatch(fetchCoachSubMachineAssets());
    } catch (error) {
      toastrActions.error("Error", JSON.stringify(error));
      console.log(
        "%c some error occurred inside fetchCoachAssets",
        "background: salmon; color: black",
        error
      );
      dispatch(getCoachAssetFail(error));
      dispatch(dashboardActions.closeFetchingDataLoadingIndicator());
    }
  };
}

function getCoachSubMachineAssetRequest() {
  return {
    type: coachConstants.getCoachSubMachineAssetRequest,
    data: true
  };
}

function getCoachSubMachineAssetSuccess(loggedInUserResponse) {
  return {
    type: coachConstants.getCoachSubMachineAssetSuccess,
    data: loggedInUserResponse
  };
}
function getCoachSubMachineAssetFail(errorResponse) {
  return {
    type: coachConstants.getCoachSubMachineAssetFail,
    error: errorResponse
  };
}

function fetchCoachSubMachineAssets() {
  return async (dispatch, getState) => {
    try {
      const appState = getState();
      const coachAssetsArr = _.get(appState.coachReducer, "coachAssetsArr", []);

      // check if global loading indicator is displayed or not
      // if not displayed than open the global loading indicator
      dispatch(dashboardActions.openFetchingDataLoadingIndicator());

      dispatch(getCoachSubMachineAssetRequest());
      const response = await Promise.all(
        coachAssetsArr.map(coachObj => {
          return observerService.getSubMachineList(coachObj.id);
        })
      );
      // const response = fakeDataOfSubMachineList;
      let mappedSubMachineArrOfObjects = {};
      if (response && response.length) {
        response.forEach((subMachineArrForCorrespondingCoach, index) => {
          const mappedObj = subMachineArrForCorrespondingCoach.map(
            subMachineObj => {
              return subMachineAssetModel.fromJS(
                subMachineObj,
                coachAssetsArr[index].id
              );
            }
          );

          const coachName = coachAssetsArr[index].name
            ? coachAssetsArr[index].name.toLowerCase()
            : null;
          coachAssetsArr[index].updateBoogieAssets(mappedObj, "boogie1");
          if (coachName) {
            mappedSubMachineArrOfObjects[coachName] = mappedObj;
          }
        });
      }

      dispatch(getCoachSubMachineAssetSuccess(mappedSubMachineArrOfObjects));
      dispatch(boogieActions.fetchBoogieSensorData());
    } catch (error) {
      toastrActions.error("Error", JSON.stringify(error));
      console.log(
        "%c some error occurred inside fetchCoachSubMachineAssets",
        "background: salmon; color: black",
        error
      );

      dispatch(getCoachSubMachineAssetFail(error));
      dispatch(dashboardActions.closeFetchingDataLoadingIndicator());
    }
  };
}

export default { fetchCoachAssets, fetchCoachSubMachineAssets };
