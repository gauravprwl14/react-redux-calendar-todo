import _ from "lodash";
import { toastr as toastrActions } from "react-redux-toastr";
import moment from "moment";

import trainSensorModel from "../../model/trainSensorModel";
import boogieAssetModel from "../../model/boogieAssetModel";
import observerService from "../../services/observerService";
import boogieConstant from "../constants/boogie.constant";
import dashboardActions from "./dashboard.action";

import appConstants from "../../utils/appConstants";
import boogieAssetTypesConstants from "../../utils/boogieAssetsTypeConstants";

// import fakeDataOfSensor from "../../services/newFakeData/sensor/index";
// import responseOfSensorTrendingData from "../../services/newFakeData/trendingData/index";

function getBoogieSensorDataRequest() {
  return {
    type: boogieConstant.getSensorNodeForEachSubMachineRequest,
    data: true
  };
}

function getBoogieSensorDataSuccess(loggedInUserResponse) {
  return {
    type: boogieConstant.getSensorNodeForEachSubMachineSuccess,
    data: loggedInUserResponse
  };
}
function getBoogieSensorDataFail(errorResponse) {
  return {
    type: boogieConstant.getSensorNodeForEachSubMachineFail,
    error: errorResponse
  };
}
function findSensorAliasObject(coachName, sensorObj) {
  // now search for the sensor alias from the pre-define aliases
  const findCorrespondingSensorAlias = _.find(
    Object.keys(appConstants.sensorAlias[coachName.toLowerCase()]),
    sensorAliasName => {
      if (
        appConstants.sensorAlias[coachName.toLowerCase()][sensorAliasName]
          .name === sensorObj.Name
      ) {
        return true;
      }
      return false;
    }
  );
  return findCorrespondingSensorAlias;
}

function fetchBoogieSensorData() {
  return async (dispatch, getState) => {
    try {
      const appState = getState();
      const coachAssetArr = _.get(
        appState.coachReducer,
        "coachAssetsArr",
        null
      );
      const coachSubMachineAssets = _.get(
        appState.coachReducer,
        "subMachineAssetsArr",
        null
      );

      if (coachSubMachineAssets && coachAssetArr) {
        // check if global loading indicator is displayed or not
        // if not displayed than open the global loading indicator
        dispatch(dashboardActions.openFetchingDataLoadingIndicator());
        dispatch(getBoogieSensorDataRequest());
        const boogieSensorApiCallArr = [];

        Object.keys(coachSubMachineAssets).forEach(coachName => {
          return coachSubMachineAssets[coachName].forEach(subMachineObj => {
            boogieSensorApiCallArr.push(
              observerService.getMachineSensorPointList(subMachineObj.id)
            );
          });
        });
        const response = await Promise.all(boogieSensorApiCallArr);
        // const response = fakeDataOfSensor;

        let mappedSensorArrOfObject = {};
        if (response && response.length) {
          let counterIndexForTrendingData = 0;
          let counterIndexForSensorObject = 0;
          Object.keys(coachSubMachineAssets).forEach(coachName => {
            coachSubMachineAssets[coachName.toLowerCase()].forEach(
              (subMachineObj, subMachineIndex) => {
                const subMachineSensorArrOfObjects =
                  response[counterIndexForSensorObject];
                counterIndexForSensorObject = counterIndexForSensorObject + 1;
                subMachineSensorArrOfObjects.forEach(
                  (sensorObj, sensorObjIndex) => {
                    const mappedSensorObj = trainSensorModel.fromJS(sensorObj);
                    // if mappedSensorArrOfObject does not contain the coachName property
                    // than create the coachName(dt, mp) keys and corresponding object
                    if (!mappedSensorArrOfObject[coachName.toLowerCase()]) {
                      mappedSensorArrOfObject[coachName.toLowerCase()] = {};
                    }
                    const findCorrespondingSensorAlias = findSensorAliasObject(
                      coachName.toLowerCase(),
                      sensorObj
                    );

                    // if  sensor alias is found than, add that custom sensor alias to the mappedSensor Obj
                    if (findCorrespondingSensorAlias) {
                      mappedSensorObj.addCustomCode(
                        appConstants.sensorAlias[coachName.toLowerCase()][
                          findCorrespondingSensorAlias
                        ]
                      );
                      mappedSensorArrOfObject[coachName.toLowerCase()][
                        findCorrespondingSensorAlias
                      ] = mappedSensorObj;
                    }
                    counterIndexForTrendingData =
                      counterIndexForTrendingData + 1;
                  }
                );
              }
            );
          });
        }
        dispatch(getBoogieSensorDataSuccess(mappedSensorArrOfObject));
        dispatch(getBoogieAssetsDataForEachCoach());
        dispatch(dashboardActions.closeFetchingDataLoadingIndicator());
        dispatch(dashboardActions.updateFirstTimeDataFetchingStatus(true));
        dispatch(newGetBogieAssetsTrendingData());
      }
    } catch (error) {
      toastrActions.error("Error", JSON.stringify(error));
      console.log(
        "%c some error occurred inside fetchBoogieSensorData",
        "background: salmon; color: black",
        error
      );

      dispatch(getBoogieSensorDataFail(error));
      dispatch(dashboardActions.closeFetchingDataLoadingIndicator());
    }
  };
}

