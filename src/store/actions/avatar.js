import { REQUEST_SET_AVAT, RESET_AVAT } from '../const';

export function setAvatInfo() {
    return {
        type: REQUEST_SET_AVAT
    }
}

export function resetAvatInfo() {
    return {
        type: RESET_AVAT
    }
}