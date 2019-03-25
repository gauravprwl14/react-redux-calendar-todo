import TypeCheckingConstants from '../constants/typeChecking.constants'
const initialState = {
    masterData: {},
    isLoading: false,
    serverError: '',
    currentMatchWordIndex: 0,
    currentWordMatchStatus: {
        matchedChar: '',
        unMatchedChar: '',
        remaining: ''
    },
    matchedStr: '',
    remainingStr: ''
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
                serverError: '',
                currentMatchWordIndex: 0,
                lastMatchingTextIndex: -1
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
        case TypeCheckingConstants.updatedCurrentWordMatchStatus: {
            return {
                ...state,
                currentWordMatchStatus: action.payload.value,
            }
        }
        case TypeCheckingConstants.updatedMatchedStr: {
            return {
                ...state,
                matchedStr: action.payload.value,
            }
        }
        case TypeCheckingConstants.updatedRemainingStr: {
            return {
                ...state,
                remainingStr: action.payload.value,
            }
        }
        case TypeCheckingConstants.updatedCurrentWordIndex: {
            return {
                ...state,
                currentMatchWordIndex: action.payload.value,
            }
        }
        case TypeCheckingConstants.initializeState: {
            return {
                ...state,
                matchedStr: action.payload.matchedStr || '',
                remainingStr: action.payload.remainingStr || '',
                currentWordMatchStatus: action.payload.currentWordMatchStatus || initialState.currentWordMatchStatus,
                currentMatchWordIndex: action.payload.currentMatchIndex || 0
            }
        }
        default: return state
    }

}

export default typeCheckingReducer