function getBoogieAssetsDataForEachCoach() {
  return (dispatch, getState) => {
    const mappedBoogieAssetsData = {};
    const sensorNodeStatusCount = {
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
    };
    const appState = getState();
    const coachAssetArr = _.get(appState.coachReducer, "coachAssetsArr", null);
    const subMachineArr = _.get(
      appState.coachReducer,
      "subMachineAssetsArr",
      null
    );
    const allSensorData = _.get(appState.boogieReducer, "sensorArray", null);

    if (coachAssetArr && subMachineArr && allSensorData) {
      coachAssetArr.forEach(coachObj => {
        const coachName = coachObj.name.toLowerCase();
        const preDefineBoogieAssetForCorrespondingCoach =
          boogieAssetTypesConstants[coachName];
        const subMachineObjectForCorrespondingCoach = subMachineArr[coachName];
        const allSensorDataForCorrespondingCoach = allSensorData[coachName];
        if (!mappedBoogieAssetsData[coachName]) {
          mappedBoogieAssetsData[coachName] = {
            boogieOne: [],
            boogieTwo: []
          };
        }

        if (
          preDefineBoogieAssetForCorrespondingCoach &&
          subMachineObjectForCorrespondingCoach &&
          allSensorDataForCorrespondingCoach
        ) {
          const preDefineBoogieAssetsNameArr = Object.keys(
            preDefineBoogieAssetForCorrespondingCoach
          );
          preDefineBoogieAssetsNameArr.forEach(boogieAssetName => {
            const preDefineBoogieAssetObj =
              preDefineBoogieAssetForCorrespondingCoach[boogieAssetName];
            const sensorObjForCorrespondingBoogieAsset = {};
            preDefineBoogieAssetObj.sensorNameArr.forEach(
              preDefineSensorObjectName => {
                if (
                  allSensorDataForCorrespondingCoach[preDefineSensorObjectName]
                ) {
                  const customAliasObj =
                    allSensorDataForCorrespondingCoach[
                      preDefineSensorObjectName
                    ].customAlias;
                  if (customAliasObj) {
                    sensorObjForCorrespondingBoogieAsset[customAliasObj.code] =
                      allSensorDataForCorrespondingCoach[
                        preDefineSensorObjectName
                      ];
                  }
                }
              }
            );

            const boogieAssetObj = boogieAssetModel.fromJS(
              preDefineBoogieAssetObj,
              coachObj,
              sensorObjForCorrespondingBoogieAsset
            );

            // mapped Dashboard Statistic
            if (boogieAssetObj && boogieAssetObj.sensorObj) {
              Object.keys(boogieAssetObj.sensorObj).forEach(sensorType => {
                if (
                  boogieAssetObj.sensorObj[sensorType] &&
                  sensorType !== "acc"
                ) {
                  computeSensorNodeStatusCount(
                    boogieAssetObj.sensorObj[sensorType],
                    sensorNodeStatusCount,
                    coachName.toLowerCase()
                  );
                }
              });
              computeSensorNodeOverAllStatusCount(
                boogieAssetObj,
                sensorNodeStatusCount
              );
            }

            if (
              boogieAssetObj.boogieType ===
              appConstants.wheelCategory.boogie1.code
            ) {
              mappedBoogieAssetsData[coachName].boogieOne.push(boogieAssetObj);
            } else if (
              boogieAssetObj.boogieType ===
              appConstants.wheelCategory.boogie2.code
            ) {
              mappedBoogieAssetsData[coachName].boogieTwo.push(boogieAssetObj);
            }
          });
        }
      });
      appConstants.dashboardCoachSequence.forEach(coachName => {
        if (!mappedBoogieAssetsData[coachName]) {
          mappedBoogieAssetsData[coachName] = {
            boogieOne: [],
            boogieTwo: []
          };
        }
      });
      dispatch(updateBoogieAssetsDataForEachCoach(mappedBoogieAssetsData));
      dispatch(
        dashboardActions.updateSensorNodeStatisticForEachCoach(
          sensorNodeStatusCount
        )
      );
    }
  };
}

