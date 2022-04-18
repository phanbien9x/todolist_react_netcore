import { takeLatest, call, put } from 'redux-saga/effects';
import { apiTodolist_Add, apiTodolist_Listing } from './api.js';
import {
  TODOLIST_LISTING_REQUEST,
  TODOLIST_LISTING_SUCCESS,
  TODOLIST_LISTING_FAILURE,
  TODOLIST_ADD_REQUEST,
  TODOLIST_ADD_FAILURE,
  TODOLIST_ADD_SUCCESS,
} from './slice';
function* todoList_Listing() {
  try {
    const res = yield call(apiTodolist_Listing);
    res.data.statusCode === 200
      ? yield put(TODOLIST_LISTING_SUCCESS(res.data))
      : yield put(TODOLIST_LISTING_FAILURE({ message: res.data.statusCode, description: res.data.value }));
  } catch (error) {
    yield put(TODOLIST_LISTING_FAILURE({ message: 'Error', description: error.toString() }));
  }
}

function* todoList_Add({ payload }) {
  try {
    const res = yield call(() => apiTodolist_Add(payload));
    res.data.statusCode === 200
      ? yield put(TODOLIST_ADD_SUCCESS(payload))
      : yield put(TODOLIST_ADD_FAILURE({ message: res.data.statusCode, description: res.data.value }));
  } catch (error) {
    yield put(TODOLIST_ADD_FAILURE({ message: 'Error', description: error.toString() }));
  }
}

export default function* todoListSaga() {
  yield takeLatest(TODOLIST_LISTING_REQUEST().type, todoList_Listing);
  yield takeLatest(TODOLIST_ADD_REQUEST().type, todoList_Add);
}
