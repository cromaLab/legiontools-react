import { combineReducers } from 'redux';
import { loginTypes } from '../actions/actionTypes.js';

function setLoginTokens(state = {}, action) {
    switch (action.type) {
        case loginTypes.SET_LOGIN_TOKENS: 
            return {
                ...state,
                error: null,
                tokens: action.tokens
            }
        case loginTypes.SET_LOGIN_TOKENS_FAILURE:
            return {
                ...state,
                tokens: null,
                error: action.error
            }
        default:
            return state
    }
}

const loginReducers = combineReducers({
    setLoginTokens
})

export default loginReducers;