function updateBoogieAssetsDataForEachCoach(boogieAssetsData) {
  return {
    type: boogieConstant.updateBoogieAssetsData,
    data: boogieAssetsData
  };
}

function getBoogieSensorTrendingDataRequest() {
  return {
    type: boogieConstant.getSensorNodeTrendingDataRequest,
    data: true
  };
}

function getBoogieSensorTrendingDataSuccess(sensorNodeTrendingData) {
  return {
    type: boogieConstant.getSensorNodeTrendingDataSuccess,
    data: sensorNodeTrendingData
  };
}
function getBoogieSensorTrendingDataFail(errorResponse) {
  return {
    type: boogieConstant.getSensorNodeTrendingDataFail,
    error: errorResponse
  };
}

function newGetBogieAssetsTrendingData() {
  return async (dispatch, getState) => {
    const appState = getState();
    let mappedSensorArrOfObject = {};
    let showTrendingDataLoadingIndicator = "";
    let isFirstTimeDataFetchingForTrendingApiComplete = "";
    const sensorsForAllCoaches = _.get(
      appState.boogieReducer,
      "sensorArray",
      null
    );
    if (!sensorsForAllCoaches) {
      return [];
    }

    const coachNameArray = Object.keys(sensorsForAllCoaches);
    if (!coachNameArray.length) {
      return [];
    }
    try {
      dispatch(getBoogieSensorTrendingDataRequest());
      let response = [];
      console.log(
        "%c trending api call start ",
        "background: aqua; color: black",
        moment()
      );
      for (
        let coachIndex = 0;
        coachIndex < coachNameArray.length;
        coachIndex++
      ) {
        const sensorNameArrForTheCorrespondingCoach = sensorsForAllCoaches[
          coachNameArray[coachIndex]
        ]
          ? Object.keys(sensorsForAllCoaches[coachNameArray[coachIndex]])
          : [];
        for (
          let sensorIndex = 0;
          sensorIndex < sensorNameArrForTheCorrespondingCoach.length;
          sensorIndex++
        ) {
          const mappedSensorObj =
            sensorsForAllCoaches[coachNameArray[coachIndex]][
              sensorNameArrForTheCorrespondingCoach[sensorIndex]
            ];
          if (
            appConstants.trendingApiCallsForSensor[
              coachNameArray[coachIndex]
            ] &&
            appConstants.trendingApiCallsForSensor[
              coachNameArray[coachIndex]
            ].includes(sensorNameArrForTheCorrespondingCoach[sensorIndex])
          ) {
            let sensorResponse = await observerService.getSensorPointListTrendingData(
              mappedSensorObj.id
            );
            response.push(sensorResponse);
          } else {
            let sensorResponse = await fakeApiCall();
            response.push(sensorResponse);
          }
        }
      }
      console.log(
        "%c trending api call end ",
        "background: aqua; color: black",
        moment()
      );
      // const response = responseOfSensorTrendingData;

      coachNameArray.forEach(coachName => {
        if (!mappedSensorArrOfObject[coachName.toLowerCase()]) {
          mappedSensorArrOfObject[coachName.toLowerCase()] = {};
        }

        const sensorNameArrForTheCorrespondingCoach = sensorsForAllCoaches[
          coachName
        ]
          ? Object.keys(sensorsForAllCoaches[coachName])
          : [];

        sensorNameArrForTheCorrespondingCoach.forEach(
          (sensorName, sensorNameIndex) => {
            const mappedSensorObj = sensorsForAllCoaches[coachName][sensorName];
            const trendingDataForParticularSensor = _.find(
              response,
              trendingDataArr => {
                if (
                  trendingDataArr &&
                  trendingDataArr.length &&
                  trendingDataArr[0].PointID === mappedSensorObj.id
                ) {
                  return true;
                }
                return false;
              }
            );
            if (trendingDataForParticularSensor) {
              mappedSensorObj.updateSensorData(trendingDataForParticularSensor);
              mappedSensorObj.updateAlarmHistory(
                trendingDataForParticularSensor
              );
              mappedSensorArrOfObject[coachName][sensorName] = mappedSensorObj;
            }
          }
        );
      });
      dispatch(getBoogieSensorDataSuccess(mappedSensorArrOfObject));
      dispatch(getBoogieAssetsDataForEachCoach());
      dispatch(getBoogieSensorTrendingDataSuccess());
      isFirstTimeDataFetchingForTrendingApiComplete = _.get(
        appState.dashboardReducer,
        "isFirstTimeDataFetchingForTrendingApiComplete",
        true
      );
      showTrendingDataLoadingIndicator = _.get(
        appState.boogieReducer,
        "showTrendingDataLoadingIndicator",
        false
      );
      if (
        isFirstTimeDataFetchingForTrendingApiComplete === true &&
        showTrendingDataLoadingIndicator === false
      ) {
        toastrActions.success(
          "Loading trending data complete",
          moment().format("LLLL")
        );
      }
      dispatch(
        dashboardActions.updateFirstTimeDataFetchingForTrendingApiStatus(true)
      );
      dispatch(updateLastTrendingUpdateTime(moment()));
    } catch (error) {
      console.log(
        "%c some error occurred inside newGetBogieAssetsTrendingData",
        "background: salmon; color: black",
        error
      );
      dispatch(getBoogieSensorTrendingDataFail());

      // when api call fails for first time, do not update first time trending status to true
      // only update first time trending status true when all api calls are successful.

      // dispatch(dashboardActions.closeFetchingDataLoadingIndicator());
      // dispatch(
      //   dashboardActions.updateFirstTimeDataFetchingForTrendingApiStatus(true)
      // );

      // when api call for trending data fails, call the function back again to get complete data
      dispatch(newGetBogieAssetsTrendingData());
    }
  };
}
function getSpeedSensorTrendingDataRequest() {
  return {
    type: boogieConstant.getSpeedTrendingDataRequest,
    data: true
  };
}
function getSpeedSensorTrendingDataSuccess() {
  return {
    type: boogieConstant.getSpeedTrendingDataSuccess,
    data: false
  };
}
function getSpeedSensorTrendingDataFail() {
  return {
    type: boogieConstant.getSpeedTrendingDataFail,
    data: false
  };
}
//function to refresh speed data
function getTrendingDataForSpeedSensor(sensorObj, readings) {
  return async (dispatch, getState) => {
    const appState = getState();
    let mappedSensorArrOfObject = {};
    const sensorsForAllCoaches = _.get(
      appState.boogieReducer,
      "sensorArray",
      null
    );
    if (!sensorsForAllCoaches) {
      return [];
    }
    const coachNameArray = Object.keys(sensorsForAllCoaches);
    if (!coachNameArray.length) {
      return [];
    }
    try {
      dispatch(getSpeedSensorTrendingDataRequest());
      const response = await observerService.getSensorPointListTrendingData(
        sensorObj.id,
        undefined,
        undefined,
        readings,
        appConstants.priorityMax
      );
      if (response && response.length) {
        coachNameArray.forEach(coachName => {
          if (!mappedSensorArrOfObject[coachName.toLowerCase()]) {
            mappedSensorArrOfObject[coachName.toLowerCase()] = {};
          }

          const sensorNameArrForTheCorrespondingCoach = sensorsForAllCoaches[
            coachName
          ]
            ? Object.keys(sensorsForAllCoaches[coachName])
            : [];
          sensorNameArrForTheCorrespondingCoach.forEach(sensorName => {
            const mappedSensorObj = sensorsForAllCoaches[coachName][sensorName];
            if (mappedSensorObj.id === response[0].PointID) {
              mappedSensorObj.updateSensorData(response);
              mappedSensorObj.updateAlarmHistory(response);
            }
            mappedSensorArrOfObject[coachName][sensorName] = mappedSensorObj;
          });
        });
        dispatch(getSpeedSensorTrendingDataSuccess());
        dispatch(getBoogieSensorDataSuccess(mappedSensorArrOfObject));
      }
      // this.sensor
    } catch (error) {
      console.log(
        "%c some error occurred inside getTrendingDataForParticularSensor",
        "background: salmon; color: black",
        error
      );

      dispatch(getSpeedSensorTrendingDataFail());
    }
  };
}

