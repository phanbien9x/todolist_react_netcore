import { takeLatest, call, put } from 'redux-saga/effects';
import { apiDeleteAttachment, apiTodoDetail, apiUploadAttachment } from './api.js';
import { apiTodo_Update } from './../Todo/api';
import {
  TODO_DETAIL_REQUEST,
  TODO_DETAIL_SUCCESS,
  TODO_DETAIL_FAILURE,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_SUCCESS,
  TODO_UPDATE_FAILURE,
  ATTACHMENT_UPLOAD_REQUEST,
  ATTACHMENT_UPLOAD_SUCCESS,
  ATTACHMENT_UPLOAD_FAILURE,
  ATTACHMENT_DELETE_REQUEST,
  ATTACHMENT_DELETE_SUCCESS,
  ATTACHMENT_DELETE_FAILURE,
} from './slice.js';

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
function* updateTodo({ payload }) {
  try {
    const res = yield call(() => apiTodo_Update(payload));
    yield put(TODO_UPDATE_SUCCESS(res.data));
  } catch (error) {
    yield put(
      TODO_UPDATE_FAILURE({
        message: error.response.status,
        description: error.response.data !== '' ? error.response.data : error.response.statusText,
      })
    );
  }
}
function* uploadAttachment({ payload }) {
  try {
    const res = yield call(() => apiUploadAttachment(payload.id));
    yield put(ATTACHMENT_UPLOAD_SUCCESS(res.data));
  } catch (error) {
    yield put(
      ATTACHMENT_UPLOAD_FAILURE({
        message: error.response.status,
        description: error.response.data !== '' ? error.response.data : error.response.statusText,
      })
    );
  }
}
function* deleteAttachment({ payload }) {
  try {
    const res = yield call(() => apiDeleteAttachment(payload.id));
    yield put(ATTACHMENT_DELETE_SUCCESS(res.data));
  } catch (error) {
    yield put(
      ATTACHMENT_DELETE_FAILURE({
        message: error.response.status,
        description: error.response.data !== '' ? error.response.data : error.response.statusText,
      })
    );
  }
}

export default function* todoDetailSaga() {
  yield takeLatest(TODO_DETAIL_REQUEST().type, todoDetail);
  yield takeLatest(TODO_UPDATE_REQUEST().type, updateTodo);
  yield takeLatest(ATTACHMENT_UPLOAD_REQUEST().type, uploadAttachment);
  yield takeLatest(ATTACHMENT_DELETE_REQUEST().type, deleteAttachment);
}
