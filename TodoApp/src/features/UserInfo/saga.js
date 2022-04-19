import { notification } from 'antd';
import { takeLatest, call, put } from 'redux-saga/effects';
import { apiGetUserInfo, apiChangeUserInfo } from './api.js';
import {
  GET_USERINFO_REQUEST,
  GET_USERINFO_FAILURE,
  GET_USERINFO_SUCCESS,
  CHANGE_USERINFO_REQUEST,
  CHANGE_USERINFO_FAILURE,
  CHANGE_USERINFO_SUCCESS,
} from './slice.js';

function* getUserInfo() {
  try {
    const res = yield call(() => apiGetUserInfo());
    yield put(GET_USERINFO_SUCCESS(res.data));
  } catch (error) {
    yield put(
      GET_USERINFO_FAILURE({
        message: error.response.status,
        description: error.response.data !== '' ? error.response.data : error.response.statusText,
      })
    );
  }
}

function* changeUserInfo({ payload }) {
  try {
    const res = yield call(() => apiChangeUserInfo(payload));
    yield put(CHANGE_USERINFO_SUCCESS(res.data));
    notification['success']({
      message: '200',
      description: 'Update success',
    });
  } catch (error) {
    yield put(
      CHANGE_USERINFO_FAILURE({
        message: error.response.status,
        description: error.response.data !== '' ? error.response.data : error.response.statusText,
      })
    );
  }
}

export default function* userinfoSaga() {
  yield takeLatest(GET_USERINFO_REQUEST().type, getUserInfo);
  yield takeLatest(CHANGE_USERINFO_REQUEST().type, changeUserInfo);
}
