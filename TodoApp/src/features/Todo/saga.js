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
    res.data.statusCode === 200
      ? yield put(TODO_UPDATE_SUCCESS(payload))
      : yield put(TODO_UPDATE_FAILURE({ message: res.data.statusCode, description: res.data.value }));
  } catch (error) {
    yield put(TODO_UPDATE_FAILURE({ message: 'Error', description: error.toString() }));
  }
}

function* todo_Delete({ payload }) {
  try {
    const res = yield call(() => apiTodo_Delete(payload.id));
    res.data.statusCode === 200
      ? yield put(TODO_DELETE_SUCCESS(payload))
      : yield put(TODO_DELETE_FAILURE({ message: res.data.statusCode, description: res.data.value }));
  } catch (error) {
    yield put(TODO_DELETE_FAILURE({ message: 'Error', description: error.toString() }));
  }
}

export default function* todoListSaga() {
  yield takeLatest(TODO_UPDATE_REQUEST().type, todo_Update);
  yield takeLatest(TODO_DELETE_REQUEST().type, todo_Delete);
}
