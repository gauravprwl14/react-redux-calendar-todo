import TypeCheckingConstants from '../constants/typeChecking.constants'
const initialState = {
    serverText: {},
    isLoading: false,
    serverTextError: '',
}


const coachReducer = (state = initialState, action) => {

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
                serverText: action.payload.response,
                serverTextError: ''
            }
        }
        case TypeCheckingConstants.getServerTextFail: {
            return {
                ...state,
                isLoading: false,
                serverText: {},
                serverTextError: action.payload.error
            }
        }
        default: return state
    }

}

export default coachReducer