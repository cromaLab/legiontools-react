import {loginTypes} from './actionTypes.js';

export const LoginActions = {
    setLoginTokens: tokens => {
        return ({
            type: loginTypes.SET_LOGIN_TOKENS,
            tokens
        })
    },
    setLoginTokensFailure: error => {
        return ({
            type: loginTypes.SET_LOGIN_TOKENS_FAILURE,
            error
        })
    }
}