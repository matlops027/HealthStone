import { takeEvery, all } from 'redux-saga/effects';
import { asyncSetMissions } from './missions';
import { asyncSetUser } from './user';
import { asyncSetProf } from './profile';
import { asyncSetAvat } from './avatar';
import { asyncSetHistory } from './history';
import { REQUEST_SET_MISSIONS, REQUEST_SET_USER, REQUEST_SET_AVAT, REQUEST_SET_PROF, REQUEST_SET_HISTORY } from '../const';

export default function* root() {
    yield all([
        takeEvery(REQUEST_SET_MISSIONS, asyncSetMissions),
        takeEvery(REQUEST_SET_USER, asyncSetUser),
        takeEvery(REQUEST_SET_AVAT, asyncSetAvat),
        takeEvery(REQUEST_SET_PROF, asyncSetProf),
        takeEvery(REQUEST_SET_HISTORY, asyncSetHistory)
    ]);

}