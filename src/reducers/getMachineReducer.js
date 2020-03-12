import { createAction, handleActions } from 'redux-actions';

const GET_ALL_MACHINES = 'machine/GET_ALL_MACHINES';
const UPDATE_MACHINE_NAME = 'machine/UPDATE_MACHINE_NAME';
const UPDATE_HEALTH = 'machine/UPDATE_HEALTH';

export const getAllMachines = createAction(GET_ALL_MACHINES);
export const updateMachineName = createAction(UPDATE_MACHINE_NAME);
export const updateHealth = createAction(UPDATE_HEALTH);

const initialState = {
    machines: []
}

export default handleActions({
    [GET_ALL_MACHINES]: (state, action) => ({
        ...state,
        machines: action.payload
    }),
    [UPDATE_MACHINE_NAME]: (state, action) => ({
        ...state,
        machines: state.machines.map(item => item.id === action.payload.id ? { ...item, name: action.payload.name } : item)
    }),
    [UPDATE_HEALTH]: (state, action) => ({
        ...state,
        machines: state.machines.map(item => item.id === action.payload.id ? { ...item, health: action.payload.health}: item)
    })
}, initialState);