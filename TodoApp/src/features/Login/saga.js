import { takeLatest, call, put } from 'redux-saga/effects';
import { apiLogin, apiLogout } from './api.js';
import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
} from './slice.js';
import { GET_USERINFO_SUCCESS } from '../UserInfo/slice.js';
import { persistor } from './../../app/store.js';
import storage from 'redux-persist/lib/storage';

function* login({ payload }) {
  try {
    const res = yield call(() => apiLogin(payload));
    payload.remember ? persistor.persist() : storage.removeItem('persist:root') && persistor.pause();
    yield put(LOGIN_SUCCESS(res.data.access_token));
    delete res.data['access_token'];
    yield put(GET_USERINFO_SUCCESS(res.data));
  } catch (error) {
    yield put(
      LOGIN_FAILURE({
        message: error.response?.status,
        description: error.response ? (typeof error.response.data === 'string' ? error.response.data : error.response.data.detail) : error.toString(),
      })
    );
  }
}

function* logout({ payload }) {
  try {
    yield call(() => apiLogout(payload));
    yield put(LOGOUT_SUCCESS(null));
    storage.removeItem('persist:root') && persistor.pause();
  } catch (error) {
    yield put(
      LOGOUT_FAILURE({
        message: error.response?.status,
        description: error.response ? (typeof error.response.data === 'string' ? error.response.data : error.response.data.detail) : error.toString(),
      })
    );
  }
}

export default function* todoListSaga() {
  yield takeLatest(LOGIN_REQUEST().type, login);
  yield takeLatest(LOGOUT_REQUEST().type, logout);
}
