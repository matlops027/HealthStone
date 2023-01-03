import { REQUEST_SET_HISTORY, SUCCESS_SET_HISTORY, FAILURE_SET_HISTORY } from '../const';

const INITIAL_STATE = {
    data: {
        completeHistory: [],
        failHistory: [],
    },
    loading: false
};

export default function history(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_SET_HISTORY:
            return { ...state, loading: true }
        case SUCCESS_SET_HISTORY:
            return { data: action.history, loading: false }
        case FAILURE_SET_HISTORY:
            return INITIAL_STATE
        default:
            return state;
    }

}