// @flow
import { put, takeEvery, call } from 'redux-saga/effects';
import Api from '@rfg/core/lib/utils/Api';
import endPoint from '@rfg/core/lib/utils/endpoint';
import {
  TRACK_MY_ORDER_ASYNC,
  TRACK_MY_ORDER_ASYNC_SUCCESS,
  TRACK_MY_ORDER_ASYNC_FAILED,
} from '../constants';

// Our worker Saga: will perform the async task
export function* workerOrderTrack(action) {
  try {
    Api.setBaseURL(process.env.REACT_APP_API_BASE_URL);
    const { payload, callback, noflash } = action;
    let appendNoFlash = "";

    if (noflash) {
      appendNoFlash = `?noflash=2`;
    }
    const endpoint = endPoint(process.env.REACT_APP_ENDPOINT_TRACK_MY_ORDER_URL, {__noflash: appendNoFlash}, '/track/order');
    const response = yield call(Api.post, endpoint, payload);

    if (!response.ok) {
      if (typeof callback === 'function') {
        callback((response));
      }
      yield put({ type: TRACK_MY_ORDER_ASYNC_FAILED, response });
    } else {
      yield put({ type: TRACK_MY_ORDER_ASYNC_SUCCESS, payload: response.data });
      if (typeof callback === 'function') {
        callback(response);
      }
    }
  } catch (err) {
    if (typeof action.callback === 'function') {
      action.callback(err);
    }
  }
}

// Our watcher Saga
export default function* watchOrderTrack() {
  yield takeEvery(TRACK_MY_ORDER_ASYNC, workerOrderTrack);
}
