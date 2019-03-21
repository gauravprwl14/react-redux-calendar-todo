import httpStatus from "http-status";
import _ from "lodash";
import ApiService from "./apiService";
import appStore from "../store/index";
import reconnectionActions from "../store/actions/reconnection.action";
import dashboardActions from "../store/actions/dashboard.action";

class ApiQueue {
  constructor() {
    this.pendingQueue = [];
    this.processingQueue = [];
    this.refForSetInternal = null;
    this.pauseQueue = false;
    this.initializeQueue();
    this.startQueueProcessing();
  }

  initializeQueue() {
    this.pendingQueue = [];
    this.processingQueue = [];
    this.refForSetInternal = null;
    this.pauseQueue = false;
  }

  startQueueProcessing() {
    this.initializeQueue();
    this.refForSetInternal = setInterval(() => {
      this.processQueue();
    }, 500);
  }

  stopQueueProcessing() {
    if (this.refForSetInternal) {
      clearInterval(this.refForSetInternal);
      this.startQueueProcessing();
    }
  }

  push(apiObj, apiCb, priority = 0) {
    const queueObj = {
      apiObj,
      cb: apiCb,
      priority
    };

    this.pendingQueue.push(queueObj);
    // sort the queue based on the priority, by default all queue object is given 0 priority
    this.pendingQueue = _.sortBy(
      this.pendingQueue,
      queueObj => queueObj.priority
    );

    // this.callApi(queueObj);
  }
  pop() {
    // let queueObj = null;
    if (this.pendingQueue && this.pendingQueue.length) {
      // queueObj = this.pendingQueue.pop();
      this.pendingQueue.pop();
    }
  }

  processQueue() {
    let queueObj = null;
    console.log(
      "%c this.pendingQueue ",
      "background: aqua; color: black",
      this.pendingQueue
    );
    console.log(
      "%c this.processingQueue ",
      "background: lime; color: black",
      this.processingQueue
    );
    // check if processing queue if empty
    // if empty, pop queueObj from the pendingQueue
    // and push the queueObj to processing Queue
    // if processing queue is not empty than don't perform any operation
    if (
      this.pauseQueue ||
      (this.processingQueue && this.processingQueue.length)
    ) {
      return;
    }
    if (this.pendingQueue && this.pendingQueue.length) {
      queueObj = this.pendingQueue.pop();
      this.processingQueue.push(queueObj);
    }
    // if queueObj present than call the corresponding api
    if (queueObj) {
      this.callApi(queueObj);
    }
  }
  resume() {
    this.pauseQueue = false;
    if (this.processingQueue && this.processingQueue.length) {
      this.callApi(this.processingQueue[0]);
    }
    const appState = appStore.getState();
    const isFirstTimeDataFetchingFinished = _.get(
      appState.dashboardReducer,
      "isFirstTimeDataFetchingComplete",
      false
    );
    if (!isFirstTimeDataFetchingFinished) {
      appStore.dispatch(
        dashboardActions.openFetchingDataLoadingIndicator(true)
      );
    }
  }

  async callApi(queueObj) {
    try {
      const response = await ApiService.callApi(queueObj.apiObj);
      //   once api call is finished, empty the processing queue
      this.processingQueue.pop();

      queueObj.cb(response, null);
    } catch (error) {
      // when UNAUTHORIZED error occur, than pause the queue
      // and wait till the queue is resume.
      // ideally queue should be resume only when the user is re-validated
      if (error === httpStatus[httpStatus.UNAUTHORIZED]) {
        this.pauseQueue = true;
        // perform some async task to re-validate the user;
        appStore.dispatch(dashboardActions.closeFetchingDataLoadingIndicator());
        appStore.dispatch(
          reconnectionActions.openCloseReAuthenticateModal(true)
        );
      } else {
        //   once api call is finished, empty the processing queue
        this.processingQueue.pop();
        queueObj.cb(null, error);
      }
    }
  }
}

export default new ApiQueue();
