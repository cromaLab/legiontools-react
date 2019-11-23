import { combineReducers } from 'redux';
import { experimentPaneTypes } from '../actions/actionTypes.js';

function enableLivePane(state = {}, action) {
    switch (action.type) {
        case experimentPaneTypes.ENABLE_LIVE_PANE: 
            return {
                ...state,
                error: null,
                enabled: action.enabled
            }
        case experimentPaneTypes.ENABLE_LIVE_PANE_FAILURE:
            return {
                ...state,
                enabled: false,
                error: action.error
            }
        default:
            return state
    }
}

function setHitMode(state = {}, action) {
    switch(action.type) {
        case experimentPaneTypes.SET_HIT_MODE:
            return {
                ...state,
                error: null,
                mode: action.mode
            }
        case experimentPaneTypes.SET_HIT_MODE_FAILURE:
            return {
                ...state,
                error: action.error,
                mode: "Retainer"
            }
        default:
            return state
    }
}

function setSandboxMode(state = {}, action) {
    switch(action.type) {
        case experimentPaneTypes.SET_SANDBOX_MODE:
            return {
                ...state,
                error: null,
                enabled: action.enabled
            }
        case experimentPaneTypes.SET_SANDBOX_MODE_FAILURE:
            return {
                ...state,
                error: action.error,
                enabled: true
            }
        default:
            return state
    }
}

function setRetainerMode(state = {}, action) {
    switch(action.type) {
        case experimentPaneTypes.SET_RETAINER_MODE:
            return {
                ...state,
                error: null,
                enabled: action.enabled
            }
        case experimentPaneTypes.SET_RETAINER_MODE_FAILURE:
            return {
                ...state,
                error: action.error,
                enabled: true
            }
        default:
            return state
    }
}

function setCurrExperiment(state = {}, action) {
    switch(action.type) {
        case experimentPaneTypes.SET_CURR_EXPERIMENT:
            return {
                ...state,
                error: null,
                experiment: action.experiment
            }
        case experimentPaneTypes.SET_CURR_EXPERIMENT_FAILURE:
            return {
                ...state,
                error: action.error,
                experiment: null
            }
        default:
            return state
    }
}

function setExperimentNames(state = {}, action) {
    switch (action.type) {
        case experimentPaneTypes.INIT_EXPERIMENT_NAMES:
            return {
                ...state,
                error: null,
                names: action.names ? action.names : []
            }
        case experimentPaneTypes.ADD_EXPERIMENT_NAME:
            return {
                ...state,
                error: action.error,
                names: [...state.names, action.name]
            }
        case experimentPaneTypes.REMOVE_EXPERIMENT_NAME:
            return {
                ...state,
                error: null,
                // filters out action.name
                names: state.names.filter((name) => {
                    return name !== action.name;
                })
            }
        // TODO: is this kosher?
        case experimentPaneTypes.ADD_EXPERIMENT_NAME_FAILURE:
        case experimentPaneTypes.REMOVE_EXPERIMENT_NAME_FAILURE:
            // failed to add or remove, leave state.names as is
            return {
                ...state,
                error: action.error
            }
        case experimentPaneTypes.INIT_EXPERIMENT_NAMES_FAILURE:
            // failed to initialize, set state.names as empty
            return {
                ...state,
                error: action.error,
                names: []
            }
        default:
            return state
    }

}

const experimentPaneReducers = combineReducers({
    enableLivePane,
    setHitMode,
    setSandboxMode,
    setRetainerMode,
    setCurrExperiment,
    setExperimentNames
})

export default experimentPaneReducers;