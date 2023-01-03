import { REQUEST_SET_USER, SUCCESS_SET_USER, FAILURE_SET_USER, RESET_USER } from '../const';

const INITIAL_STATE = {
    data: {
        IDUSER: 0,
        USERMAIL: '',
        USERNAME: ''
    },
    loading: false
};

export default function user(state = INITIAL_STATE, action) {

    switch (action.type) {
        case REQUEST_SET_USER:
            return { ...state, loading: true }
        case SUCCESS_SET_USER:
            return { data: action.user, loading: false }
        case FAILURE_SET_USER:
            return state
        case RESET_USER:
            return INITIAL_STATE
        default:
            return state;
    }

}