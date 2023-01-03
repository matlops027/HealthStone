import { REQUEST_SET_USER, RESET_USER } from '../const';

export function setUserInfo() {
    return {
        type: REQUEST_SET_USER
    }
}

export function resetUserInfo() {
    return {
        type: RESET_USER
    }
}