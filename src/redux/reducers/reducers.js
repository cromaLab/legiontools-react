import loginReducers from './loginReducers.js';
import experimentPaneReducers from './experimentPaneReducers.js';
import { combineReducers } from 'redux';


const reducer = combineReducers({
    loginReducers,
    experimentPaneReducers
});

export default reducer;
