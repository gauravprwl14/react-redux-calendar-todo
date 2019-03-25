import typeCheckingApiService from '../../services/textService'
import typeCheckingConstants from '../constants/typeChecking.constants'
import typeCheckingModel from '../../model/typeChecking'

function initialTypingCheckingRequest() {
    return {
      type: typeCheckingConstants.getServerTextRequest,
      payload: {}
    };
}
function fetchTextFromServerSuccess(successResponse) {
    return {
      type: typeCheckingConstants.getServerTextSuccess,
      payload: {
          response: successResponse
      }
    };
}
function initialTypingCheckingFailure(errorObj) {
    return {
      type: typeCheckingConstants.getServerTextFail,
      payload: {
          error: errorObj
      }
    };
}
function initializedState(serverResponse) {
    return {
      type: typeCheckingConstants.initializeState,
      payload: {
          currentMatchIndex: 0,
          currentWordMatchStatus: {
              matchedStr: '',
              unMatchedStr: '',
              remainingStr: serverResponse.tokenizedWords[0].text
          },
          matchedStr: '',
          remainingStr: serverResponse.textStr.slice(serverResponse.tokenizedWords[0].endIndex + 1)
      }
    };
}

function fetchServerText() {
    return async (dispatch) => {
        try {
            dispatch(initialTypingCheckingRequest())
            const response = await typeCheckingApiService.getServerText()
            const modifiedResponse = typeCheckingModel.transformServerResponse(response)
            dispatch(fetchTextFromServerSuccess(modifiedResponse))
            dispatch(initializedState(modifiedResponse))
        } catch (err) {
            dispatch(initialTypingCheckingFailure(err))
        }
        
    }
}

function updatedCurrentWordMatchStatus(statusObj) {
    return {
      type: typeCheckingConstants.updatedCurrentWordMatchStatus,
      payload: {
          value: statusObj
      }
    };
}
function updatedMatchedStr(matchedStr) {
    return {
      type: typeCheckingConstants.updatedMatchedStr,
      payload: {
          value: matchedStr
      }
    };
}
function updatedRemainingStr(remainingStr) {
    return {
      type: typeCheckingConstants.updatedRemainingStr,
      payload: {
          value: remainingStr
      }
    };
}
function updatedCurrentWordIndex(newIndex) {
    return {
      type: typeCheckingConstants.updatedCurrentWordIndex,
      payload: {
          value: newIndex
      }
    };
}


export default {
    fetchServerText,
    updatedCurrentWordMatchStatus,
    updatedMatchedStr,
    updatedRemainingStr,
    updatedCurrentWordIndex
}