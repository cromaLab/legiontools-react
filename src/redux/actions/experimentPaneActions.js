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
    loadExperiment: (experimentName, tokens) => {
        return (dispatch) => {
            // requests require data to be in the FormData format
            let formData = new FormData();
            formData.append("task", experimentName);
            formData.append("accessKey", tokens.accessKey);
            formData.append("secretKey", tokens.secretKey);

            // dispatch(experimentPaneActions.loadExperiment) will return Promise
            return fetch(`${process.env.PUBLIC_URL}/old/Retainer/php/loadTask.php`, {
                method: "POST",
                headers: {
                            "Accept": ["application/json", "text/javascript"]
                         },
                body: formData
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
            // TODO: catch errors and dispatch LOAD_EXPERIMENT_ERROR action?
        }
    },
    updateExperiment: (experiment, tokens) => {
        return (dispatch) => {
            let formData = new FormData();
            formData.append("accessKey", tokens.accessKey);
            formData.append("secretKey", tokens.secretKey);
            formData.append("task", experiment.experimentName);
            formData.append("taskTitle", experiment.hitTitle);
            formData.append("taskDescription", experiment.hitDescription);
            formData.append("taskKeywords", experiment.hitKeywords);
            formData.append("country", experiment.workerCountry);
            formData.append("percentApproved", experiment.minApproved); 

            return fetch(`${process.env.PUBLIC_URL}/old/Retainer/php/updateTask.php`, {
                method: "POST",
                headers: {
                            "Accept": "text/plain"
                         },
                body: formData
            }).then((res) => {
                if (!res.ok) throw Error(res.statusText);
            }).then(() => {
                dispatch(ExperimentPaneActions.setCurrExperiment({
                    experimentName: experiment.experimentName,
                    hitTitle: experiment.hitTitle,
                    hitDescription: experiment.hitDescription,
                    hitKeywords: experiment.hitKeywords,
                    workerCountry: experiment.workerCountry,
                    minApproved: experiment.minApproved
                }));
            })
        }
    },
    addExperiment: (experiment, tokens) => {
        return (dispatch) => {
            let formData = new FormData();
            formData.append("accessKey", tokens.accessKey);
            formData.append("secretKey", tokens.secretKey);
            formData.append("task", experiment.experimentName);
            formData.append("taskTitle", experiment.hitTitle);
            formData.append("taskDescription", experiment.hitDescription);
            formData.append("taskKeywords", experiment.hitKeywords);
            formData.append("country", experiment.workerCountry);
            formData.append("percentApproved", experiment.minApproved);

            return fetch(`${process.env.PUBLIC_URL}/old/Retainer/php/addNewTask.php`, {
                method: "POST",
                headers: {
                            "Accept": "text/plain"
                         },
                body: formData
            }).then((res) => {
                if (!res.ok) throw Error(res.statusText);
            }).then(() => {
                // TODO: should be okay, double check
                dispatch(ExperimentPaneActions.addExperimentName(experiment.experimentName));

                dispatch(ExperimentPaneActions.setCurrExperiment({
                    experimentName: experiment.experimentName,
                    hitTitle: experiment.hitTitle,
                    hitDescription: experiment.hitDescription,
                    hitKeywords: experiment.hitKeywords,
                    workerCountry: experiment.workerCountry,
                    minApproved: experiment.minApproved
                }));
            })
        }
    },
    copyExperiment: (originalExperiment, copyName, tokens) => {
        return (dispatch) => {
            let formData = new FormData();
            formData.append("accessKey", tokens.accessKey);
            formData.append("secretKey", tokens.secretKey);
            formData.append("task", originalExperiment.experimentName);
            formData.append("newTask", copyName);

            return fetch(`${process.env.PUBLIC_URL}/old/Retainer/php/copyExperiment.php`, {
                method: "POST",
                headers: {
                            "Accept": "text/plain"
                         },
                body: formData
            }).then((res) => {
                if (!res.ok) throw Error(res.statusText);
            }).then(() => {
                // TODO: should be okay, double check
                dispatch(ExperimentPaneActions.addExperimentName(copyName));

                // TODO: check if possible to minimize copying
                dispatch(ExperimentPaneActions.setCurrExperiment({
                    experimentName: copyName,
                    hitTitle: originalExperiment.hitTitle,
                    hitDescription: originalExperiment.hitDescription,
                    hitKeywords: originalExperiment.hitKeywords,
                    workerCountry: originalExperiment.workerCountry,
                    minApproved: originalExperiment.minApproved
                }));
            })
        }
    },
    deleteExperiment: (experimentName, tokens) => {
        return (dispatch) => {
            // same data is required for stopRecruiting and deleteExperiment
            let formData = new FormData();
            formData.append("accessKey", tokens.accessKey);
            formData.append("secretKey", tokens.secretKey);
            formData.append("task", experimentName);

            return fetch(`${process.env.PUBLIC_URL}/old/Retainer/php/stopRecruiting.php`, {
                method: "POST",
                headers: {
                            "Accept": "text/plain"
                         },
                body: formData
            }).then((res) => {
                if (!res.ok) throw Error(res.statusText);
            }).then(() => {
                // TODO: handle stopRecruiting, likely with another Redux action
                // TODO: stopRecruiting and deleteExperiment currently seem in tension
                // one updates Retainer table where task id matches and
                // the other deletes everything from Retainer table that matches the task id

                // disables the Stop Recruiting button
                // Start Recruiting button's text is changed to "Please Wait While Recruiting is Stopped"
                // re-enable the Sandbox/Live mode toggle (that would've previously be disabled by a startRecruiting request)

                // also checks at intervals if the task has actually stoppedRecruiting via POST queries to loadTask.php
                // if task.done === "1", reset the Start Recruiting/Stop Recruiting button's text, enable Start Recruiting button, disable Stop Recruiting button
            }).then(() => {
                // deleteExperiment
                return fetch(`${process.env.PUBLIC_URL}/old/Retainer/php/deleteExperiment.php`, {
                    method: "POST",
                    headers: {
                                "Accept": "text/plain"
                             },
                    body: formData
                })
            }).then((res) => {
                if (!res.ok) throw Error(res.statusText);
            }).then(() => {
                // handle deleteExperiment

                // update list of experiments
                dispatch(ExperimentPaneActions.removeExperimentName(experimentName));

                // reset the currExperiment
                dispatch(ExperimentPaneActions.setCurrExperiment(null));

                // disable the Live pane
                dispatch(ExperimentPaneActions.enableLivePane(false));

                // TODO: reset Live pane values as well
            })
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
