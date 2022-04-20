import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRegister } from './api.js';
import { REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS } from './slice.js';
import { notification } from 'antd';

function* register({ payload }) {
  try {
    const res = yield call(() => apiRegister(payload));
    yield put(REGISTER_SUCCESS(res.data));
    notification['success']({
      message: '200',
      description: "Register success!",
    });
  } catch (error) {
    yield put(
      REGISTER_FAILURE({
        message: error.response.status,
        description: error.response.data !== '' ? error.response.data : error.response.statusText,
      })
    );
  }
}

export default function* registerSaga() {
  yield takeLatest(REGISTER_REQUEST().type, register);
}