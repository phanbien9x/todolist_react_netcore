import { takeLatest, call, put } from 'redux-saga/effects';
import { apiResetPassword } from './api.js';
import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS } from './slice.js';
import { notification } from 'antd';

function* resetPassword({ payload }) {
  const { code, data } = payload;
  try {
    const res = yield call(() => apiResetPassword(code, data));
    yield put(RESET_PASSWORD_SUCCESS(res.data));
    notification['success']({
      message: 'Reset success',
      description: 'You can login now!',
    });
  } catch (error) {
    yield put(
      RESET_PASSWORD_FAILURE({
        message: error.response?.status,
        description: error.response ? (typeof error.response.data === 'string' ? error.response.data : error.response.data.detail) : error.toString(),
      })
    );
  }
}

export default function* resetPasswordSaga() {
  yield takeLatest(RESET_PASSWORD_REQUEST().type, resetPassword);
}
