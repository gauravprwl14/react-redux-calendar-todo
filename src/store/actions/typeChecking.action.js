import typeCheckingApiService from '../../services/textService'
import typeCheckingConstants from '../constants/typeChecking.constants'
import typeCheckingModel from '../../model/typeChecking'

function initialTypingCheckingRequest() {
    return {
      type: typeCheckingConstants.getServerTextRequest,
      payload: {}
    };
}
function initialTypingCheckingSuccess(successResponse) {
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

function fetchServerText() {
    return async (dispatch) => {
        try {
            dispatch(initialTypingCheckingRequest())
            const response = await typeCheckingApiService.getServerText()
            const modifiedResponse = typeCheckingModel.transformServerResponse(response)
            dispatch(initialTypingCheckingSuccess(modifiedResponse))
        } catch (err) {
            dispatch(initialTypingCheckingFailure(err))
        }
        
    }
}


export default {
    fetchServerText
}