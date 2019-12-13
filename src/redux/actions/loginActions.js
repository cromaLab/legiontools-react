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
            let formData = new FormData();
            formData.append("accessKey", tokens.accessKey);
            formData.append("secretKey", tokens.secretKey);

            return fetch(`${process.env.PUBLIC_URL}/old/Retainer/php/getSessionsList.php`, {
                method: "POST",
                headers: {
                            "Accept": ["application/json", "text/javascript"]
                         },
                body: formData
            }).then((res) => {
                if (!res.ok) throw Error(res.statusText);
                
                return res.json();
            }).then((data) => {
                // TODO: is null check necessary -- if accessKey and secretKey represent new user, getSessionsList will return [] 
                let names = data ? data.map(task => task.task) : data;
                dispatch(ExperimentPaneActions.initExperimentNames(names));
            })
        }
    }
}
