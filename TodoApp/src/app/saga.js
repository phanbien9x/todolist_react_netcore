import { all } from 'redux-saga/effects';
import todoListSaga from './../features/TodoList/saga.js';
import todoSaga from './../features/Todo/saga.js';
import authSaga from './../features/Auth/saga.js';
import userinfoSaga from './../features/UserInfo/saga.js';

export default function* rootSaga() {
  yield all([authSaga(), todoListSaga(), todoSaga(), userinfoSaga()]);
}
