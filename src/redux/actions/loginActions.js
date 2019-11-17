import { loginTypes } from './actionTypes.js';
import { ExperimentPaneActions } from './experimentPaneActions.js';

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
            // taken from https://cromalab.net/InProgress/LegionToolsUpdatedBeta/getSessionsList.php when accessKey: 1 and secretKey: 1
            // TODO: why does getSessionsList return it in this format
            return Promise.resolve([{"task":"Testing","0":"Testing"},{"task":"Testing2","0":"Testing2"},{"task":"H","0":"H"},{"task":"Test2","0":"Test2"}]).then((data) => {
                // TODO: is null check necessary -- if accessKey and secretKey represent new user, getSessionsList will return [] 
                let names = data ? data.map(task => task.task) : data;
                dispatch(ExperimentPaneActions.initExperimentNames(names));
            })
        }
    }
}
