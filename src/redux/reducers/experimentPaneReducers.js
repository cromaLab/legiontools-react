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
        case experimentPaneTypes.ADD_EXPERIMENT_NAME:
            return {
                ...state,
                error: action.error,
                names: state.names ? [...state.names, action.name] : [action.name]
            }
        case experimentPaneTypes.REMOVE_EXPERIMENT_NAME:
            // reducer copies over values from state.names except for action.name
            return {
                ...state,
                error: null,
                names: state.names.reduce((accumulator, currValue) => {
                    if (currValue !== action.name) {
                        accumulator.push(currValue);
                    }

                    return accumulator;
                }, [])
            }
        // TODO: is this kosher?
        case experimentPaneTypes.ADD_EXPERIMENT_NAME_FAILURE:
        case experimentPaneTypes.REMOVE_EXPERIMENT_NAME_FAILURE:
            // leave state.names as is
            return {
                ...state,
                error: action.error
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