import { call, put } from 'redux-saga/effects';
import { SUCCESS_SET_AVAT, FAILURE_SET_AVAT } from '../const';
import { getAvatarInfo } from '../../services/avatarService';

export function* asyncSetAvat() {
    try {
        const avatInfo = yield call(getAvatarInfo);
        yield put({
            type: SUCCESS_SET_AVAT,
            avat: avatInfo
        });
    } catch (error) {
        yield put({
            type: FAILURE_SET_AVAT
        });
    }
}