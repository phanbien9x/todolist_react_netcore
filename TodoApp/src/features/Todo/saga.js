import { takeLatest, call, put } from 'redux-saga/effects';
import { apiTodo_Delete, apiTodo_Update } from './api.js';
import {
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_SUCCESS,
  TODO_UPDATE_FAILURE,
  TODO_DELETE_REQUEST,
  TODO_DELETE_SUCCESS,
  TODO_DELETE_FAILURE,
} from './../TodoList/slice.js';

function* todo_Update({ payload }) {
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

function* todo_Delete({ payload }) {
  try {
    const res = yield call(() => apiTodo_Delete(payload.id));
    yield put(TODO_DELETE_SUCCESS(res.data));
  } catch (error) {
    yield put(
      TODO_DELETE_FAILURE({
        message: error.response.status,
        description: error.response.data !== '' ? error.response.data : error.response.statusText,
      })
    );
  }
}

export default function* todoListSaga() {
  yield takeLatest(TODO_UPDATE_REQUEST().type, todo_Update);
  yield takeLatest(TODO_DELETE_REQUEST().type, todo_Delete);
}
