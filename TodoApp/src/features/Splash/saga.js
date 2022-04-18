import { takeLatest, call, put } from 'redux-saga/effects';
import { apiLogin } from './api.js';
import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from './slice.js';
import { persistor } from './../../app/store.js';
import storage from 'redux-persist/lib/storage';

function* login({ payload }) {
  try {
    const res = yield call(() => apiLogin(payload));
    payload.remember ? persistor.persist() : storage.removeItem('persist:root') && persistor.pause();
    res.data.statusCode === 200
      ? yield put(LOGIN_SUCCESS(res.data.value))
      : yield put(LOGIN_FAILURE({ message: res.data.statusCode, description: res.data.value }));
  } catch (error) {
    yield put(LOGIN_FAILURE({ message: 'Error', description: error.toString() }));
  }
}

export default function* todoListSaga() {
  yield takeLatest(LOGIN_REQUEST().type, login);
}
