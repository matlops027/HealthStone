import { call, put } from 'redux-saga/effects';
import { SUCCESS_SET_MISSIONS, FAILURE_SET_MISSIONS } from '../const';
import { getMissions } from '../../services/missionsService';

export function* asyncSetMissions() {
    try {
        const allMissions =
            yield call(getMissions);
        yield put({
            type: SUCCESS_SET_MISSIONS,
            missions: allMissions
        });
    } catch (error) {
        yield put({
            type: FAILURE_SET_MISSIONS
        });
    }
}