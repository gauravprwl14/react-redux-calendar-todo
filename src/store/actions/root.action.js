import rootConstants from "./../constants/root.constant";

export const logOutAction = stateValue => ({
  type: rootConstants.logOut,
  payload: stateValue
});
