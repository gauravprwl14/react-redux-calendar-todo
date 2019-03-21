import appConstants from "../utils/appConstants";

class TrainCoach {
  constructor(coachObj = {}) {
    this.id = coachObj.id ? coachObj.id : "";
    this.name = coachObj.name ? coachObj.name : "";
    this.description = coachObj.description ? coachObj.description : "";
    this.path = coachObj.path ? coachObj.path : "";
    this.statusArr = coachObj.statusArr ? coachObj.statusArr : "";
    this.statusChangedTime = coachObj.statusChangedTime
      ? coachObj.statusChangedTime
      : "";
    this.acknowledged = coachObj.acknowledged ? coachObj.acknowledged : "";
    this.boogieOneAssets = coachObj.boogieOneAssets
      ? coachObj.boogieOneAssets
      : [];
    this.boogieTwoAssets = coachObj.boogieTwoAssets
      ? coachObj.boogieTwoAssets
      : [];
  }

  static fromJS(coachObjFromApi) {
    const coachObj = new TrainCoach();
    coachObj.id = coachObjFromApi.ID ? coachObjFromApi.ID : "";
    coachObj.name = coachObjFromApi.Name ? coachObjFromApi.Name : "";
    coachObj.description = coachObjFromApi.Description
      ? coachObjFromApi.Description
      : "";
    coachObj.path = coachObjFromApi.Path ? coachObjFromApi.Path : "";
    coachObj.statusArr = coachObjFromApi.Status ? coachObjFromApi.Status : "";
    coachObj.statusChangedTime = coachObjFromApi.StatusChanged
      ? coachObjFromApi.StatusChanged
      : "";
    coachObj.acknowledged = coachObjFromApi.Acknowledged
      ? coachObjFromApi.Acknowledged
      : "";
    coachObj.boogieOneAssets = [];
    coachObj.boogieTwoAssets = [];
    return coachObj;
  }

  updateBoogieAssets(subAssetsArr = [], boogieType) {
    if (boogieType === appConstants.boogieType.boogieOne.code) {
      this.boogieOneAssets = [...subAssetsArr];
    } else if (boogieType === appConstants.boogieType.boogieTwo.code) {
      this.boogieTwoAssets = [...subAssetsArr];
    }
  }
}

export default TrainCoach;
