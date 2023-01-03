import { call, put } from 'redux-saga/effects';
import { SUCCESS_SET_HISTORY, FAILURE_SET_HISTORY } from '../const';
import { getHistory } from '../../services/historyService';

export function* asyncSetHistory() {
    try {
        const allHistory =
            yield call(getHistory);
        yield put({
            type: SUCCESS_SET_HISTORY,
            history: allHistory
        });
    } catch (error) {
        yield put({
            type: FAILURE_SET_HISTORY
        });
    }
}