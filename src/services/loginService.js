import ApiService from "./apiService";

async function userLogin(userName, password) {
  try {
    const apiObject = {
      method: "GET",
      endPoint: `API/DataService/LogIn/?UserName=${userName}&Password=${password}`
    };
    const tokenResponse = await ApiService.callApi(apiObject);
    return tokenResponse;
  } catch (error) {
    throw error;
  }
}

export default { userLogin };
