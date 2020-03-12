import { combineReducers } from 'redux';
import machines from './getMachineReducer';

export default combineReducers({
    machines: machines
});