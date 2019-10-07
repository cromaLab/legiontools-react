import { combineReducers } from 'redux';
import { livePaneTypes } from '../actions/actionTypes.js';

function enableLivePane(state = {}, action) {
    switch (action.type) {
        case livePaneTypes.ENABLE_LIVE_PANE: 
            return {
                ...state,
                error: null,
                enabled: action.enabled
            }
        case livePaneTypes.ENABLE_LIVE_PANE_FAILURE:
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
        case livePaneTypes.SET_HIT_MODE:
            return {
                ...state,
                error: null,
                mode: action.mode
            }
        case livePaneTypes.SET_HIT_MODE_FAILURE:
            return {
                ...state,
                error: action.error,
                mode: "Retainer"
            }
        default:
            return state
    }
}

const livePaneReducers = combineReducers({
    enableLivePane,
    setHitMode
})

export default livePaneReducers;