function fakeApiCall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([]);
    }, 500);
  });
}

function computeSensorNodeOverAllStatusCount(
  bogieAssetDataObj,
  sensorNodeStatusCountObj
) {
  const overAllKey = "overAll";
  if (!sensorNodeStatusCountObj[overAllKey]) {
    sensorNodeStatusCountObj[overAllKey] = {
      green: 0,
      amber: 0,
      red: 0
    };
  }

  switch (bogieAssetDataObj.statusIndicator) {
    case appConstants.alarmIndicator.danger.code: {
      sensorNodeStatusCountObj[overAllKey].red =
        sensorNodeStatusCountObj[overAllKey].red + 1;
      break;
    }
    case appConstants.alarmIndicator.warning.code: {
      sensorNodeStatusCountObj[overAllKey].amber =
        sensorNodeStatusCountObj[overAllKey].amber + 1;
      break;
    }
    case appConstants.alarmIndicator.green.code: {
      sensorNodeStatusCountObj[overAllKey].green =
        sensorNodeStatusCountObj[overAllKey].green + 1;
      break;
    }
    default: {
      sensorNodeStatusCountObj[overAllKey].green =
        sensorNodeStatusCountObj[overAllKey].green + 1;
    }
  }
}

function computeSensorNodeStatusCount(
  mappedSensorObj,
  sensorNodeStatusCountObj,
  coachName
) {
  if (!sensorNodeStatusCountObj[coachName.toLowerCase()]) {
    sensorNodeStatusCountObj[coachName.toLowerCase()] = {
      green: 0,
      amber: 0,
      red: 0
    };
  }
  switch (mappedSensorObj.statusIndicator) {
    case appConstants.alarmIndicator.danger.code: {
      sensorNodeStatusCountObj[coachName.toLowerCase()].red =
        sensorNodeStatusCountObj[coachName.toLowerCase()].red + 1;
      break;
    }
    case appConstants.alarmIndicator.warning.code: {
      sensorNodeStatusCountObj[coachName.toLowerCase()].amber =
        sensorNodeStatusCountObj[coachName.toLowerCase()].amber + 1;
      break;
    }
    case appConstants.alarmIndicator.green.code: {
      sensorNodeStatusCountObj[coachName.toLowerCase()].green =
        sensorNodeStatusCountObj[coachName.toLowerCase()].green + 1;
      break;
    }
    default: {
      sensorNodeStatusCountObj[coachName.toLowerCase()].green =
        sensorNodeStatusCountObj[coachName.toLowerCase()].green + 1;
    }
  }
}
function updateLastTrendingUpdateTime(timeObj) {
  return {
    type: boogieConstant.lastTrendingUpdateTime,
    data: timeObj
  };
}
export default {
  fetchBoogieSensorData,
  getBoogieAssetsDataForEachCoach,
  newGetBogieAssetsTrendingData,
  getTrendingDataForSpeedSensor
};
