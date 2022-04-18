import { all } from 'redux-saga/effects';
import todoListSaga from './../features/TodoList/saga.js';
import todoSaga from './../features/Todo/saga.js';
import loginSaga from './../features/Splash/saga.js';

export default function* rootSaga() {
  yield all([loginSaga(), todoListSaga(), todoSaga()]);
}
