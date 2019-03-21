import TypeCheckingConstants from '../constants/typeChecking.constants'
const initialState = {
    masterData: {},
    isLoading: false,
    serverError: '',
}


const typeCheckingReducer = (state = initialState, action) => {

    switch(action.type) {
        case TypeCheckingConstants.getServerTextRequest: {
            return {
                ...state,
                isLoading: true
            }
        }
        case TypeCheckingConstants.getServerTextSuccess: {
            return {
                ...state,
                isLoading: false,
                masterData: action.payload.response,
                serverError: ''
            }
        }
        case TypeCheckingConstants.getServerTextFail: {
            return {
                ...state,
                isLoading: false,
                masterData: {},
                serverError: action.payload.error
            }
        }
        default: return state
    }

}

export default typeCheckingReducer