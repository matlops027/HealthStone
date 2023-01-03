import { call, put } from 'redux-saga/effects';
import { SUCCESS_SET_USER, FAILURE_SET_USER } from '../const';
import { getUserInfo } from '../../services/userService';

export function* asyncSetUser() {
    try {
        const userInfo = yield call(getUserInfo);
        yield put({
            type: SUCCESS_SET_USER,
            user: userInfo
        });
    } catch (error) {
        yield put({
            type: FAILURE_SET_USER
        });
    }
}