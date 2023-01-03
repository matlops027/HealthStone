import { REQUEST_SET_PROF, RESET_PROF } from '../const';

export function setProfInfo() {
    return {
        type: REQUEST_SET_PROF
    }
}

export function resetProfInfo() {
    return {
        type: RESET_PROF
    }
}