import { all } from 'redux-saga/effects';
import todoListSaga from './../features/TodoList/saga.js';
import todoSaga from './../features/Todo/saga.js';
import resetPasswordSaga from './../features/ResetPassword/saga.js';
import recoverPasswordSaga from './../features/RecoverPassword/saga.js';
import registerSaga from './../features/Register/saga.js';
import loginSaga from './../features/Login/saga.js';
import userinfoSaga from './../features/UserInfo/saga.js';
import changePasswordSaga from './../features/ChangePassword/saga.js';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registerSaga(),
    recoverPasswordSaga(),
    resetPasswordSaga(),
    todoListSaga(),
    todoSaga(),
    userinfoSaga(),
    changePasswordSaga(),
  ]);
}
