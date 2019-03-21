// import axios from "axios";
import httpStatus from "http-status";
// import _ from "lodash";
import fetch from "../core/fetch";
import ApiConfigObj from "./apiConfig";

function getAuthToken() {
  let authToken = {};

  if (localStorage.getItem("token")) {
    const parsedTokenObj = JSON.parse(localStorage.getItem("token"));
    authToken = {
      ...parsedTokenObj
    };
  } else {
    // authToken = {
    //   Authorization: "a19fded7-1f7e-471a-a21e-72b392de169a",
    //   SessionExpires: "2018-08-03T14:48:37.5807365+05:30"
    // };
    authToken = {
      Authorization: "",
      SessionExpires: ""
    };
  }
  return authToken;
}

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
