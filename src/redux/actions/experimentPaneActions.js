import {experimentPaneTypes} from './actionTypes.js';

export const ExperimentPaneActions = {
    enableLivePane: enabled => {
        return ({
            type: experimentPaneTypes.ENABLE_LIVE_PANE,
            enabled
        })
    },
    enableLivePaneFailure: error => {
        return ({
            type: experimentPaneTypes.ENABLE_LIVE_PANE_FAILURE,
            error
        })
    },
    setHitMode: mode => {
        return({
            type: experimentPaneTypes.SET_HIT_MODE,
            mode
        })
    },
    setHitModeFailure: error => {
        return ({
            type: experimentPaneTypes.SET_HIT_MODE_FAILURE,
            error
        })
    },
    setSandboxMode: enabled => {
        return({
            type: experimentPaneTypes.SET_SANDBOX_MODE,
            enabled
        })
    },
    setSandboxModeFailure: error => {
        return ({
            type: experimentPaneTypes.SET_SANDBOX_MODE_FAILURE,
            error
        })
    },
    setRetainerMode: enabled => {
        return({
            type: experimentPaneTypes.SET_RETAINER_MODE,
            enabled
        })
    },
    setRetainerModeFailure: error => {
        return ({
            type: experimentPaneTypes.SET_RETAINER_MODE_FAILURE,
            error
        })
    },
    loadExperiment: (experimentName, accessKey, secretKey) => {
        return (dispatch) => {
            // requests require data to be in the FormData format
            let existingExperiment = new FormData();
            existingExperiment.append("task", experimentName);
            existingExperiment.append("accessKey", accessKey);
            existingExperiment.append("secretKey", secretKey);

            // dispatch(experimentPaneActions.loadExperiment) will return Promise
            return fetch(`${process.env.PUBLIC_URL}/old/Retainer/php/loadTask.php`, 
                {
                    method: "POST",
                    headers: {
                        "Accept": ["application/json", "text/javascript"]
                    },
                    body: existingExperiment
                }).then((res) => {
                    if (!res.ok) throw Error(res.statusText);
                    return res.json();
                }).then((data) => {
                    // TODO: currExperiment should store more than just form-related information
                    console.log(data);
                    dispatch(ExperimentPaneActions.setCurrExperiment({
                        experimentName,
                        hitTitle: data.task_title,
                        hitDescription: data.task_description,
                        hitKeywords: data.task_keywords,
                        workerCountry: data.country,
                        minApproved: data.percentApproved
                    }));
                })
                // TODO: catch errors?
        }
    },
    setCurrExperiment: experiment => {
        return ({
            type: experimentPaneTypes.SET_CURR_EXPERIMENT,
            experiment
        })
    },
    setCurrExperimentFailure: error => {
        return ({
            type: experimentPaneTypes.SET_CURR_EXPERIMENT_FAILURE,
            error
        })
    },
    initExperimentNames: names => {
        return ({
            type: experimentPaneTypes.INIT_EXPERIMENT_NAMES,
            names
        })
    },
    initExperimentNamesFailure: error => {
        return ({
            type: experimentPaneTypes.INIT_EXPERIMENT_NAMES_FAILURE,
            error
        })
    },
    addExperimentName: name => {
        return ({
            type: experimentPaneTypes.ADD_EXPERIMENT_NAME,
            name
        })
    },
    addExperimentNameFailure: error => {
        return ({
            type: experimentPaneTypes.ADD_EXPERIMENT_NAME_FAILURE,
            error
        })
    },
    removeExperimentName: name => {
        return ({
            type: experimentPaneTypes.REMOVE_EXPERIMENT_NAME,
            name
        })
    },
    removeExperimentNameFailure: error => {
        return ({
            type: experimentPaneTypes.REMOVE_EXPERIMENT_NAME_FAILURE,
            error
        })
    }
}
