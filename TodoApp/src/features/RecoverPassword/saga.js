import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRecoverPassword } from './api.js';
import { RECOVER_PASSWORD_REQUEST, RECOVER_PASSWORD_FAILURE, RECOVER_PASSWORD_SUCCESS } from './slice.js';
import { notification } from 'antd';

function* recoverPassword({ payload }) {
  try {
    const res = yield call(() => apiRecoverPassword(payload));
    yield put(RECOVER_PASSWORD_SUCCESS(res.data));
    notification['success']({
      message: 'Request success!',
      description: 'Check the email to get verification code.',
    });
  } catch (error) {
    yield put(
      RECOVER_PASSWORD_FAILURE({
        message: error.response?.status,
        description: error.response ? error.response.data : error.toString(),
      })
    );
  }
}

export default function* recoverPasswordSaga() {
  yield takeLatest(RECOVER_PASSWORD_REQUEST().type, recoverPassword);
}
