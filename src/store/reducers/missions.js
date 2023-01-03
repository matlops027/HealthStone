import { REQUEST_SET_MISSIONS, SUCCESS_SET_MISSIONS, FAILURE_SET_MISSIONS } from '../const';

const INITIAL_STATE = {
    data: [],
    loading: false
};

export default function missions(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_SET_MISSIONS:
            return { ...state, loading: true }
        case SUCCESS_SET_MISSIONS:
            return { data: action.missions.allMissions, loading: false }
        case FAILURE_SET_MISSIONS:
            return INITIAL_STATE
        default:
            return state;
    }

}