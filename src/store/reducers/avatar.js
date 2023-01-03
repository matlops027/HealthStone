import { REQUEST_SET_AVAT, SUCCESS_SET_AVAT, FAILURE_SET_AVAT, RESET_AVAT } from '../const';

const INITIAL_STATE = {
    data: {
        IDAVAT: 0,
        IDPROF: 0,
        ACCETYPE: '',
        CLOTCOLO: '',
        CLOTTYPE: '',
        EYETYPE: '',
        EYEBTYPE: '',
        FACHAICO: '',
        FACHAITY: '',
        GRAPTYPE: '',
        HAIRCOLO: '',
        HATCOLO: '',
        MOUNTYPE: '',
        SKINCOLO: '',
        TOPTYPE: ''
    },

    loading: false
};

export default function user(state = INITIAL_STATE, action) {

    switch (action.type) {
        case REQUEST_SET_AVAT:
            return { ...state, loading: true };
        case SUCCESS_SET_AVAT:
            return { data: action.avat, loading: false };
        case FAILURE_SET_AVAT:
            return state;
        case RESET_AVAT:
            return INITIAL_STATE
        default:
            return state;
    }

}