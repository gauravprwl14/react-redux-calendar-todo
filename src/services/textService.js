import ApiService from "./apiService";

async function getServerText(userName, password) {
  try {
    const apiObject = {
      method: "GET",
      endPoint: `api/`
    };
    const response = await ApiService.callApi(apiObject);
    return response
  } catch (error) {
    throw error;
  }
}

export default { getServerText };
