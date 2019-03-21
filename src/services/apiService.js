
import httpStatus from "http-status";
import fetch from "../core/fetch";
import ApiConfigObj from "./apiConfig";


async function callApi(apiObject, resolver = null) {
  const fetchObject = {};
  fetchObject.method = "GET";

  fetchObject.headers = {};
  fetchObject.body = null;
  
  // const url = `${ApiConfigObj.serverUrl}/${
  //   apiObject.endPoint
  // }`;
  const url = `http://${ApiConfigObj.serverUrl}:${ApiConfigObj.port}/${
    apiObject.endPoint
  }`;

  const fetchResult = await fetch(url, fetchObject);
  return new Promise(async (resolve, reject) => {
    // server send UNAUTHORIZED response than logout the user from the system and ask him to login again

    if (fetchResult.status === httpStatus.UNAUTHORIZED) {
      // if UNAUTHORIZED response is coming in Login Page Than Avoid Page Redirection
      // localStorage.clear();
      return reject(httpStatus[fetchResult.status]);
    }
    if (
      fetchResult.status >= httpStatus.OK &&
      fetchResult.status <= httpStatus.MULTIPLE_CHOICES
    ) {
      return resolve(fetchResult.json());
    }
    if (fetchResult.status === httpStatus.BAD_REQUEST) {
      const response = await fetchResult.json();
      return reject(response);
    }
    // const errorResponse = new Error(fetchResult.statusText);
    return reject(fetchResult.statusText);
  });
}

export default { callApi };
