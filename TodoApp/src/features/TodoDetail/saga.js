import { takeLatest, call, put } from 'redux-saga/effects';
import { apiTodoDetail } from './api.js';
import { TODO_DETAIL_REQUEST, TODO_DETAIL_SUCCESS, TODO_DETAIL_FAILURE } from './slice.js';

function* todoDetail({ payload }) {
  try {
    const res = yield call(() => apiTodoDetail(payload.id));
    yield put(TODO_DETAIL_SUCCESS(res.data));
  } catch (error) {
    yield put(
      TODO_DETAIL_FAILURE({
        message: error.response.status,
        description: error.response.data !== '' ? error.response.data : error.response.statusText,
      })
    );
  }
}

export default function* todoDetailSaga() {
  yield takeLatest(TODO_DETAIL_REQUEST().type, todoDetail);
}
