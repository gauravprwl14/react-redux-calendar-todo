class TrainSubMachineAssetModel {
  constructor(subMachineObj = {}) {
    this.coachId = subMachineObj.coachId ? subMachineObj.coachId : "";
    this.id = subMachineObj.id ? subMachineObj.id : "";
    this.name = subMachineObj.name ? subMachineObj.name : "";
    this.description = subMachineObj.description
      ? subMachineObj.description
      : "";
    this.path = subMachineObj.path ? subMachineObj.path : "";
    this.statusArr = subMachineObj.statusArr ? subMachineObj.statusArr : "";
    this.statusChangedTime = subMachineObj.statusChangedTime
      ? subMachineObj.statusChangedTime
      : "";
    this.acknowledged = subMachineObj.acknowledged
      ? subMachineObj.acknowledged
      : "";
  }

  static fromJS(subMachineObjFromApi, coachId) {
    const subMachineObj = new TrainSubMachineAssetModel();
    subMachineObj.coachId = coachId ? coachId : "";
    subMachineObj.id = subMachineObjFromApi.ID ? subMachineObjFromApi.ID : "";
    subMachineObj.name = subMachineObjFromApi.Name
      ? subMachineObjFromApi.Name
      : "";
    subMachineObj.description = subMachineObjFromApi.Description
      ? subMachineObjFromApi.Description
      : "";
    subMachineObj.path = subMachineObjFromApi.Path
      ? subMachineObjFromApi.Path
      : "";
    subMachineObj.statusArr = subMachineObjFromApi.Status
      ? subMachineObjFromApi.Status
      : "";
    subMachineObj.statusChangedTime = subMachineObjFromApi.StatusChanged
      ? subMachineObjFromApi.StatusChanged
      : "";
    subMachineObj.acknowledged = subMachineObjFromApi.Acknowledged
      ? subMachineObjFromApi.Acknowledged
      : "";
    return subMachineObj;
  }
}

export default TrainSubMachineAssetModel;
