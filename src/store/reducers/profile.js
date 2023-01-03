import { REQUEST_SET_PROF, SUCCESS_SET_PROF, FAILURE_SET_PROF, RESET_PROF } from '../const';

const INITIAL_STATE = {
    data: {
        IDPROF: 0,
        IDUSER: 0,
        PROFNICK: '',
        MAXHP: 50,
        CURHP: 50,
        LEVEL: 1,
        COIN: 0,
        MAXXP: 100,
        CURXP: 0,
        TFACTIVE: 1
    },

    loading: false
};

export default function user(state = INITIAL_STATE, action) {

    switch (action.type) {
        case REQUEST_SET_PROF:
            return { ...state, loading: true };
        case SUCCESS_SET_PROF:
            return { data: action.prof, loading: false };
        case FAILURE_SET_PROF:
            return state;
        case RESET_PROF:
            return INITIAL_STATE
        default:
            return state;
    }

}