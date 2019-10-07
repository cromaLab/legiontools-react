import {livePaneTypes} from './actionTypes.js';

export const LivePaneActions = {
    enableLivePane: enabled => {
        return ({
            type: livePaneTypes.ENABLE_LIVE_PANE,
            enabled
        })
    },
    enableLivePaneFailure: error => {
        return ({
            type: livePaneTypes.ENABLE_LIVE_PANE_FAILURE,
            error
        })
    },
    setHitMode: mode => {
        return({
            type: livePaneTypes.SET_HIT_MODE,
            mode
        })
    },
    setHitModeFailure: error => {
        return ({
            type: livePaneTypes.SET_HIT_MODE_FAILURE,
            error
        })
    }
}