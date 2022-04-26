import { notification } from 'antd';
import { takeLatest, call, put } from 'redux-saga/effects';
import { apiChangePassword } from './api.js';
import { CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_SUCCESS } from './slice.js';

function* changePassword({ payload }) {
  try {
    const res = yield call(() => apiChangePassword(payload));
    yield put(CHANGE_PASSWORD_SUCCESS(res.data));
    notification['success']({
      message: 'Password has been changed!',
      description: res.data,
    });
  } catch (error) {
    yield put(
      CHANGE_PASSWORD_FAILURE({
        message: error.response?.status,
        description: error.response ? error.response.data : error.toString(),
      })
    );
  }
}

export default function* changePasswordSaga() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST().type, changePassword);
}
