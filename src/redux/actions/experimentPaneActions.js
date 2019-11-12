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
    }
}
