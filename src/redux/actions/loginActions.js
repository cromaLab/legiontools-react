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
    },
    setSessionList: list => {
        return ({
            type: loginTypes.SET_SESSION_LIST,
            list
        })
    },
    postLoginTokens: tokens => {
        return (dispatch) => {
            dispatch(LoginActions.setLoginTokens(tokens));
			console.log(`this is public URL: ${process.env.PUBLIC_URL}`);
            return fetch(process.env.PUBLIC_URL + "/old/Retainer/php/login.php", {
                method: "POST",
                headers: { 
						   "Content-Type": "application/json",
				           "Accept": "text/plain"
				         },
                body: JSON.stringify(tokens)
            }).then((res) => {
                if (!res.ok) throw Error(res.statusText);
				console.log("login good");
				console.log(res);
            }).then(() => {
                dispatch(LoginActions.getSessionList(tokens));
            }).catch((err) => {
                alert("post to php/login.php failed");
            })
        }
    },
    getSessionList: tokens => {
        return (dispatch) => {
            return fetch(process.env.PUBLIC_URL + "/old/Retainer/php/getSessionsList.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tokens)
            }).then((res) => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            }).then((data) => {
                dispatch(LoginActions.setSessionList(data));
            })
        }
    }
}
