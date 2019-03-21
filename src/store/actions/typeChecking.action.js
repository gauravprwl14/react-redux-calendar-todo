import TypeCheckingApiService from '../../services/textService'
import TypeCheckingConstants from '../constants/typeChecking.constants'

function initialTypingCheckingRequest() {
    return {
      type: TypeCheckingConstants.getServerTextRequest,
      payload: {}
    };
}
function initialTypingCheckingSuccess(successResponse) {
    return {
      type: TypeCheckingConstants.getServerTextSuccess,
      payload: {
          response: successResponse
      }
    };
}
function initialTypingCheckingFailure(errorObj) {
    return {
      type: TypeCheckingConstants.getServerTextFail,
      payload: {
          error: errorObj
      }
    };
}

function fetchServerText() {
    return async (dispatch) => {
        try {
            dispatch(initialTypingCheckingRequest())
            const response = await TypeCheckingApiService.getServerText()
            dispatch(initialTypingCheckingSuccess(response))

        } catch (err) {
            dispatch(initialTypingCheckingFailure(err))
        }
        
    }
}


export default {
    fetchServerText
}