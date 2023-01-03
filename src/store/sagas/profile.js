import { call, put } from 'redux-saga/effects';
import { SUCCESS_SET_PROF, FAILURE_SET_PROF } from '../const';
import { getProfileInfo } from '../../services/profileService';

export function* asyncSetProf() {
    try {
        const profInfo = yield call(getProfileInfo);
        yield put({
            type: SUCCESS_SET_PROF,
            prof: profInfo
        });
    } catch (error) {
        yield put({
            type: FAILURE_SET_PROF
        });
    }
}