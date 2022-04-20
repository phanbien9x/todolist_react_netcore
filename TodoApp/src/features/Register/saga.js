import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRegister } from './api.js';
import { REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS } from './slice.js';

function* register({ payload }) {
  try {
    const res = yield call(() => apiRegister(payload));
    yield put(REGISTER_SUCCESS(res.data));
  } catch (error) {
    yield put(
      REGISTER_FAILURE({
        message: error.response.status,
        description: error.response.data !== '' ? error.response.data : error.response.statusText,
      })
    );
  }
}

export default function* todoListSaga() {
  yield takeLatest(REGISTER_REQUEST().type, register);
}
