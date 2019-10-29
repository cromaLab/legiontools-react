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

const experimentPaneReducers = combineReducers({
    enableLivePane,
    setHitMode,
    setSandboxMode,
    setRetainerMode
})

export default experimentPaneReducers;