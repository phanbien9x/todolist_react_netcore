import { takeLatest, call, put } from 'redux-saga/effects';
import { apiTodoDetail } from './api.js';
import { apiTodo_Update } from './../Todo/api';
import { notification } from 'antd';
import { ATTACHMENT_URL } from './../../app/config';
import {
  TODO_DETAIL_REQUEST,
  TODO_DETAIL_SUCCESS,
  TODO_DETAIL_FAILURE,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_SUCCESS,
  TODO_UPDATE_FAILURE,
} from './slice.js';

function* todoDetail({ payload }) {
  try {
    const res = yield call(() => apiTodoDetail(payload.id));
    let response = res.data;
    response.attachments.map((e) => {
      e.thumbUrl = `${ATTACHMENT_URL}/${e.name}`;
      e.url = `${ATTACHMENT_URL}/${e.name}`;
      return e;
    });
    yield put(TODO_DETAIL_SUCCESS(response));
  } catch (error) {
    yield put(
      TODO_DETAIL_FAILURE({
        message: error.response.status,
        description: error.response.data !== '' ? error.response.data : error.response.statusText,
      })
    );
  }
}
function* updateTodo({ payload }) {
  try {
    const res = yield call(() => apiTodo_Update(payload));
    yield put(TODO_UPDATE_SUCCESS(res.data));
    notification['success']({
      message: 'Success',
      description: 'Todo has been updated!',
    });
  } catch (error) {
    yield put(
      TODO_UPDATE_FAILURE({
        message: error.response.status,
        description: error.response.data !== '' ? error.response.data : error.response.statusText,
      })
    );
  }
}

export default function* todoDetailSaga() {
  yield takeLatest(TODO_DETAIL_REQUEST().type, todoDetail);
  yield takeLatest(TODO_UPDATE_REQUEST().type, updateTodo);
}
